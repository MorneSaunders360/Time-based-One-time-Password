document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tokenForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const token = document.getElementById('bearerToken').value;
        const baseUrl = document.getElementById('baseUrl').value;
        
        VerifyAccount(baseUrl,baseUrl).then(function(result) {
            // use the result here
            console.log(result)
            if(result.email!="")
            {
                chrome.storage.local.set({ 'bearerToken': token,'baseUrl': baseUrl}, function() {
                    displayPinForm();
                });
            }
            else
            {
                showErrorMessage('BaseUrl Or Access Token is incorrect')
            }
        });
      
        
        
    });
    document.getElementById('pinSetupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const pin = document.getElementById('pinInput').value;
        const hashedPin = hashPin(pin); // Implement this hashing function
        chrome.storage.local.set({ 'userPin': hashedPin }, function() {
            document.getElementById('searchContainer').style.display = 'block';
            document.getElementById('pinSetupContainer').style.display = 'none';
            
        });
        displayAccountsList();
        updateCountdownTimer();
    });
    
    document.getElementById('pinEntryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const enteredPin = document.getElementById('pinEntry').value;
        const pinErrorDiv = document.getElementById('pinError');
    
        verifyPin(enteredPin, function(isValid) {
            if (isValid) {
                // On successful verification
                document.getElementById('pinEntryContainer').style.display = 'none';
                displayAccountsList();
                updateCountdownTimer();
                pinErrorDiv.style.display = 'none'; // Hide error message
            } else {
                // Display error message
                pinErrorDiv.textContent = "Incorrect PIN. Please try again.";
                pinErrorDiv.style.display = 'block';
                document.getElementById('pinEntry').value = ''; // Clear the input field
            }
        });
    });
    document.getElementById('resetPinLink').addEventListener('click', function(e) {
        e.preventDefault();
        logOut();
    });
    document.getElementById('searchInput').addEventListener('input', filterAccounts);
    document.getElementById('logOutButton').addEventListener('click', logOut);
});

