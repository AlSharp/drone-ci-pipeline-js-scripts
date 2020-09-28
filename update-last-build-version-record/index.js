async function main() {
  try {
    const filePathToValuesJson = '/home/pi/share/drone-service/values.json';
    const {version} = await readJSON(filePathToValuesJson);
    await writeJSON(filePathToValuesJson, {...valuesJSON, lastVersion: version});
    console.log('update last build version record is completed');
  }
  catch(error) {
    console.log(error);
    process.exit(1);
  }
}

main();