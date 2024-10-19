const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const credentials = {
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

async function initializeSheet() {
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();
}

async function addToWaitlist(name, email, phone, expectation, code, ip) {
  await initializeSheet();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({
    Name: name,
    Email: email,
    Phone: phone,
    Expectation: expectation,
    Code: code,
    IP: ip,
    VisitCount: 0,
    Status: 'Pending',
  });
}

async function getVisitCount(code) {
  await initializeSheet();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const row = rows.find(r => r.Code === code);
  return row ? parseInt(row.VisitCount) : 0;
}

async function incrementVisitCount(code) {
  await initializeSheet();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const row = rows.find(r => r.Code === code);
  if (row) {
    row.VisitCount = parseInt(row.VisitCount) + 1;
    if (parseInt(row.VisitCount) >= 10) {
      row.Status = 'Waitlisted';
    }
    await row.save();
  }
}

module.exports = { addToWaitlist, getVisitCount, incrementVisitCount };