// DOM Elements
const userInput = document.getElementById('userInput');
const checkBtn = document.getElementById('checkBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const resultBadge = document.getElementById('resultBadge');
const resultMessage = document.getElementById('resultMessage');
const logicExplanation = document.getElementById('logicExplanation');
const charCount = document.getElementById('charCount');

/**
 * EVENT LISTENERS
 */

// 1. Check Palindrome on Button Click
checkBtn.addEventListener('click', handleCheck);

// 2. Clear Input on Clear Button Click
clearBtn.addEventListener('click', clearApp);

// 3. Handle Keyboard "Enter" and Live Input Updates
userInput.addEventListener('input', function () {
    updateCharCount();
    clearValidationStyles();
});

userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleCheck();
    }
});

/**
 * CORE FUNCTIONS
 */

function handleCheck() {
    const inputText = userInput.value;

    // Error Handling: Empty Input
    if (!inputText || inputText.trim() === "") {
        // Shake animation could go here, for now just focus
        userInput.focus();
        userInput.setAttribute('placeholder', 'Please enter some text first!');
        return;
    }

    // Step 1 check logic
    const charList = convertInputString(inputText);
    const cleanList = stripAnalphabetics(charList);
    const isPalindrome = runPalindromeCheck(cleanList);

    // Step 4 display
    displayResult(isPalindrome);
}

function clearApp() {
    userInput.value = "";
    updateCharCount();
    userInput.setAttribute('placeholder', 'Type a word or sentence...');
    resultContainer.classList.remove('show');
    clearValidationStyles();
    userInput.focus();
}

function updateCharCount() {
    const length = userInput.value.length;
    charCount.textContent = `${length} character${length !== 1 ? 's' : ''}`;
}

function clearValidationStyles() {
    // Reset specific styles if needed
}

/**
 * LOGIC FUNCTIONS (Data Structures)
 */

// Function 1: Convert to Lowercase List
function convertInputString(str) {
    return str.toLowerCase().split('');
}

// Function 2: Strip Non-Alphanumeric Characters
function stripAnalphabetics(list) {
    return list.filter(char => {
        const code = char.charCodeAt(0);
        return (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
    });
}

// Function 3: Reverse and Compare
function runPalindromeCheck(originalList) {
    const reversedList = [...originalList].reverse();
    return originalList.join('') === reversedList.join('');
}

/**
 * UI UPDATE FUNCTIONS
 */
function displayResult(isPalindrome) {
    // First hide to allow re-animation if needed (optional)
    resultContainer.classList.remove('show');

    // Force reflow to restart transition if quickly clicking
    void resultContainer.offsetWidth;

    // Remove old badge classes
    resultBadge.className = 'result-badge';

    if (isPalindrome) {
        resultBadge.classList.add('badge-success');
        resultBadge.innerHTML = '&#10004; Palindrome'; // ✔ Icon
        resultMessage.textContent = "Yes, it's a palindrome!";
        logicExplanation.textContent = "The text reads exactly the same forward and backward.";
    } else {
        resultBadge.classList.add('badge-error');
        resultBadge.innerHTML = '&#10006; Not a Palindrome'; // ✖ Icon
        resultMessage.textContent = "No, it's not a palindrome.";
        logicExplanation.textContent = "The text reads differently when reversed.";
    }

    // Show with animation
    resultContainer.classList.add('show');
}
