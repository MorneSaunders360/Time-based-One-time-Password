function showLoader() {
        
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    displayControls();
    document.getElementById('loader').style.display = 'none';
}

function displayTokenForm() {
    document.getElementById('baseUrl').value='';
    document.getElementById('bearerToken').value='';
    document.getElementById('tokenFormContainer').style.display = 'block';
    document.getElementById('accountsList').style.display = 'none';
}
function displayControls() {
    document.getElementById('ProgressBarDiv').style.display = 'block';
    document.getElementById('controlsContainer').style.display = 'flex';
}

function hideControls() {
    document.getElementById('ProgressBarDiv').style.display = 'none';
    document.getElementById('controlsContainer').style.display = 'none';
}
function displayAccountsList() {
    document.getElementById('tokenFormContainer').style.display = 'none';
    document.getElementById('accountsList').style.display = 'block';
    fetchAccounts();
    
}
function displayPinForm() {
    document.getElementById('tokenFormContainer').style.display = 'none';
    document.getElementById('pinSetupContainer').style.display = 'block';
   
}

function showCopyConfirmation() {
    const confirmationMessage = document.createElement('div');
    confirmationMessage.textContent = 'OTP Copied!';
    confirmationMessage.id = 'copyConfirmation';
    document.body.appendChild(confirmationMessage);

    setTimeout(() => {
        confirmationMessage.remove();
    }, 2000); // Message disappears after 2 seconds
}
function showErrorMessage(text) {
    const showErrorMessage = document.createElement('div');
    showErrorMessage.textContent = text;
    showErrorMessage.id = 'showErrorMessage';
    document.body.appendChild(showErrorMessage);

    setTimeout(() => {
        showErrorMessage.remove();
    }, 2000); // Message disappears after 2 seconds
}
function toggleOTPDisplay(otpDiv, fullOTP) {
    if (otpDiv.textContent.includes('•')) {
        otpDiv.textContent = fullOTP; // Show full OTP
        navigator.clipboard.writeText(fullOTP) // Copy OTP to clipboard
            .then(() => {
                showCopyConfirmation(); // Show copy confirmation message
            });
    } else {
        otpDiv.textContent = obfuscateOTP(fullOTP); // Hide OTP partially
    }
}
function obfuscateOTP(otp) {
    return '\u2022\u2022\u2022' + otp.slice(-3);  // Using Unicode for bullet points
}
function createAccountDiv(account,isClosestMatch) {
    const accountDiv = document.createElement('div');
    accountDiv.className = 'account-item';
    if (isClosestMatch) {
        accountDiv.classList.add('highlight'); // Add a highlight class or similar
    }
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'account-details';
    detailsDiv.textContent = `${account.service} (${account.account})`;

    const otpDiv = document.createElement('div');
    otpDiv.className = 'otp-display';
    otpDiv.textContent = obfuscateOTP(account.otp); // Show obfuscated OTP
    otpDiv.style.cursor = 'pointer';
    otpDiv.onclick = function() {
        toggleOTPDisplay(otpDiv, account.otp);
    };

    accountDiv.appendChild(detailsDiv);
    accountDiv.appendChild(otpDiv);
    return accountDiv;
}

function promptForPin() {
    document.getElementById('pinEntryContainer').style.display = 'block';
    document.getElementById('tokenFormContainer').style.display = 'none';
    document.getElementById('accountsList').style.display = 'none';
}

function getCurrentUrl(callback) {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
        // For browser extension
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0] && tabs[0].url) {
                callback(tabs[0].url);
            }
        });
    } else {
        // For web page
        callback(window.location.href);
    }
}

function fuzzyMatch(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    if (str1.includes(str2) || str2.includes(str1)) {
        return true;
    }


    return false;
}