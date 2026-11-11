(() => {
  const eligible = new Set(['Canada', 'Switzerland', 'Russia', 'Iran', 'Somalia', 'Turkmenistan']);
  const form = document.getElementById('private-eligibility-form');
  if (!form) return;

  const country = document.getElementById('residence-country');
  const age = document.getElementById('age-attest');
  const residency = document.getElementById('country-attest');
  const button = document.getElementById('reveal-button');
  const message = document.getElementById('eligibility-message');
  const gate = document.getElementById('private-gate');
  const reveal = document.getElementById('matrix-reveal');
  const matrixLink = document.getElementById('matrix-room-link');

  function updateButton() {
    button.disabled = !(country.value && age.checked && residency.checked);
    message.textContent = '';
    message.classList.remove('error');
  }
  [country, age, residency].forEach((control) => control.addEventListener('change', updateButton));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!country.value || !age.checked || !residency.checked) {
      message.textContent = 'Choose your residence country and confirm both statements.';
      return;
    }
    if (!eligible.has(country.value)) {
      message.textContent = 'Based on the country list supplied for this page, the private-room link is not available for that selection.';
      message.classList.add('error');
      return;
    }
    matrixLink.href = 'https://matrix.to/#/#fed-os:matrix.org';
    gate.hidden = true;
    reveal.hidden = false;
    reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
