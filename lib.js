const {exec} = require('child_process');

module.exports = {
  getArgument: (argv, number) => {
    return argv
      .slice(2)
      .map(arg => arg.split('=')[1])[number - 1]
  },
  convertVersionToNumber: str => {
    if (!str) {
      return 0;
    }
    return parseInt(str.replace(/\./g, ''), 10);
  },
  zipFolder: (outputPath, folderPath) => {
    return new Promise((resolve, reject) => {
      exec(`cd ${folderPath} && zip -9 -y -r ${outputPath} ./`, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        return resolve();
      })
    })
  },
  unzipToFolder: (zipFilePath, folderPath) => {
    return new Promise((resolve, reject) => {
      exec(`unzip ${zipFilePath} -d ${folderPath}`, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        return resolve();
      })
    })
  }
}

