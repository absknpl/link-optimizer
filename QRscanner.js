// Select the file input element
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const resultDiv = document.getElementById('result');
const copyLinkButton = document.getElementById('copyLinkButton');
const backButton = document.getElementById('backButton');

fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const image = new Image();
            image.src = reader.result;

            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    resultDiv.innerText = 'QR Code Content: ' + code.data;

                    // Enable the "Copy Link" button
                    copyLinkButton.disabled = false;
                    copyLinkButton.addEventListener('click', function () {
                        // Copy the content to the clipboard
                        const textArea = document.createElement('textarea');
                        textArea.value = code.data;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        alert('QR code content copied to clipboard');
                    });
                } else {
                    resultDiv.innerText = 'No QR code found.';
                    // Disable the "Copy Link" button
                    copyLinkButton.disabled = true;
                }
            };
        };
        reader.readAsDataURL(file);
    }
});

// Handle the "Back" button click
document.addEventListener('DOMContentLoaded', function () {
    backButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });});


