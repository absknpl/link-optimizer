document.addEventListener('DOMContentLoaded', function () {
    const qrcodeDiv = document.getElementById('qrcode');
    const linkInput = document.getElementById('linkInput');
    const copyQRButton = document.getElementById('copyQRButton');
    const backButton = document.getElementById('backButton');

    // Function to generate QR code from user input
    function generateQRCodeFromInput() {
        const url = linkInput.value.trim();
        if (url) {
            qrcodeDiv.innerHTML = ''; // Clear previous QR code
            const qrcode = new QRCode(qrcodeDiv, url);
        }
    }

    // Function to generate QR code for the current page
    function generateQRCodeForCurrentPage() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tab = tabs[0];
            if (tab.url.startsWith('http') || tab.url.startsWith('https')) {
                qrcodeDiv.innerHTML = ''; // Clear previous QR code
                const qrcode = new QRCode(qrcodeDiv, tab.url);
            } else {
                qrcodeDiv.innerHTML = 'Cannot generate QR code for this page';
            }
        });
    }

    // Function to copy the QR code image to the clipboard
    function copyQRCodeToClipboard() {
        const qrCodeImage = qrcodeDiv.querySelector('img');
        if (qrCodeImage) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const img = new Image();
            img.src = qrCodeImage.src;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                canvas.toBlob(function (blob) {
                    const item = new ClipboardItem({ 'image/png': blob });
                    navigator.clipboard.write([item]).then(function () {
                        alert('QR Code image copied to clipboard');
                    });
                }, 'image/png');
            };
        }
    }

    // Button click event handlers
    document.getElementById('generateLinkButton').addEventListener('click', generateQRCodeFromInput);
    document.getElementById('generateCurrentPageButton').addEventListener('click', generateQRCodeForCurrentPage);
    copyQRButton.addEventListener('click', copyQRCodeToClipboard);

    backButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});
