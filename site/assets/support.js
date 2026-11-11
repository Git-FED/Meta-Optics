(() => {
  const gate = document.getElementById('age-gate');
  const form = document.getElementById('age-gate-form');
  const check = document.getElementById('age-confirm');
  const status = document.getElementById('gate-status');
  const content = document.getElementById('support-content');
  const sessionKey = 'gitfed_support_age_18_confirmed';
  let integrationsLoaded = false;

  function loadScript(src, onload, onerror) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (src.includes('paypal.com/sdk/js')) script.dataset.sdkIntegrationSource = 'button-factory';
    if (onload) script.addEventListener('load', onload, { once: true });
    if (onerror) script.addEventListener('error', onerror, { once: true });
    document.head.appendChild(script);
    return script;
  }

  function revealEmbeds() {
    document.querySelectorAll('[data-src]').forEach((node) => {
      if (!node.getAttribute('src')) node.setAttribute('src', node.dataset.src);
    });
  }

  function setupPayPal() {
    const statusNode = document.getElementById('paypal-status');
    const sdk = 'https://www.paypal.com/sdk/js?client-id=BAA_ndqaWMyQwTnDZ0LXwLQ22jdJo9uxkeXYqmBbF-hD41HMiZ83mvOcx1Kti0b6ZfXfje7Q1ievNaS8Ok&vault=true&intent=subscription';
    loadScript(sdk, () => {
      if (!window.paypal) {
        statusNode.textContent = 'PayPal could not load. Use the provider link below or try again later.';
        return;
      }
      window.paypal.Buttons({
        style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
        createSubscription: (data, actions) => actions.subscription.create({
          plan_id: 'P-4FD24238VX4902214NK2XP2Y',
          quantity: 1
        }),
        onApprove: () => {
          statusNode.textContent = 'PayPal reports that the subscription was approved. Check your PayPal email for the provider’s confirmation.';
        },
        onError: () => {
          statusNode.textContent = 'PayPal could not complete this step. No confirmation was received; check the provider before retrying.';
        }
      }).render('#paypal-button-container-P-4FD24238VX4902214NK2XP2Y').catch(() => {
        statusNode.textContent = 'PayPal could not display its checkout. Use the provider link below or try again later.';
      });
    }, () => {
      statusNode.textContent = 'PayPal checkout could not load. Use the provider link below or try again later.';
    });
  }

  function setupStripe() {
    loadScript('https://js.stripe.com/v3/buy-button.js', null, () => {
      const note = document.createElement('p');
      note.className = 'provider-status';
      note.textContent = 'Stripe checkout could not load. Use the Stripe link below or try again later.';
      document.getElementById('stripe-checkout').appendChild(note);
    });
  }

  function setupKofi() {
    loadScript('https://storage.ko-fi.com/cdn/scripts/overlay-widget.js', () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('fedpromptly', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#00b9fe',
          'floating-chat.donateButton.text-color': '#fff'
        });
      }
    });
  }

  function setupSubstack() {
    const newsletter = document.getElementById('substack-form');
    if (!newsletter) return;
    const emailInput = document.getElementById('substack-email');
    const consent = document.getElementById('substack-consent');
    const button = document.getElementById('substack-submit');
    const message = document.getElementById('substack-status');
    const endpoint = 'https://gitfed.substack.com/api/v1/free?nojs=true';
    const setMessage = (text, kind = '') => {
      message.textContent = text;
      message.className = `provider-status${kind ? ` ${kind}` : ''}`;
    };
    newsletter.addEventListener('submit', async (event) => {
      event.preventDefault();
      setMessage('');
      const email = emailInput.value.trim();
      if (!emailInput.validity.valid) {
        setMessage('Enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }
      if (!consent.checked) {
        setMessage('Please confirm that you want to share this email with GitFed’s Substack signup service.', 'error');
        consent.focus();
        return;
      }
      button.disabled = true;
      const oldText = button.textContent;
      button.textContent = 'Submitting…';
      try {
        const body = new URLSearchParams({ email, source: 'embed' });
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        });
        let data = {};
        try { data = await response.json(); } catch (_) { /* use HTTP status */ }
        if (!response.ok) throw new Error(data.error || data.message || 'Substack did not accept the request.');
        newsletter.reset();
        setMessage(data.requires_confirmation ? 'Almost there—check your inbox to confirm.' : 'Your request was submitted. Check your inbox for confirmation.', 'success');
      } catch (error) {
        if (error instanceof TypeError) {
          setMessage('The embedded signup is unavailable here. Opening GitFed’s Substack page in a new tab.', 'error');
          window.open('https://gitfed.substack.com/subscribe', '_blank', 'noopener');
        } else {
          setMessage(error.message || 'Subscription failed. Please use the Substack link below.', 'error');
        }
      } finally {
        button.disabled = false;
        button.textContent = oldText;
      }
    });
  }

  function enableSupport() {
    if (gate) gate.hidden = true;
    if (content) content.hidden = false;
    if (integrationsLoaded) return;
    integrationsLoaded = true;
    revealEmbeds();
    setupPayPal();
    setupStripe();
    setupKofi();
    setupSubstack();
  }

  if (sessionStorage.getItem(sessionKey) === 'yes') {
    enableSupport();
  }
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!check.checked) {
        status.textContent = 'Confirm that you are at least 18 to continue.';
        check.focus();
        return;
      }
      sessionStorage.setItem(sessionKey, 'yes');
      enableSupport();
      document.getElementById('support-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
