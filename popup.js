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
    
    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }
    
    const data = await response.json();
    const shortUrl = data.short_url;
    
    document.getElementById('short-url').value = shortUrl;
    document.getElementById('short-url').style.color = '#000';
  } catch (error) {
    console.error('Error shortening URL:', error);
    document.getElementById('short-url').value = 'Error: ' + error.message;
    document.getElementById('short-url').style.color = 'red';
  }
});

// Copy short URL
document.getElementById('copy-short').addEventListener('click', () => {
  const shortUrl = document.getElementById('short-url').value;
  if (shortUrl && !shortUrl.startsWith('Error')) {
    navigator.clipboard.writeText(shortUrl).then(() => {
      const copyBtn = document.getElementById('copy-short');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    });
  }
});

// QR Code generation
document.getElementById('generate-qr').addEventListener('click', () => {
  const input = document.getElementById('qr-input').value.trim();
  let url = input || document.getElementById('short-url').value || '';
  
  if (!url) {
    alert('Please enter a URL or shorten a link first');
    return;
  }
  
  if (url.startsWith('Error')) {
    alert('Please fix the error or enter a valid URL');
    return;
  }
  
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  const qrCodeDiv = document.getElementById('qr-code');
  qrCodeDiv.innerHTML = '';
  
  try {
    new QRCode(qrCodeDiv, {
      text: url,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    
    document.getElementById('download-qr').style.display = 'inline-block';
    document.getElementById('copy-qr').style.display = 'inline-block';
  } catch (error) {
    console.error('QR Code generation error:', error);
    alert('Failed to generate QR code: ' + error.message);
  }
});

// QR Code for current page
document.getElementById('generate-current-page').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    if (!tab.url.startsWith('http') && !tab.url.startsWith('https')) {
      alert('Cannot generate QR code for this page');
      return;
    }
    
    const qrCodeDiv = document.getElementById('qr-code');
    qrCodeDiv.innerHTML = '';
    
    try {
      new QRCode(qrCodeDiv, {
        text: tab.url,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
      
      document.getElementById('download-qr').style.display = 'inline-block';
      document.getElementById('copy-qr').style.display = 'inline-block';
    } catch (error) {
      console.error('QR Code generation error:', error);
      alert('Failed to generate QR code: ' + error.message);
    }
  });
});

// Download QR Code
document.getElementById('download-qr').addEventListener('click', () => {
  const canvas = document.getElementById('qr-code').querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.png';
    a.click();
  }
});

// Copy QR Code to Clipboard
document.getElementById('copy-qr').addEventListener('click', async () => {
  const canvas = document.getElementById('qr-code').querySelector('canvas');
  if (canvas) {
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      alert('QR Code copied to clipboard');
    } catch (error) {
      console.error('Error copying QR code:', error);
      alert('Failed to copy QR code');
    }
  }
});

// QR Code scanning
document.getElementById('qr-file').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  try {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    
    if (code) {
      document.getElementById('scanned-url').textContent = code.data;
      document.getElementById('copy-scanned').disabled = false;
    } else {
      document.getElementById('scanned-url').textContent = 'No QR code found';
      document.getElementById('copy-scanned').disabled = true;
    }
  } catch (error) {
    console.error('Error scanning QR code:', error);
    document.getElementById('scanned-url').textContent = 'Error scanning QR code';
    document.getElementById('copy-scanned').disabled = true;
  }
});

// Copy scanned URL
document.getElementById('copy-scanned').addEventListener('click', () => {
  const url = document.getElementById('scanned-url').textContent;
  if (url && !url.startsWith('No QR code') && !url.startsWith('Error')) {
    navigator.clipboard.writeText(url).then(() => {
      const copyBtn = document.getElementById('copy-scanned');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy URL'; }, 2000);
    });
  }
});

// Initialize
document.getElementById('download-qr').style.display = 'none';
document.getElementById('copy-qr').style.display = 'none';