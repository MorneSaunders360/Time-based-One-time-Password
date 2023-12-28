function filterAccounts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const accountsListDiv = document.getElementById('accountsList');
    accountsListDiv.innerHTML = ''; // Clear current list
    setTimeout(() => {
        getCurrentUrl(currentUrl => {
        allAccounts.forEach(account => {
            let isClosestMatch = fuzzyMatch(currentUrl, account.service); 
            if (account.service.toLowerCase().includes(searchTerm) || account.account.toLowerCase().includes(searchTerm)) {
                const accountDiv = createAccountDiv(account, isClosestMatch);
                accountsListDiv.appendChild(accountDiv);
            }
        });
    });
    }, 500);
    
}
