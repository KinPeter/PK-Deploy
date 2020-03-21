const ftp = require('basic-ftp');
const fs = require('fs');
const logger = {  
  red: str => { console.log('\x1b[31m%s\x1b[0m', str); },
  green: str => { console.log('\x1b[32m%s\x1b[0m', str); },
  def: str => { console.log(str) }
};
let config;

try {
  config = require('./pk-deploy.config.js');
} catch (error) {
  logger.red('[-] No config file found.');
  logger.red('[-] Please specify the FTP connection parameters in a pk-deploy.config.js file in your project root directory.');
  process.exit(0);
}

const deleteFolderRecursive = function (path) {
  // thx to https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

(async function () {
  const isDistExists = fs.existsSync(config.distDir);
  if (!isDistExists) {
    logger.red(`[-] The specified distribution folder '${config.distDir}' is not found.`);
    process.exit(0);
  }

  const client = new ftp.Client()
  client.ftp.verbose = true
  try {
    await client.access({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.pass,
      secure: config.secure
    });
    await client.cd(config.workDir);
    await client.downloadToDir('deploy-temp/.well-known', '.well-known');
    await client.clearWorkingDir();
    await client.uploadFromDir('deploy-temp/.well-known', '.well-known');
    await client.uploadFromDir(config.distDir);
    logger.green('[+] Deployment completed successfully.');
  }
  catch (err) {
    logger.red('[-] Failed to finish deployment.');
    logger.red(err);
  }

  client.close();

  try {
    deleteFolderRecursive('deploy-temp');
    logger.green('[+] Deleted temporary folder.');
  } catch (error) {
    logger.red('[-] Unable to delete temporary folder, please delete them manually.');
  }
})();