const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendMail: (data) => {
    if (data.attachments && data.attachments.length > 0) {
      data.attachments = data.attachments.map(att => ({
        filename: att.filename,
        content: Buffer.from(att.buffer),
        contentType: att.contentType,
      }));
    }
    ipcRenderer.send('send-mail', data);
  },

  onMailStatus: (callback) => {
    ipcRenderer.on('mail-status', (event, args) => callback(args));
  },

  onMailProgress: (callback) => {
    ipcRenderer.on('mail-progress', (event, args) => callback(args));
  },
});
