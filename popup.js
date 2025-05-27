document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Shorten URL functionality
    const SPOO_API_URL = 'https://spoo.me/';
    document.getElementById('shorten-btn').addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const longUrl = tab.url;
            
            const response = await fetch(SPOO_API_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `url=${encodeURIComponent(longUrl)}`
            });
            
            if (!response.ok) throw new Error('Failed to shorten URL');
            
            const data = await response.json();
            const shortUrl = data.short_url;
            
            document.getElementById('short-url').value = shortUrl;
        } catch (error) {
            document.getElementById('short-url').value = 'Error: ' + error.message;
        }
    });

    // Copy short URL
    document.getElementById('copy-short').addEventListener('click', () => {
        const shortUrl = document.getElementById('short-url').value;
        if (shortUrl && !shortUrl.startsWith('Error')) {
            navigator.clipboard.writeText(shortUrl);
        }
    });

    // QR Code Generation
    const qrcodeDiv = document.getElementById('qrcode');
    document.getElementById('generate-qr').addEventListener('click', function() {
        const url = document.getElementById('qr-input').value.trim();
        if (url) {
            qrcodeDiv.innerHTML = '';
            new QRCode(qrcodeDiv, url);
        }
    });

    document.getElementById('generate-current').addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.url.startsWith('http')) {
                qrcodeDiv.innerHTML = '';
                new QRCode(qrcodeDiv, tab.url);
                document.getElementById('qr-input').value = tab.url;
            }
        });
    });

    document.getElementById('copy-qr').addEventListener('click', function() {
        const qrCodeImage = qrcodeDiv.querySelector('img');
        if (qrCodeImage) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const img = new Image();
            img.src = qrCodeImage.src;
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                canvas.toBlob(function(blob) {
                    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                }, 'image/png');
            };
        }
    });

    // QR Code Scanning
    const fileInput = document.getElementById('file-input');
    const scannedUrlDiv = document.getElementById('scanned-url');
    const copyScannedBtn = document.getElementById('copy-scanned');

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                const img = new Image();
                img.src = reader.result;
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    
                    if (code) {
                        scannedUrlDiv.textContent = code.data;
                    } else {
                        scannedUrlDiv.textContent = 'No QR code found';
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    });

    copyScannedBtn.addEventListener('click', function() {
        if (scannedUrlDiv.textContent && scannedUrlDiv.textContent !== 'No QR code found') {
            navigator.clipboard.writeText(scannedUrlDiv.textContent);
        }
    });
});