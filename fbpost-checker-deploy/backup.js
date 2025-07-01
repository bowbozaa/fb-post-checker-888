// backup.js
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `backup-${timestamp}.zip`);
const output = fs.createWriteStream(backupPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ Backup completed: ${backupPath} (${archive.pointer()} bytes)`);
});
archive.on('error', err => { throw err; });

archive.pipe(output);
archive.directory('public/', false);
archive.finalize();
