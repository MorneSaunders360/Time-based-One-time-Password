 function clearLocalStorage(){
        chrome.storage.local.clear(function() {
          var error = chrome.runtime.lastError;
            if (error) {
              console.error(error);
            }
         })
    }