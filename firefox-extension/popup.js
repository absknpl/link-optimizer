// Element References
const qrcodeDiv = document.getElementById('qrcode');
const fileInput = document.getElementById('file-input');
const scannedUrlDiv = document.getElementById('scanned-url');
const copyScannedBtn = document.getElementById('copy-scanned');
const launchSiteBtn = document.getElementById('launch-site');

// QR Code Action Buttons
const copyQrBtn = document.getElementById('copy-qr') || { disabled: false };
const saveQrBtn = document.getElementById('save-qr') || { disabled: false };

// Constants
const SPOO_API_URL = 'https://spoo.me/';

// State Variables
let currentScannedUrl = '';

// Initialize buttons
copyQrBtn.disabled = true;
saveQrBtn.disabled = true;

document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // URL Shortening
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

    document.getElementById('copy-short').addEventListener('click', () => {
        const shortUrl = document.getElementById('short-url').value;
        if (shortUrl && !shortUrl.startsWith('Error')) {
            navigator.clipboard.writeText(shortUrl);
        }
    });

    // QR Code Generation
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

    // QR Code Actions
    saveQrBtn.addEventListener('click', function() {
        const qrCodeImage = qrcodeDiv.querySelector('img');
        if (qrCodeImage) {
            const link = document.createElement('a');
            link.href = qrCodeImage.src;
            link.download = 'qr-code-' + new Date().getTime() + '.png';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Visual feedback
            const originalText = saveQrBtn.textContent;
            saveQrBtn.textContent = 'Saved!';
            setTimeout(() => {
                saveQrBtn.textContent = originalText;
            }, 2000);
        }
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

    // QR Code Observer
    const observer = new MutationObserver(function(mutations) {
        const hasQR = qrcodeDiv.querySelector('img') !== null;
        saveQrBtn.disabled = !hasQR;
        copyQrBtn.disabled = !hasQR;
    });
    observer.observe(qrcodeDiv, { childList: true });

    // QR Code Scanning
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
                        currentScannedUrl = code.data;
                        scannedUrlDiv.textContent = code.data;
                        launchSiteBtn.disabled = false;
                    } else {
                        scannedUrlDiv.textContent = 'No QR code found';
                        launchSiteBtn.disabled = true;
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // Scanned URL Actions
    launchSiteBtn.addEventListener('click', function() {
        if (currentScannedUrl) {
            chrome.tabs.create({ url: currentScannedUrl });
        }
    });

    copyScannedBtn.addEventListener('click', function() {
        if (scannedUrlDiv.textContent && scannedUrlDiv.textContent !== 'No QR code found') {
            navigator.clipboard.writeText(scannedUrlDiv.textContent);
        }
    });
});