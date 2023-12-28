function verifyPin(enteredPin, callback) {
    chrome.storage.local.get('userPin', function(data) {
        const storedPin = data.userPin;
        const hashedPin = hashPin(enteredPin);
        callback(hashedPin === storedPin);
    });
}
function hashPin(pin) {
    return btoa(pin);
}