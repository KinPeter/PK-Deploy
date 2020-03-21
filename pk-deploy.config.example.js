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
  distDir: 'dist'
}
