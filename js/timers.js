function updateCountdownTimer() {
    const progressBar = document.getElementById('countdownProgressBar');
    const countdownLabel = document.getElementById('countdownLabel');
    let seconds = 30; // Initial value in seconds

    // Function to update the timer value and handle reset
    function updateTimer() {
        if(LoggedOut==false)
        {
            seconds--;

            // Calculate the width of the progress bar based on remaining time
            const progressWidth = (30 - seconds) / 30 * 100; // 30 seconds total

            // Update the progress bar width
            progressBar.style.width = progressWidth + '%';

            // Update the countdown label value
            countdownLabel.textContent = "Refreshing in " + seconds ;

            // When the timer reaches 0, reset it to 30 seconds and refresh the list
            if (seconds === 0) {
                seconds = 30;
                
                fetchAccounts(); // Refresh the list
            } 
        }
        
    }

    // Start the initial timer
    const countdownInterval = setInterval(updateTimer, 1000); // 1000 milliseconds (1 second)

    // Initial call to update the timer value and progress bar
    updateTimer();

}
