document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const inputField = document.getElementById('palindromeInput');
    const charCounter = document.querySelector('.char-counter');
    const checkBtn = document.getElementById('checkBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Result Elements
    const resultCard = document.getElementById('resultCard');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultIcon = document.getElementById('resultIcon');

    // Live Character Counter
    inputField.addEventListener('input', () => {
        const length = inputField.value.length;
        charCounter.textContent = `${length} character${length !== 1 ? 's' : ''}`;

        // Hide result if user starts typing again
        if (!resultCard.classList.contains('hidden')) {
            hideResult();
        }
    });

    // Enter Key Support
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCheck();
        }
    });

    // Button Listeners
    checkBtn.addEventListener('click', handleCheck);

    clearBtn.addEventListener('click', () => {
        inputField.value = '';
        charCounter.textContent = '0 characters';
        inputField.focus();
        hideResult();
    });

    // Main Check Logic
    function handleCheck() {
        const rawText = inputField.value;

        // Basic validation
        if (!rawText.trim()) {
            inputField.focus();
            // Could add a shake animation here if desired
            return;
        }

        // 1. Process Text: Lowercase
        const lowerText = rawText.toLowerCase();

        // 2. Remove unwanted characters (spaces, punctuation, symbols)
        // We iterate and build a clean array to match "Array Logic" req
        let cleanArray = [];
        const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let char of lowerText) {
            if (allowedChars.includes(char)) {
                cleanArray.push(char);
            }
        }

        // 3. Create Reversed Array
        // Using spread operator to clone before reversing
        const reversedArray = [...cleanArray].reverse();

        // 4. Compare
        const cleanString = cleanArray.join('');
        const reversedString = reversedArray.join('');

        const isPalindrome = cleanString === reversedString && cleanString.length > 0;

        // 5. Display Result
        showResult(isPalindrome, cleanString, reversedString);
    }

    function showResult(isPalindrome, original, reversed) {
        resultCard.classList.remove('hidden');

        // Reset classes
        resultCard.className = 'result-card'; // Removes success/error

        // Trigger reflow for animation restart (optional)
        void resultCard.offsetWidth;

        if (isPalindrome) {
            resultCard.classList.add('success');
            resultTitle.textContent = 'Success! It is a Palindrome.';
            resultMessage.textContent = `"${original}" reads the same as "${reversed}"`;
        } else {
            resultCard.classList.add('error');
            resultTitle.textContent = 'Not a Palindrome.';
            resultMessage.textContent = `"${original}" becomes "${reversed}" when reversed.`;
        }
    }

    function hideResult() {
        resultCard.classList.add('hidden');
        resultCard.classList.remove('success', 'error');
    }
});
