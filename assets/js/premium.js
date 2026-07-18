// Payment configuration - loaded from environment / config
const PAYMENT_CONFIG = {
  whatsappNumber: window.SITE_CONFIG?.whatsappNumber || '',
  gatewayUrl: window.SITE_CONFIG?.paymentGateway || '',
  paymentAccount: window.SITE_CONFIG?.paymentAccount || ''
};

const modal = document.getElementById('payment-modal');
let selectedPlan = '';
let selectedPrice = '';

function openPayment(plan, price) {
  selectedPlan = plan;
  selectedPrice = price;
  document.getElementById('modal-plan-name').textContent =
    `You selected: ${plan} Plan ($${price}/month)`;
  document.getElementById('local-instructions').style.display = 'none';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

window.onclick = (e) => { if (e.target === modal) closeModal(); };
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

function processCardPayment() {
  if (PAYMENT_CONFIG.gatewayUrl) {
    const url = `${PAYMENT_CONFIG.gatewayUrl}?plan=${selectedPlan}&price=${selectedPrice}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    alert('Card payment will be available soon. Please use local payment methods for now.');
  }
}

function selectLocalMethod(method) {
  const amountEGP = Math.round(parseFloat(selectedPrice) * 50);
  document.getElementById('local-amount').textContent =
    `$${selectedPrice} (~${amountEGP} EGP)`;
  document.getElementById('local-method-name').textContent = method;
  document.getElementById('payment-account').textContent =
    PAYMENT_CONFIG.paymentAccount || 'Contact support for account details';
  document.getElementById('local-instructions').style.display = 'block';

  if (PAYMENT_CONFIG.whatsappNumber) {
    const message = encodeURIComponent(
      `Hello, I want to activate the ${selectedPlan} plan ($${selectedPrice}/month).\n\n` +
      `I paid via ${method}.\n` +
      `Transaction ID: [ENTER YOUR TRANSACTION ID]\n\n` +
      `Please activate my account.`
    );
    document.getElementById('whatsapp-link').href =
      `https://wa.me/${PAYMENT_CONFIG.whatsappNumber}?text=${message}`;
  } else {
    document.getElementById('whatsapp-link').style.display = 'none';
  }

  document.getElementById('local-instructions').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
