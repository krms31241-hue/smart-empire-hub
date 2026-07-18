document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // For now, just show success message
    // In production, you would send this to a backend or email service
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
    
    // Optional: Save to localStorage for now
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('contacts', JSON.stringify(contacts));
});
