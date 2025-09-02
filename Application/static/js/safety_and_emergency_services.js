// DOMContentLoaded event to load header and initialize alerts
document.addEventListener("DOMContentLoaded", function() {
    // Initialize alerts behavior and "No alerts" message display
    initializeAlerts();
});

// Function to initialize alert display behavior
function initializeAlerts() {
    const alerts = document.querySelectorAll('.alert');
    const noAlertsMessage = document.getElementById('no-alerts-message');
    let alertIndex = 1;
    let dismissedAlertsCount = 0;

    // Initially hide all alerts and show the "No alerts" message
    alerts.forEach(alert => alert.classList.remove('show'));
    noAlertsMessage.style.display = 'block';

    // Function to show alerts incrementally
    function showAlertsInStages() {
        if (alertIndex === 1) noAlertsMessage.style.display = 'none';
        alerts.forEach((alert, i) => {
            if (i < alertIndex) alert.classList.add('show');
        });
        if (alertIndex < alerts.length) alertIndex++;
    }

    // Initial and periodic alert display
    setTimeout(() => {
        showAlertsInStages();
        setInterval(showAlertsInStages, 3000);
    }, 3000);

    // Event listener for dismissing alerts
    alerts.forEach(alert => {
        $(alert).on('closed.bs.alert', () => {
            // Increment the dismissed alerts count
            dismissedAlertsCount++;

            // Check if all alerts are dismissed
            if (dismissedAlertsCount === alerts.length) {
                setTimeout(() => {
                    noAlertsMessage.style.display = 'block';
                }, 200);
            }
        });
    });
}

// Function to expand or collapse additional alert details
function expandAlert(element) {
    const alertDetails = element.querySelector('.alert-details');
    alertDetails.classList.toggle('show');
}

// Function to show the call service screen with the specified service name
function showCallService(serviceName) {
    // Update the call-heading with the service name
    document.getElementById('call-heading').textContent = serviceName;
    
    // Hide emergency services, header, and safety alerts
    document.getElementById('emergency-services').style.display = 'none';
    document.querySelector('.page-header').style.display = 'none';
    document.getElementById('safety-alerts').style.display = 'none';
    // Show the call service section and remove body padding
    document.getElementById('call-service').style.display = 'flex';
    document.body.style.padding = '0';
}

// Function to toggle microphone icons
function toggleMute() {
    const microphoneIcon = document.getElementById("microphone-icon");
    const muteContainer = microphoneIcon.closest('.icon-mute'); // Use `closest` to ensure correct parent selection

    // Toggle between microphone and microphone-slash icons, update aria-label and title
    if (microphoneIcon.classList.contains("fa-microphone")) {
        microphoneIcon.classList.replace("fa-microphone", "fa-microphone-slash");
        muteContainer.setAttribute("aria-label", "Unmute");
        muteContainer.setAttribute("title", "Unmute");
    } else {
        microphoneIcon.classList.replace("fa-microphone-slash", "fa-microphone");
        muteContainer.setAttribute("aria-label", "Mute");
        muteContainer.setAttribute("title", "Mute");
    }
}

// Function to end the call and reset the view
function endCall() {
    // Reset view to show emergency services, header, and safety alerts
    document.getElementById('emergency-services').style.display = 'block';
    document.querySelector('.page-header').style.display = 'none';
    document.getElementById('safety-alerts').style.display = 'block';
    document.getElementById('call-service').style.display = 'none';

    // Restore body padding
    document.body.style.padding = '';
}
