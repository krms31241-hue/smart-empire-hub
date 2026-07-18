class PasswordGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.generateBtn = document.getElementById('generate-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.passwordOutput = document.getElementById('password-output');
        this.lengthSlider = document.getElementById('password-length');
        this.lengthValue = document.getElementById('length-value');
        this.strengthMeter = document.getElementById('strength-meter');
        this.strengthFill = document.getElementById('strength-fill');
        this.strengthText = document.getElementById('strength-text');

        this.generateBtn.addEventListener('click', () => this.generate());
        this.copyBtn.addEventListener('click', () => this.copy());
        
        this.lengthSlider.addEventListener('input', (e) => {
            this.lengthValue.textContent = e.target.value;
        });

        // Generate on load
        this.generate();
    }

    generate() {
        const length = parseInt(this.lengthSlider.value);
        const includeUppercase = document.getElementById('include-uppercase').checked;
        const includeLowercase = document.getElementById('include-lowercase').checked;
        const includeNumbers = document.getElementById('include-numbers').checked;
        const includeSymbols = document.getElementById('include-symbols').checked;

        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            alert('Please select at least one character type');
            return;
        }

        let password = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            password += charset[array[i] % charset.length];
        }

        this.passwordOutput.value = password;
        this.calculateStrength(password);
    }

    calculateStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (password.length >= 16) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        const percentage = Math.min((strength / 7) * 100, 100);
        let strengthLabel = 'Weak';
        let color = '#ef4444';

        if (percentage >= 80) {
            strengthLabel = 'Very Strong';
            color = '#10b981';
        } else if (percentage >= 60) {
            strengthLabel = 'Strong';
            color = '#3b82f6';
        } else if (percentage >= 40) {
            strengthLabel = 'Medium';
            color = '#fbbf24';
        }

        this.strengthMeter.style.display = 'block';
        this.strengthFill.style.width = percentage + '%';
        this.strengthFill.style.background = color;
        this.strengthText.textContent = `Strength: ${strengthLabel}`;
        this.strengthText.style.color = color;
    }

    async copy() {
        if (!this.passwordOutput.value) return;
        
        try {
            await navigator.clipboard.writeText(this.passwordOutput.value);
            this.copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            // Fallback
            this.passwordOutput.select();
            document.execCommand('copy');
            this.copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
            }, 2000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.passwordGenerator = new PasswordGenerator();
});
