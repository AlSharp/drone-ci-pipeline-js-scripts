const path = require('path');
const fse = require('fs-extra');

const {
  getArgument, convertVersionToNumber
} = require('../lib');

const {valuesJSON: filePathToValuesJson} = require('../paths');

async function main() {
  try {
    const filePathToPackageJson = path.join(getArgument(process.argv, 1), 'package.json');

    console.log(`reading ${filePathToPackageJson}`);
    const {version} = await fse.readJSON(filePathToPackageJson);
    console.log(`building version: ${version}`);

    console.log(`reading ${filePathToValuesJson}`);
    const json = await fse.readJSON(filePathToValuesJson);
    const lastVersion = json.lastVersion;
    console.log(`last version built: ${lastVersion}`);

    const lastVersionInt = convertVersionToNumber(lastVersion);
    const versionInt = convertVersionToNumber(version);
    if (versionInt <= lastVersionInt) {
      throw (new Error(`${version} is not new version`));
    }
    
    await fse.writeJSON(filePathToValuesJson, {...json, version});
    console.log('check-version is completed');
  }
  catch(error) {
    console.log(error);
    process.exit(1);
  }
}

main();