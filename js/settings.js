function logOut() {
    chrome.storage.local.remove('bearerToken', function() {
        hideControls();
        LoggedOut = true;
        const accountsListDiv = document.getElementById('accountsList');
        accountsListDiv.style.display = 'none';
        accountsListDiv.innerHTML = ''; // Clear the accounts list
        document.getElementById('searchContainer').style.display = 'none'; // Hide search bar
        document.getElementById('pinSetupContainer').style.display = 'none';
        document.getElementById('pinEntryContainer').style.display = 'none';
        displayTokenForm();
        clearLocalStorage();
    });
}
