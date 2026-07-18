const modal = document.getElementById('payment-modal');
const closeBtn = document.querySelector('.close-modal');
let selectedPlan = '';
let planPrice = '';

// Your WhatsApp number (replace with your actual number)
// Format: Country code + number without leading zero
// Example: Egypt 201012345678
const WHATSAPP_NUMBER = "201000000000"; // ⚠️ CHANGE THIS TO YOUR NUMBER

// Your payment gateway URL (replace with your actual Lemon Squeezy/Gumroad link)
// Example: https://your-store.lemonsqueezy.com/checkout/buy/xxxx
const PAYMENT_GATEWAY_URL = "https://your-payment-gateway.com/checkout"; // ⚠️ CHANGE THIS

function openPayment(plan, price) {
    selectedPlan = plan;
    planPrice = price;
    document.getElementById('modal-plan-name').textContent = `You selected: ${plan} Plan ($${price}/month)`;
    modal.style.display = 'block';
    document.getElementById('local-instructions').style.display = 'none';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

// Process Card Payment (Automated via Payment Gateway)
function processCardPayment() {
    // In production, this redirects to your payment gateway (Lemon Squeezy, Gumroad, etc.)
    // The gateway handles the card payment and automatically deposits to your Mashreq account
    
    // For now, show a message (replace with actual redirect)
    const checkoutUrl = `${PAYMENT_GATEWAY_URL}?plan=${selectedPlan}&price=${planPrice}`;
    
    // Uncomment the line below when you have your actual payment gateway URL:
    // window.location.href = checkoutUrl;
    
    // Temporary message for testing:
    alert(`Redirecting to secure payment gateway...\n\nPlan: ${selectedPlan}\nAmount: $${planPrice}\n\n(In production, this will redirect to Lemon Squeezy/Gumroad which automatically deposits to your Mashreq USD account)`);
}

// Select Local Payment Method
function selectLocalMethod(method) {
    const amountEGP = Math.round(planPrice * 50); // Approximate USD to EGP conversion
    
    document.getElementById('local-amount').textContent = `$${planPrice} (approx. ${amountEGP} EGP)`;
    document.getElementById('local-method-name').textContent = method;
    document.getElementById('local-instructions').style.display = 'block';
    
    // Generate WhatsApp link with pre-filled message
    const message = `Hello, I want to activate the ${selectedPlan} plan ($${planPrice}).\n\nI have paid via ${method}.\nMy Transaction ID is: [PLEASE ENTER YOUR TRANSACTION ID HERE]\n\nPlease activate my account.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    document.getElementById('whatsapp-link').href = whatsappUrl;
    
    // Scroll to instructions
    document.getElementById('local-instructions').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
