document.addEventListener("DOMContentLoaded", function() {
    // Modal elements
    const modal = document.getElementById("contact-details-modal");
    const cancelButton = document.getElementById("cancel-button");
    const confirmButton = document.getElementById("confirm-button");
    const contactNameInput = document.getElementById("contact-name");
    const contactRelationshipSelect = document.getElementById("contact-relationship");
    const contactPhoneInput = document.getElementById("contact-phone");
    const updateAlert = document.getElementById("successful-update-alert");

    let currentContactId = null; // ID of the contact being edited
    let currentCallContactId = null; // ID of the contact currently being called

    // Function to display group call screen and hide other sections
    window.groupCall = function() {
        // Hide other sections
        document.querySelector('.page-header').style.display = 'none';
        document.getElementById('emergency-contacts').style.display = 'none';
        
        // Show the group call service screen
        document.getElementById('call-service').style.display = 'flex';
        // Update call heading or any additional elements specific to group call
        document.getElementById('call-heading').textContent = "Group Call";
        document.body.style.padding = '0';
        
        // document.getElementById('participants').style.display = 'flex';        
    };

    // Function to toggle mute/unmute microphone icon
    window.toggleMute = function() {
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
    };

    // Function to show the call service screen for a selected contact
    window.showCallService = function(contactName, contactId) {
        currentCallContactId = contactId;

        // Update call heading with current contact's name
        const contactInfo = document.querySelector(`[data-contact-id="${contactId}"]`);
        const contactCurrentName = contactInfo.getAttribute("data-contact-name");
        document.getElementById('call-heading').textContent = contactCurrentName;

        // Hide other sections and show call service screen
        document.querySelector('.page-header').style.display = 'none';
        document.getElementById('emergency-contacts').style.display = 'none';
        document.getElementById('call-service').style.display = 'flex';
        // document.getElementById('participants').style.display = 'none';
        document.body.style.padding = '0';
    };

    // Function to end the call and reset the view
    window.endCall = function() {
        document.querySelector('.page-header').style.display = 'flex';
        document.getElementById('emergency-contacts').style.display = 'block';
        document.getElementById('call-service').style.display = 'none';
        document.body.style.padding = '';

        currentCallContactId = null; // Clear active call ID
    };

    // Event listener for edit button to open and populate modal
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", function() {
            currentContactId = this.getAttribute("data-contact-id");
            const contactInfo = document.querySelector(`[data-contact-id="${currentContactId}"]`);
            
            // Populate modal with contact data
            contactNameInput.value = contactInfo.getAttribute("data-contact-name");
            contactPhoneInput.value = contactInfo.getAttribute("data-contact-phone");

            // Set selected relationship in dropdown
            for (let option of contactRelationshipSelect.options) {
                option.selected = option.value === contactInfo.getAttribute("data-contact-relationship");
            }
            modal.style.display = "flex";
        });
    });

    // Close modal on cancel button or outside click
    cancelButton.onclick = function() { modal.style.display = "none"; };
    window.onclick = function(event) {
        if (event.target == modal) modal.style.display = "none";
    };

    // Save contact changes and update dynamically on confirm
    confirmButton.onclick = function() {
        if (currentContactId) {
            const updatedName = contactNameInput.value;
            const updatedRelationship = contactRelationshipSelect.value;
            const updatedPhone = contactPhoneInput.value;

            // Locate and update contact card
            const contactCard = document.querySelector(`[data-contact-id="${currentContactId}"]`);
            contactCard.querySelector(".card-header").textContent = updatedName;
            contactCard.querySelector(".card-desc").textContent = updatedPhone;

            // Update data attributes with new values
            contactCard.setAttribute("data-contact-name", updatedName);
            contactCard.setAttribute("data-contact-relationship", updatedRelationship);
            contactCard.setAttribute("data-contact-phone", updatedPhone);

            // Update call heading if contact is currently being called
            if (currentCallContactId === currentContactId) {
                document.getElementById('call-heading').textContent = updatedName;
            }

            // Hide modal and show update confirmation alert
            modal.style.display = "none";
            updateAlert.classList.remove("d-none");
            updateAlert.classList.add("fade", "show");

            // Hide alert after 3 seconds
            setTimeout(() => {
                updateAlert.classList.add("d-none");
                updateAlert.classList.remove("fade", "show");
            }, 3000);

            currentContactId = null; // Reset after update
        }
    };
});
