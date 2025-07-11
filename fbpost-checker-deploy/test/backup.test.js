const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

describe('backup script', () => {
  test('creates a zip including the sample file', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'backup-test-'));
    // copy backup.js into temp directory so __dirname matches
    const scriptSrc = path.join(__dirname, '..', 'backup.js');
    const scriptDest = path.join(tmpDir, 'backup.js');
    fs.copyFileSync(scriptSrc, scriptDest);

    // create public directory and sample file
    const publicDir = path.join(tmpDir, 'public');
    fs.mkdirSync(publicDir);
    const sampleFile = path.join(publicDir, 'sample.txt');
    fs.writeFileSync(sampleFile, 'sample');

    // run the backup script
    const result = spawnSync('node', ['backup.js'], { cwd: tmpDir, encoding: 'utf8' });
    expect(result.status).toBe(0);

    // check that a zip file exists in backups
    const backupsDir = path.join(tmpDir, 'backups');
    const zips = fs.readdirSync(backupsDir).filter(f => f.endsWith('.zip'));
    expect(zips.length).toBe(1);
    const zipPath = path.join(backupsDir, zips[0]);

    // verify the sample file is inside the zip
    const list = spawnSync('unzip', ['-l', zipPath], { encoding: 'utf8' });
    expect(list.status).toBe(0);
    expect(list.stdout).toMatch(/sample.txt/);
  });
});
