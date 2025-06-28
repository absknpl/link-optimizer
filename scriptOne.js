const lengthRange = document.getElementById('length');
        const lengthValue = document.getElementById('lengthValue');
        lengthRange.addEventListener('input', () => {
            lengthValue.textContent = lengthRange.value;
        });

        const generatePassButton = document.getElementById('generatePassButton');
        generatePassButton.addEventListener('click', generatePassword);

        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', clearPassword);

        function generatePassword() {
            const length = lengthRange.value;
            const includeAlpha = document.getElementById('alphabetOption').checked;
            const includeSymb = document.getElementById('symbolsOption').checked;
            const includeNum = document.getElementById('numberOption').checked;
            const passwordText = document.getElementById('passwordText');

            const newPassword = getThatPass(length, includeAlpha, includeSymb, includeNum);
            passwordText.value = newPassword;
        }

        function clearPassword() {
            const passwordText = document.getElementById('passwordText');
            passwordText.value = '';
        }

        const copyPassButton = document.getElementById('copyPassButton');
        copyPassButton.addEventListener('click', copyPasswordToClipboard);

        function copyPasswordToClipboard() {
            const passwordText = document.getElementById('passwordText');
            passwordText.select();
            document.execCommand('copy');
        }

        

        const backButton = document.getElementById('backButton');

        backButton.addEventListener('click', function () {
            window.location.href = 'index.html';
        });

        function getThatPass(passLength, includeAlpha, includeSymb, includeNum) {
            const alphabets = "abcdefghijklmnopqrstuvwxyz";
            const symbols = "!@#$%^&*()_+";
            const numbers = "0123456789";
            let characters = "";

            if (includeAlpha) characters += alphabets;
            if (includeSymb) characters += symbols;
            if (includeNum) characters += numbers;

            if (characters.length === 0) return "--------";

            let myPassWord = "";
            for (let i = 0; i < passLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                const randomChar = characters.charAt(randomIndex);
                myPassWord += randomChar;
            }
            return myPassWord;
        }
