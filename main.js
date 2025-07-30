const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const nodemailer = require('nodemailer');

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 960,
    resizable: false,
    frame: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'src/index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('send-mail', async (event, data) => {
  const { email, appPassword, subject, recipients, body, attachments } = data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: appPassword,
    },
  });

  try {
    for (const recipient of recipients) {
      event.reply('mail-progress', { recipient });

      const mailOptions = {
        from: email,
        to: recipient,
        subject,
        text: body,
        attachments: attachments.length > 0 ? attachments : [],
      };

      await transporter.sendMail(mailOptions);
    }
    event.reply('mail-status', { success: true });
  } catch (error) {
    event.reply('mail-status', { success: false, message: error.message });
  }
});
