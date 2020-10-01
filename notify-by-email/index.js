const nodemailer = require('nodemailer');
const {transportConfig, subscribers} = require('./config');
const fse = require('fs-extra');

const {valuesJSON: filePathToValuesJson} = require('../paths');

async function main() {
  try {
    const transport = nodemailer.createTransport(transportConfig);

    const {lastVersion} = await fse.readJSON(filePathToValuesJson);

    const message = {
      from: transportConfig.auth.user,
      to: subscribers,
      subject: `IMAC v${lastVersion} has been built`,
      text: 'Check out OneDrive'
    }
    await transport.sendMail(message);

    console.log('All subscribers were notified');
  }
  catch(error) {
    console.log(error);
    process.exit(1);
  }
}

main();