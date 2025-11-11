#!/bin/bash
################################################################################
# Database Backup Script
#
# This script creates a compressed PostgreSQL database backup with timestamp.
# It should be run daily via cron job for automated backups.
#
# Configuration:
#   DATABASE_URL - PostgreSQL connection string
#   BACKUP_STORAGE_PATH - Directory where backups will be stored
#   BACKUP_RETENTION_DAYS - Number of days to keep backups (default: 30)
#
# Example cron entry:
#   0 2 * * * /path/to/project/scripts/backup/backup.sh >> /var/log/db-backup.log 2>&1
################################################################################

set -e  # Exit on error
set -u  # Exit on undefined variable

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check required environment variables
if [ -z "${DATABASE_URL:-}" ]; then
    log_error "DATABASE_URL environment variable is not set"
    exit 1
fi

if [ -z "${BACKUP_STORAGE_PATH:-}" ]; then
    log_error "BACKUP_STORAGE_PATH environment variable is not set"
    exit 1
fi

# Default retention period
BACKUP_RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_STORAGE_PATH"

# Generate timestamp for backup file
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_STORAGE_PATH/backup_${TIMESTAMP}.sql.gz"
BACKUP_METADATA_FILE="$BACKUP_STORAGE_PATH/backup_${TIMESTAMP}.json"

log "Starting database backup..."
log "Target file: $BACKUP_FILE"

# Perform the backup
if pg_dump "$DATABASE_URL" | gzip > "$BACKUP_FILE"; then
    log_success "Database backup completed successfully"
else
    log_error "Database backup failed"
    exit 1
fi

# Verify backup file was created and is not empty
if [ ! -s "$BACKUP_FILE" ]; then
    log_error "Backup file is empty or was not created"
    exit 1
fi

# Get file size
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
log "Backup file size: $BACKUP_SIZE"

# Create metadata file
cat > "$BACKUP_METADATA_FILE" << EOF
{
  "timestamp": "$TIMESTAMP",
  "database_url": "${DATABASE_URL%@*}@***",  # Mask password
  "backup_file": "$BACKUP_FILE",
  "backup_size": "$BACKUP_SIZE",
  "created_at": "$(date -u +'%Y-%m-%dT%H:%M:%SZ')",
  "retention_days": $BACKUP_RETENTION_DAYS
}
EOF

log_success "Backup metadata saved to: $BACKUP_METADATA_FILE"

# Clean up old backups
log "Cleaning up backups older than $BACKUP_RETENTION_DAYS days..."
DELETED_COUNT=0
find "$BACKUP_STORAGE_PATH" -name "backup_*.sql.gz" -type f -mtime +$BACKUP_RETENTION_DAYS -print0 | while IFS= read -r -d '' old_backup; do
    if rm -f "$old_backup"; then
        DELETED_COUNT=$((DELETED_COUNT + 1))
        METADATA_FILE="${old_backup%.gz}.json"
        [ -f "$METADATA_FILE" ] && rm -f "$METADATA_FILE"
        log "Deleted old backup: $(basename "$old_backup")"
    fi
done

if [ $DELETED_COUNT -gt 0 ]; then
    log "Cleaned up $DELETED_COUNT old backup(s)"
else
    log "No old backups to clean up"
fi

# Verify recent backups
RECENT_BACKUPS=$(find "$BACKUP_STORAGE_PATH" -name "backup_*.sql.gz" -type f | wc -l)
log "Total backups in storage: $RECENT_BACKUPS"

# Summary
log_success "Backup process completed successfully"
log "Recent backup: $(basename "$BACKUP_FILE")"
log "Next backup: Tomorrow at 02:00"

exit 0
