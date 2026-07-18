class QRGenerator {
    constructor() {
        this.qrCode = null;
        this.init();
    }

    init() {
        this.generateBtn = document.getElementById('generate-btn');
        this.downloadPngBtn = document.getElementById('download-png');
        this.downloadSvgBtn = document.getElementById('download-svg');
        this.copyImageBtn = document.getElementById('copy-image');
        this.qrOutput = document.getElementById('qr-output');
        this.qrcodeDiv = document.getElementById('qrcode');
        
        this.generateBtn.addEventListener('click', () => this.generate());
        this.downloadPngBtn.addEventListener('click', () => this.downloadPNG());
        this.downloadSvgBtn.addEventListener('click', () => this.downloadSVG());
        this.copyImageBtn.addEventListener('click', () => this.copyImage());
        
        // Generate on Enter key
        document.getElementById('qr-text').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.generate();
            }
        });
    }

    generate() {
        const text = document.getElementById('qr-text').value.trim();
        const size = parseInt(document.getElementById('qr-size').value);
        const color = document.getElementById('qr-color').value;
        const bgColor = document.getElementById('qr-bg').value;

        if (!text) {
            alert('Please enter text or URL');
            return;
        }

        // Clear previous QR code
        this.qrcodeDiv.innerHTML = '';
        
        // Generate new QR code
        this.qrCode = new QRCode(this.qrcodeDiv, {
            text: text,
            width: size,
            height: size,
            colorDark: color,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Show output section
        this.qrOutput.style.display = 'block';
        
        // Scroll to output
        setTimeout(() => {
            this.qrOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    downloadPNG() {
        const canvas = this.qrcodeDiv.querySelector('canvas');
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    downloadSVG() {
        const svg = this.qrcodeDiv.querySelector('svg');
        if (!svg) {
            // If only canvas exists, convert to SVG
            const canvas = this.qrcodeDiv.querySelector('canvas');
            if (canvas) {
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
            return;
        }
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'qrcode.svg';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }

    async copyImage() {
        const canvas = this.qrcodeDiv.querySelector('canvas');
        if (!canvas) return;
        
        try {
            canvas.toBlob(async (blob) => {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
                alert('QR code copied to clipboard!');
            });
        } catch (err) {
            alert('Failed to copy image');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.qrGenerator = new QRGenerator();
});
