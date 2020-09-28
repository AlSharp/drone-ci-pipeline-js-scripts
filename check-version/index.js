const path = require('path');

const {
  getArgument, readJSON, writeJSON, convertVersionToNumber
} = require('../lib');

async function main() {
  try {
    const filePathToPackageJson = path.join(getArgument(process.argv, 1), 'package.json');
    const filePathToValuesJson = '/home/pi/share/drone-service/values.json';

    console.log(`reading ${filePathToPackageJson}`);
    const {version} = await readJSON(filePathToPackageJson);
    console.log(`building version: ${version}`);

    console.log(`reading ${filePathToValuesJson}`);
    const valuesJSON = await readJSON(filePathToValuesJson);
    const lastVersion = valuesJSON.lastVersion;
    console.log(`last version built: ${lastVersion}`);

    const lastVersionInt = convertVersionToNumber(lastVersion);
    const versionInt = convertVersionToNumber(version);
    if (versionInt <= lastVersionInt) {
      throw (new Error(`${version} is not new version`));
    }
    
    await writeJSON(filePathToValuesJson, {...valuesJSON, version});
    console.log('check-version is completed');
  }
  catch(error) {
    console.log(error);
    process.exit(1);
  }
}

main();