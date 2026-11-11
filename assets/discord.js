(() => {
  const sessionKey = 'muse_discord_nsfw_18_confirmed';
  const directory = document.getElementById('nsfw-button');
  const dialog = document.getElementById('ageGate');
  const checkbox = document.getElementById('ageCheck');
  const confirm = document.getElementById('ageConfirm');
  const cancel = document.getElementById('ageCancel');
  const error = document.getElementById('ageError');

  if (directory && dialog && checkbox && confirm && cancel) {
    directory.addEventListener('click', () => {
      checkbox.checked = false;
      confirm.disabled = true;
      if (error) error.textContent = '';
      dialog.showModal();
    });
    checkbox.addEventListener('change', () => {
      confirm.disabled = !checkbox.checked;
      if (error) error.textContent = '';
    });
    confirm.addEventListener('click', () => {
      if (!checkbox.checked) {
        if (error) error.textContent = 'Confirm that you are at least 18 to continue.';
        checkbox.focus();
        return;
      }
      sessionStorage.setItem(sessionKey, 'yes');
      window.location.href = 'nsfw-access.html';
    });
    cancel.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  const protectedContent = document.getElementById('request-content');
  const denied = document.getElementById('request-denied');
  if (protectedContent && denied) {
    if (sessionStorage.getItem(sessionKey) === 'yes') {
      protectedContent.hidden = false;
      denied.hidden = true;
    } else {
      protectedContent.hidden = true;
      denied.hidden = false;
    }
  }
})();
