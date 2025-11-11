#!/bin/bash
################################################################################
# Database Restore Script
#
# This script restores a PostgreSQL database from a compressed backup file.
# USE WITH CAUTION: This will overwrite the target database!
#
# Usage:
#   ./restore.sh <backup_file> [target_database_url]
#
# Example:
#   ./restore.sh /backups/backup_20241111_020000.sql.gz
#
# Configuration:
#   BACKUP_STORAGE_PATH - Directory where backups are stored
#   TARGET_DATABASE_URL - Database URL to restore to (optional, uses DATABASE_URL if not set)
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

# Check if backup file argument is provided
if [ $# -lt 1 ]; then
    log_error "Usage: $0 <backup_file> [target_database_url]"
    log_error "Example: $0 /backups/backup_20241111_020000.sql.gz"
    exit 1
fi

BACKUP_FILE="$1"
TARGET_DATABASE_URL="${2:-${DATABASE_URL:-}}"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    log_error "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Check if backup file is a valid gzip file
if ! file "$BACKUP_FILE" | grep -q "gzip compressed"; then
    log_error "Backup file is not a valid gzip file"
    exit 1
fi

# Check if target database URL is provided
if [ -z "$TARGET_DATABASE_URL" ]; then
    log_error "No target database URL provided and DATABASE_URL is not set"
    exit 1
fi

# Confirmation prompt
log_warning "WARNING: This will overwrite the database at:"
log_warning "  $TARGET_DATABASE_URL"
log_warning ""
read -p "Are you sure you want to continue? (yes/no): " -r
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    log "Restore cancelled by user"
    exit 0
fi

# Get backup file size
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
log "Starting database restore..."
log "Source backup: $BACKUP_FILE"
log "Backup size: $BACKUP_SIZE"
log "Target database: ${TARGET_DATABASE_URL%@*}@***"  # Mask password

# Extract database name from URL for confirmation
DB_NAME=$(echo "$TARGET_DATABASE_URL" | sed -n 's/.*\/\([^\/?]*\).*/\1/p')
log "Target database name: $DB_NAME"

# Check if database exists
if psql "$TARGET_DATABASE_URL" -c "SELECT 1;" >/dev/null 2>&1; then
    log "Connection to target database successful"
else
    log_error "Cannot connect to target database"
    log_error "Please check the DATABASE_URL and ensure the database is accessible"
    exit 1
fi

# Perform the restore
log "Restoring database from backup..."
log "This may take several minutes depending on the database size..."

# Drop all existing connections to the database (optional, for safety)
# log "Terminating existing connections..."
# psql "$TARGET_DATABASE_URL" -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME' AND pid != pg_backend_pid();" || true

# Drop the database if it exists and recreate it
log "Dropping existing database..."
dropdb --if-exists "$TARGET_DATABASE_URL" || true

log "Creating fresh database..."
createdb "$TARGET_DATABASE_URL"

# Restore the database from the backup file
if gunzip -c "$BACKUP_FILE" | psql "$TARGET_DATABASE_URL" > /tmp/restore_log.txt 2>&1; then
    log_success "Database restore completed successfully"
else
    log_error "Database restore failed"
    log_error "Check /tmp/restore_log.txt for details"
    cat /tmp/restore_log.txt
    exit 1
fi

# Verify the restore
log "Verifying database restore..."
TABLE_COUNT=$(psql "$TARGET_DATABASE_URL" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null || echo "0")

if [ "$TABLE_COUNT" != "0" ]; then
    log_success "Database verification successful"
    log "Tables restored: $TABLE_COUNT"
else
    log_warning "Database appears to be empty after restore"
    log_warning "Please check if the backup file was valid"
fi

# Clean up log file
rm -f /tmp/restore_log.txt

# Summary
log_success "Database restore process completed"
log "Backup file: $(basename "$BACKUP_FILE")"
log "Database restored to: $DB_NAME"
log "Tables restored: $TABLE_COUNT"

exit 0
