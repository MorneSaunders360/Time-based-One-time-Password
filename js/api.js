function fetchAccounts() {
    showLoader();
    chrome.storage.local.get(['bearerToken','baseUrl'], function(items) {
        if (items.bearerToken) {
            fetch(items.baseUrl + '/api/v1/twofaccounts/', {
                headers: { 'Authorization': 'Bearer ' + items.bearerToken }
            })
            .then(response => response.json())
            .then(accounts => {
                const otpPromises = accounts.map(account => 
                    fetchOTP(account,items.baseUrl, items.bearerToken)
                );
                return Promise.all(otpPromises);
            })
            .then(accountsWithOTP => {
                allAccounts = accountsWithOTP;
                filterAccounts(); // Build initial list
            })
            .catch(error => console.error('Error fetching accounts:', error))
            .finally(() => hideLoader());
        }
    });
}

function fetchOTP(account,baseUrl, token) {
    return fetch(baseUrl+`/api/v1/twofaccounts/${account.id}/otp`, {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(response => response.json())
    .then(data => {
        return { ...account, otp: data.password };
    });
}
function VerifyAccount(baseUrl, token) {
    return fetch(baseUrl+`/api/v1/user`, {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(response => response.json())
    .then(data => {
        return { email: data.email };
    })
    .catch(error => 
        {
            return {email:""};
        });
}