# Database Backup and Restore

This directory contains scripts for automated PostgreSQL database backup and restore operations.

## Files

- `backup.sh` - Automated database backup script
- `restore.sh` - Database restore script
- `README.md` - This documentation file

## Environment Variables

The following environment variables must be configured:

### Required

- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database`
  - Example: `postgresql://postgres:password@localhost:5432/tb_group`

- `BACKUP_STORAGE_PATH` - Directory where backups will be stored
  - Example: `/backups` or `/var/backups/tb_group`

### Optional

- `BACKUP_RETENTION_DAYS` - Number of days to keep backups (default: 30)
  - Example: `7`, `30`, `90`

## Backup Script Usage

### Manual Backup

To create a manual backup:

```bash
cd /path/to/project
export DATABASE_URL="postgresql://..."
export BACKUP_STORAGE_PATH="/backups"
./apps/api/scripts/backup/backup.sh
```

### Automated Backup (Cron)

To set up automated daily backups, add a cron job:

```bash
# Edit crontab
crontab -e

# Add the following line to run backup at 2:00 AM daily
0 2 * * * cd /path/to/project && DATABASE_URL="postgresql://..." BACKUP_STORAGE_PATH="/backups" ./apps/api/scripts/backup/backup.sh >> /var/log/db-backup.log 2>&1
```

### Cron Setup Details

1. **Time**: The cron job is set to run at 2:00 AM daily (02:00)
2. **Logging**: All output is redirected to `/var/log/db-backup.log`
3. **Error Handling**: The script will exit on error, which will be logged

### Verify Cron Job

To verify your cron job is set up correctly:

```bash
# List all cron jobs
crontab -l

# Check if cron service is running
systemctl status cron
# or
systemctl status crond
```

### Monitor Backup Logs

```bash
# View recent backup logs
tail -f /var/log/db-backup.log

# View only errors
grep ERROR /var/log/db-backup.log

# View all backup attempts
grep "Starting database backup" /var/log/db-backup.log
```

## Restore Script Usage

⚠️ **WARNING**: This will overwrite the target database!

### Restore from Backup

To restore a database from a backup file:

```bash
cd /path/to/project
export TARGET_DATABASE_URL="postgresql://..."
./apps/api/scripts/backup/restore.sh /backups/backup_20241111_020000.sql.gz
```

### Interactive Restore

The script will prompt for confirmation before proceeding:

```bash
./apps/api/scripts/backup/restore.sh /backups/backup_20241111_020000.sql.gz
```

You'll see:
```
Are you sure you want to continue? (yes/no):
```

Type `yes` to proceed or `no` to cancel.

### Restore to Different Database

To restore to a different database:

```bash
./apps/api/scripts/backup/restore.sh /backups/backup_20241111_020000.sql.gz "postgresql://user:pass@host:port/target_db"
```

## Backup Files

Backups are created in the format:
- `backup_YYYYMMDD_HHMMSS.sql.gz` - Compressed SQL dump
- `backup_YYYYMMDD_HHMMSS.json` - Backup metadata

### Metadata File

The metadata file contains:
- Timestamp
- Database information
- Backup file path
- File size
- Retention period

Example:
```json
{
  "timestamp": "20241111_020000",
  "database_url": "postgresql://***@***",
  "backup_file": "/backups/backup_20241111_020000.sql.gz",
  "backup_size": "15M",
  "created_at": "2024-11-11T02:00:00Z",
  "retention_days": 30
}
```

## Backup Retention

By default, backups are kept for 30 days. To change this:

```bash
export BACKUP_RETENTION_DAYS=7  # Keep backups for 7 days
./apps/api/scripts/backup/backup.sh
```

To make this permanent, add to your crontab:

```bash
0 2 * * * cd /path/to/project && DATABASE_URL="..." BACKUP_STORAGE_PATH="/backups" BACKUP_RETENTION_DAYS=7 ./apps/api/scripts/backup/backup.sh >> /var/log/db-backup.log 2>&1
```

## Troubleshooting

### Backup Fails

Check common issues:

1. **Database connection error**
   ```bash
   # Test connection
   psql "$DATABASE_URL" -c "SELECT 1;"
   ```

2. **Permission denied**
   ```bash
   # Ensure backup directory is writable
   mkdir -p /backups
   chmod 755 /backups
   ```

3. **Disk space**
   ```bash
   # Check available space
   df -h /backups
   ```

### Restore Fails

1. **Database doesn't exist**
   - The restore script will create a fresh database
   - Ensure the database user has `CREATEDB` privileges

2. **Connection error**
   ```bash
   # Test connection to target database
   psql "$TARGET_DATABASE_URL" -c "SELECT 1;"
   ```

3. **Backup file corrupted**
   ```bash
   # Test if backup file is valid gzip
   gunzip -t /backups/backup_20241111_020000.sql.gz
   ```

## Security Best Practices

1. **Store backups in secure location**
   - Use restricted permissions: `chmod 700 /backups`
   - Consider encrypted storage (e.g., AWS S3 with encryption)
   - Off-site backups for disaster recovery

2. **Database credentials**
   - Use environment variables, never hardcode
   - Consider using `.pgpass` file for automated authentication
   - Rotate credentials regularly

3. **Monitor backup status**
   - Set up alerts for failed backups
   - Regularly verify backups can be restored
   - Monitor backup file sizes for anomalies

4. **Test restores**
   - Periodically test restore procedures
   - Verify data integrity after restore
   - Document restore time and process

## Example Deployment

### On Ubuntu/Debian Server

```bash
# 1. Create backup directory
sudo mkdir -p /var/backups/tb_group
sudo chown postgres:postgres /var/backups/tb_group

# 2. Set up environment variables
cat >> /home/postgres/.bashrc << 'EOF'
export DATABASE_URL="postgresql://postgres:password@localhost:5432/tb_group"
export BACKUP_STORAGE_PATH="/var/backups/tb_group"
export BACKUP_RETENTION_DAYS=30
EOF

# 3. Make scripts executable
chmod +x /path/to/project/apps/api/scripts/backup/*.sh

# 4. Set up cron job
sudo -u postgres crontab -e

# Add:
0 2 * * * cd /path/to/project && ./apps/api/scripts/backup/backup.sh >> /var/log/db-backup.log 2>&1

# 5. Test backup
sudo -u postgres /path/to/project/apps/api/scripts/backup/backup.sh

# 6. Verify backup
ls -lh /var/backups/tb_group/
```

## AWS S3 Integration (Optional)

To store backups on AWS S3:

```bash
# Install AWS CLI
sudo apt-get install awscli

# Configure AWS credentials
aws configure

# Modify backup.sh to upload to S3
gunzip -c "$BACKUP_FILE" | aws s3 cp - "s3://my-backup-bucket/db/backup_${TIMESTAMP}.sql"
```

## Performance Considerations

- **Backup Time**: Large databases may take several hours to backup
- **I/O Impact**: Backup may impact database performance; consider running during off-peak hours
- **Compression**: gzip compression reduces storage by ~80-90% but uses CPU
- **Concurrent Backups**: Avoid running multiple backup processes simultaneously

## Support

For issues or questions:
- Check the logs: `/var/log/db-backup.log`
- Review the scripts: `apps/api/scripts/backup/backup.sh`
- Test restore procedure regularly
- Document any modifications or customizations
