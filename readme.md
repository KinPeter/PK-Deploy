## PK-Deploy
A simple Node.js script to help me deploy my frontend apps to my static server via FTP

### Dependencies:
* [Basic-ftp](https://www.npmjs.com/package/basic-ftp) | `npm i basic-ftp`

### Configuration:
Create a `pk-deploy.config.js` file in the project root directory with the content:
``` javascript
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
```

### Usage:
1) Copy the `pk-deploy.js` file into the project root directory
2) Install the dependency with `npm i basic-ftp`
3) Create the configuration file as shown above
4) Run `node pk-deploy.js` or set up an NPM script in your `package.json` file