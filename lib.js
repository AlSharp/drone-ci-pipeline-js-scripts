const fs = require('fs');

module.exports = {
  getArgument: (argv, number) => {
    return argv
      .slice(2)
      .map(arg => arg.split('=')[1])[number - 1]
  },
  readJSON: filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, {encoding: 'utf-8'}, (error, data) => {
        if (error) {
          return reject(error);
        }
        const json = JSON.parse(data);
        return resolve(json);
      })
    })
  },
  writeJSON: (filePath, json) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(json), error => {
        if (error) {
          return reject(error);
        }
        return resolve(filePath);
      })
    })
  },
  convertVersionToNumber: str => {
    if (!str) {
      return 0;
    }
    return parseInt(str.replace(/\./g, ''), 10);
  }
}

