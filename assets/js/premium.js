const modal = document.getElementById('payment-modal');
const closeBtn = document.querySelector('.close-modal');
let selectedPlan = '';
let planPrice = '';

function openPayment(plan, price) {
    selectedPlan = plan;
    planPrice = price;
    document.getElementById('modal-plan-name').textContent = `You selected: ${plan} Plan ($${price}/month)`;
    modal.style.display = 'block';
    document.getElementById('payment-instructions').style.display = 'none';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

function selectMethod(method) {
    document.getElementById('pay-amount').textContent = `$${planPrice} (approx. ${planPrice * 50} EGP)`;
    document.getElementById('pay-method').textContent = method;
    document.getElementById('payment-instructions').style.display = 'block';
    
    // Generate WhatsApp link
    // Replace 201000000000 with your actual WhatsApp number
    const myNumber = "201000000000"; 
    const message = `Hello, I want to activate the ${selectedPlan} plan ($${planPrice}). I have paid via ${method}. My Transaction ID is: [PLEASE ENTER ID HERE]`;
    document.getElementById('whatsapp-link').href = `https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`;
}
