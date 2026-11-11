(() => {
  const host = document.querySelector('.footer-group:first-of-type .footer-buttons');
  if (!host || document.getElementById('fp-invite-dialog')) return;

  const button = document.createElement('button');
  button.className = 'fp-invite-btn';
  button.type = 'button';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'fp-invite-dialog');
  button.innerHTML = '<span class="fp-invite-icon-wrap"><img class="fp-invite-icon" src="https://i.ibb.co/67vXcRnx/icon.png" alt=""><span class="fp-invite-dot" aria-hidden="true"></span></span><span class="fp-invite-label"><span class="fp-invite-name">FedPromptly</span><span class="fp-invite-meta">Open source · AI tools · Publishing</span></span><svg class="fp-invite-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  host.append(button);

  const dialog = document.createElement('dialog');
  dialog.className = 'fp-invite-dialog';
  dialog.id = 'fp-invite-dialog';
  dialog.setAttribute('aria-labelledby', 'fp-invite-title');
  dialog.innerHTML = `
    <div class="fp-invite-panel">
      <button class="fp-invite-close" type="button" aria-label="Close invite">×</button>
      <div class="fp-invite-banner" aria-hidden="true"></div>
      <div class="fp-invite-modal-icon-wrap">
        <img class="fp-invite-modal-icon" src="https://i.ibb.co/67vXcRnx/icon.png" alt="FedPromptly logo">
        <span class="fp-invite-online-dot" title="Online" aria-label="Online"></span>
      </div>
      <div class="fp-invite-content">
        <h2 id="fp-invite-title">FedPromptly</h2>
        <div class="fp-invite-stats"><span class="tag">Open source</span><span aria-hidden="true">·</span><span>AI tools</span><span aria-hidden="true">·</span><span>Publishing</span></div>
        <p class="fp-invite-description">Building an open-source ecosystem for <strong>browser-native AI tools</strong> and <strong>cross-platform publishing</strong>.</p>
        <div class="fp-invite-pills"><span class="fp-invite-pill">Open source</span><span class="fp-invite-pill">Browser-native</span><span class="fp-invite-pill">AI tools</span><span class="fp-invite-pill">Cross-platform</span></div>
        <div class="fp-invite-contacts"><span class="label">Contact</span><a href="mailto:contact@fedpromptly.com">contact@fedpromptly.com</a><a href="mailto:careers@fedpromptly.com">careers@fedpromptly.com</a></div>
        <a class="fp-invite-join" href="https://www.fedpromptly.com/social" target="_blank" rel="noopener noreferrer">＋&nbsp; Join the community</a>
      </div>
      <div class="fp-invite-footer"><a href="https://www.fedpromptly.com" target="_blank" rel="noopener noreferrer">www.fedpromptly.com</a><span>‹/› &nbsp; Open source</span></div>
    </div>`;
  document.body.append(dialog);

  const close = () => dialog.close();
  button.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.fp-invite-close').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
})();
