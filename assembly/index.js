const fse = require('fs-extra');
const {unzipToFolder, zipFolder} = require('../lib');
const {
  valuesJSON: filePathToValuesJson,
  withoutIMACZIP,
  buildOutput,
  tmpFolder,
  builds
} = require('../paths');

async function main() {
  try {
    console.log('assembling...')
    const {version} = await fse.readJSON(filePathToValuesJson);
    await fse.emptyDir(`${tmpFolder}/1`)
    await unzipToFolder(withoutIMACZIP, `${tmpFolder}/1`);
    await fse.copy(`${buildOutput}/imac`, `${tmpFolder}/1/imac/bin/imac`);
    console.log('creating zip archive...');
    await fse.emptyDir(`${builds}/v${version}`);
    await zipFolder(`${builds}/v${version}/imac.zip`, `${tmpFolder}/1/imac`);
    console.log(`assembled imac is saved as ${builds}/v${version}/imac.zip`);
  }
  catch(error) {
    console.log(error);
  }
}

main();