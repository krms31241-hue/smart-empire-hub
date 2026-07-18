class JSONFormatter {
    constructor() {
        this.init();
    }

    init() {
        this.formatBtn = document.getElementById('format-btn');
        this.minifyBtn = document.getElementById('minify-btn');
        this.validateBtn = document.getElementById('validate-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.downloadBtn = document.getElementById('download-btn');
        
        this.jsonInput = document.getElementById('json-input');
        this.jsonOutput = document.getElementById('json-output');
        this.formattedJson = document.getElementById('formatted-json');
        this.jsonActions = document.getElementById('json-actions');
        this.jsonStatus = document.getElementById('json-status');

        this.formatBtn.addEventListener('click', () => this.format(false));
        this.minifyBtn.addEventListener('click', () => this.format(true));
        this.validateBtn.addEventListener('click', () => this.validate());
        this.clearBtn.addEventListener('click', () => this.clear());
        this.copyBtn.addEventListener('click', () => this.copy());
        this.downloadBtn.addEventListener('click', () => this.download());
    }

    format(minify = false) {
        const input = this.jsonInput.value.trim();
        
        if (!input) {
            this.showStatus('Please enter JSON data', 'error');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
            
            this.formattedJson.textContent = formatted;
            this.jsonOutput.style.display = 'block';
            this.jsonActions.style.display = 'flex';
            this.showStatus('JSON formatted successfully!', 'success');
        } catch (e) {
            this.showStatus('Invalid JSON: ' + e.message, 'error');
            this.jsonOutput.style.display = 'none';
            this.jsonActions.style.display = 'none';
        }
    }

    validate() {
        const input = this.jsonInput.value.trim();
        
        if (!input) {
            this.showStatus('Please enter JSON data', 'error');
            return;
        }

        try {
            JSON.parse(input);
            this.showStatus('✓ Valid JSON!', 'success');
        } catch (e) {
            this.showStatus(' Invalid JSON: ' + e.message, 'error');
        }
    }

    clear() {
        this.jsonInput.value = '';
        this.jsonOutput.style.display = 'none';
        this.jsonActions.style.display = 'none';
        this.jsonStatus.textContent = '';
    }

    async copy() {
        const text = this.formattedJson.textContent;
        
        try {
            await navigator.clipboard.writeText(text);
            this.showStatus('Copied to clipboard!', 'success');
        } catch (err) {
            this.showStatus('Failed to copy', 'error');
        }
    }

    download() {
        const text = this.formattedJson.textContent;
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'formatted.json';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        this.showStatus('File downloaded!', 'success');
    }

    showStatus(message, type) {
        this.jsonStatus.textContent = message;
        this.jsonStatus.className = 'json-status ' + type;
        
        setTimeout(() => {
            this.jsonStatus.textContent = '';
            this.jsonStatus.className = 'json-status';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.jsonFormatter = new JSONFormatter();
});
