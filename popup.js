let LoggedOut=false;
let allAccounts = []; // Array to store all account objects
document.addEventListener('DOMContentLoaded', function() {

    chrome.storage.local.get('userPin', function(data) {
        if (data.userPin) {
            promptForPin(); 
        } else {
            displayTokenForm(); 
        }
    });
    
});
