const myPassGenerateButton = document.getElementById('myPassGenerateButton');

myPassGenerateButton.addEventListener('click', function () {
    window.location.href = 'passGenerator.html';
});

const qrCodeGenerate = document.getElementById('qrCodeGenerate');

qrCodeGenerate.addEventListener('click', function () {
    window.location.href = 'qrCodeGenerator.html';
});

document.addEventListener('DOMContentLoaded', function () {
    const abisekButton = document.getElementById('abisek');
    abisekButton.addEventListener('click', function () {
        window.location.href = 'qrScanner.html';
    });
});
