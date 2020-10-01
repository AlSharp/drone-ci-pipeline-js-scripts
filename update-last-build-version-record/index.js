const fse = require('fs-extra');
const {valuesJSON: filePathToValuesJson} = require('../paths');

async function main() {
  try {
    const json = await fse.readJSON(filePathToValuesJson);
    const version = json.version;
    await fse.writeJSON(filePathToValuesJson, {...json, lastVersion: version});
    console.log('update last build version record is completed');
  }
  catch(error) {
    console.log(error);
    process.exit(1);
  }
}

main();