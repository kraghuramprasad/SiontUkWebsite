document.addEventListener("DOMContentLoaded", function () {
    console.log('-------------12121--------------');
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
      console.log('-------------2323232--------------');
        e.preventDefault(); // stop form immediately
        
        let isValid = true;

        // FIELD ELEMENTS
        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        // RESET PREVIOUS ERRORS
        document.querySelectorAll(".error").forEach(el => el.textContent = "");
        document.querySelectorAll(".form-field input, .form-field textarea")
            .forEach(el => el.classList.remove("error"));

        // FULL NAME VALIDATION
        if (fullName.value.trim() === "") {
            setError(fullName, "Full name is required.");
            isValid = false;
        }

        // EMAIL VALIDATION
        if (email.value.trim() === "") {
            setError(email, "Email is required.");
            isValid = false;
        } else if (!validateEmail(email.value)) {
            setError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // PHONE VALIDATION (optional)
        if (phone.value.trim() !== "") {
            
            // Must be digits only
            if (!/^[0-9]+$/.test(phone.value)) {
                setError(phone, "Phone number must contain only numbers.");
                isValid = false;

            // Must be 10 or 11 digits
            } else if (phone.value.length < 10 || phone.value.length > 11) {
                setError(phone, "Phone number must be 10–11 digits long.");
                isValid = false;
            }
        }
        
        // MESSAGE VALIDATION
        if (message.value.trim().length < 10) {
            setError(message, "Message must be at least 10 characters long.");
            isValid = false;
        }

        if (!isValid) return;

        // SET SUBJECT WITH LONG UK DATE + TIME (12 March 2025, 14:35)
        const subjectField = document.getElementById("emailSubject");

        const now = new Date();

        const formattedDate = now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        const formattedTime = now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        // Example: 12 March 2025, 14:35
        const formatted = `${formattedDate}, ${formattedTime}`;

        subjectField.value = `New Contact Request from SIONT UK Website – ${formatted}`;


        // IF VALID → SUBMIT THE FORM
        // form.submit();
        
        // IF VALID → SUBMIT USING AJAX
        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                document.getElementById("successMessage").style.display = "block";

                // Clear fields
                form.reset();

                // Refill subject hidden field so next submission works
                document.getElementById("emailSubject").value = "";

            } else {
                alert("There was an issue submitting the form. Please try again.");
            }
        })
        .catch(error => {
            alert("Error submitting form: " + error);
        });

    });

    // SET ERROR FUNCTION
    function setError(input, message) {
        const field = input.parentElement;
        const errorDisplay = field.querySelector(".error");
        errorDisplay.textContent = message;
        input.classList.add("error");
    }

    // EMAIL FORMAT CHECK
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

});
