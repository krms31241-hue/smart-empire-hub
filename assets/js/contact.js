const FORMSPREE_ENDPOINT = window.SITE_CONFIG?.formspreeEndpoint || '';

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    if (FORMSPREE_ENDPOINT) {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Server error');
    }

    showFormMessage('✓ Message sent! We\'ll reply within 24-48 hours.', 'success');
    e.target.reset();
  } catch (err) {
    showFormMessage('✗ Failed to send. Please email us directly at hello@smartempirehub.com', 'error');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
});

function showFormMessage(text, type) {
  let msg = document.getElementById('form-message');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'form-message';
    document.getElementById('contact-form').appendChild(msg);
  }
  msg.textContent = text;
  msg.className = `form-message ${type}`;
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 6000);
}
