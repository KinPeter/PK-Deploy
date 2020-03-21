// Configuration options for PK-Deploy
module.exports = {
  // FTP credentials
  host: 'ftp.my-site.com',
  port: 21,
  user: 'mr_smith',
  pass: 'sUp3rsaFePass',
  secure: false,

  // Remote working directory
  workDir: 'path/to/deploy/on/ftp',

  // Local folder to deploy
  distDir: 'dist',

  // Folder(s) to keep untouched on remote
  foldersToKeep: [
    'folder-to-keep1',
    'folder-to-keep2',
  ],

  // File(s) to keep untouched on remote (in root working directory)
  filesToKeep: [
    'file-to-keep1.txt',
    'file-to-keep2.js'
  ],
}
