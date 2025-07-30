const statusDiv = document.getElementById('status');

function toggleForm(enabled) {
  document.querySelectorAll('input, textarea, button').forEach(el => {
    el.disabled = !enabled;
  });
}

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  toggleForm(false);
  statusDiv.textContent = 'Starting to send emails...';

  const email = document.getElementById('email').value.trim();
  const appPassword = document.getElementById('appPassword').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const recipientsRaw = document.getElementById('emails-list').value.trim();
  const body = document.getElementById('body').value.trim();
  const attachmentInput = document.getElementById('attachment');

  const recipients = recipientsRaw
    .split(',')
    .map(r => r.trim())
    .filter(Boolean);

  let attachments = [];
  if (attachmentInput.files.length > 0) {
    attachments = await Promise.all(
      Array.from(attachmentInput.files).map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          filename: file.name,
          buffer: arrayBuffer,
          contentType: file.type,
        };
      })
    );
  }

  window.electronAPI.sendMail({
    email,
    appPassword,
    subject,
    recipients,
    body,
    attachments,
  });
});

window.electronAPI.onMailProgress(({ recipient }) => {
  statusDiv.textContent = `Sending mail to ${recipient}...`;
});

window.electronAPI.onMailStatus(({ success, message }) => {
  toggleForm(true);
  statusDiv.textContent = success
    ? 'All mails sent successfully!'
    : `Error sending mail: ${message}`;

  setTimeout(() => {
    statusDiv.textContent = '';
  }, 5000);
});
