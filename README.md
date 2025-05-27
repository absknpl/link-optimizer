Here's the updated README that covers both Chrome and Firefox versions:

# **Link Optimizer+**

🚀 **The Ultimate Browser Extension for URL Shortening & QR Code Management** (Chrome & Firefox)

---

![Extension Banner](https://github.com/user-attachments/assets/75e05d76-8334-4eb7-bf29-d97d14df557f)

## **📌 Table of Contents**

1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Installation Guide](#-installation-guide)
4. [Usage](#-usage)
5. [Technical Architecture](#-technical-architecture)
6. [Development Setup](#-development-setup)
7. [Contributing](#-contributing)
8. [License](#-license)
9. [Support & Contact](#-support--contact)

---

## **🌐 Project Overview**

**Link Optimizer+** is a **cross-browser extension** designed for professionals who need:  
✔ **Instant URL shortening** (Spoo.me API)  
✔ **Dynamic QR code generation & scanning**  
✔ **Seamless integration** with browser workflows

Available for both **Google Chrome** and **Mozilla Firefox**, built with **vanilla JavaScript** and **modern CSS** for maximum performance.

**Target Users:**

- **Developers** sharing repo links
- **Marketers** optimizing campaign URLs
- **Business professionals** needing quick QR solutions
- **Power users** who value efficiency

---

## **✨ Key Features**

### **🔗 URL Shortening**

- One-click shortening of current page URLs
- Copy to clipboard with a single click
- Error handling with user-friendly messages

### **📲 QR Code Generation**

- Generate QR codes for current page or custom URLs
- Download as PNG
- Copy QR image to clipboard

### **🔍 QR Code Scanner**

- Upload images containing QR codes
- Instant decoding & content extraction
- Launch scanned URLs directly

---

## **📥 Installation Guide**

### **For Chrome Users**

1. **From Chrome Web Store** (Coming Soon)

   - Search for "Link Optimizer+" in Chrome Web Store
   - Click "Add to Chrome"

2. **Manual Installation**
   ```bash
   git clone https://github.com/absknpl/link-optimizer.git
   ```
   - Open `chrome://extensions`
   - Enable **Developer mode**
   - Click **Load unpacked** and select the extension folder

### **For Firefox Users**

1. **From Mozilla Add-ons** (Coming Soon)

   - Search for "Link Optimizer+" in Firefox Add-ons
   - Click "Add to Firefox"

2. **Manual Installation**
   ```bash
   git clone https://github.com/absknpl/link-optimizer.git
   ```
   - Open `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select any file in the extension folder

---

## **🛠 Usage**

### **Shortening URLs**

1. Click the extension icon
2. Navigate to "Shorten URL" tab
3. Click "Shorten Current URL"
4. Copy the shortened link

### **Generating QR Codes**

1. Open the extension
2. Go to "QR Code" tab
3. Enter URL or click "QR for Current Page"
4. Download or copy the QR code

### **Scanning QR Codes**

1. Open the extension
2. Switch to "Scan QR" tab
3. Upload an image with QR code
4. View or launch the decoded URL

---

## **⚙ Technical Architecture**

### **Cross-Browser Support**

| Feature        | Chrome | Firefox |
| -------------- | ------ | ------- |
| URL Shortening | ✓      | ✓       |
| QR Generation  | ✓      | ✓       |
| QR Scanning    | ✓      | ✓       |
| Clipboard API  | ✓      | ✓       |

### **File Structure**

```
link-optimizer/
├── chrome/            # Chrome-specific files
├── firefox/           # Firefox-specific files
├── shared/            # Common assets
├── manifest.json      # Chrome manifest
├── manifest.firefox.json # Firefox manifest
└── README.md
```

---

## **💻 Development Setup**

### **Prerequisites**

- Git
- Chrome or Firefox browser

### **Building for Different Browsers**

```bash
# For Chrome development
cd chrome/
# Make changes and test in Chrome

# For Firefox development
cd firefox/
# Make changes and test in Firefox
```

---

## **🤝 Contributing**

We welcome contributions for both Chrome and Firefox versions!

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

**Please specify** if your changes are for:

- Chrome only
- Firefox only
- Both browsers

---

## **📜 License**

MIT License - see [LICENSE](LICENSE) for details.

---

## **📞 Support & Contact**

For issues with:

- **Chrome version**: contact@abisek.dev
- **Firefox version**: contact@abisek.dev

General inquiries: contact@abisek.dev

---

## **🌟 Why Choose Link Optimizer+?**

✅ **Cross-browser** - Works on Chrome and Firefox  
✅ **Lightweight** - No unnecessary bloat  
✅ **All-in-One** - URL + QR tools in one place

**🚀 Download now and optimize your workflow today!**

---

<div align="center">
  <a href="#-link-optimizer">⬆️ Back to Top</a>
</div>

[![GitHub Stars](https://img.shields.io/github/stars/absknpl/link-optimizer?style=social)](https://github.com/absknpl/link-optimizer)

**Crafted with ❤️ by abisek**
![link-optimizer-banner (1)](https://github.com/user-attachments/assets/74b5d3a3-8407-4505-b79d-716ae8be53d1)
