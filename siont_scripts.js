document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    // VALIDATION HELPERS
    function setError(input, message) {
        const parent = input.parentElement;
        const errorDisplay = parent.querySelector(".error");
        errorDisplay.innerText = message;
        errorDisplay.style.display = "block";
    }

    function clearError(input) {
        const parent = input.parentElement;
        const errorDisplay = parent.querySelector(".error");
        errorDisplay.innerText = "";
        errorDisplay.style.display = "none";
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();  // STOP DEFAULT SUBMISSION

        let isValid = true;

        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        // VALIDATION RULES
        if (fullName.value.trim() === "") {
            setError(fullName, "Full Name is required.");
            isValid = false;
        } else {
            clearError(fullName);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            setError(email, "Enter a valid email address.");
            isValid = false;
        } else {
            clearError(email);
        }

        if (phone.value.trim() !== "" && !/^[0-9]+$/.test(phone.value)) {
            setError(phone, "Phone number must contain only numbers.");
            isValid = false;
        } else {
            clearError(phone);
        }

        if (message.value.trim().length < 10) {
            setError(message, "Message must be at least 10 characters.");
            isValid = false;
        } else {
            clearError(message);
        }

        if (!isValid) {
            return;
        }

        // SET DYNAMIC SUBJECT FIELD FOR UK DATE FORMAT
        const ukDate = new Date().toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        document.getElementById("emailSubject").value =
            `New Contact Request from SIONT UK Website - ${ukDate}`;

        // FIXED FETCH REQUEST — FormSubmit requires no-cors mode
        fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            mode: "no-cors"
        })
            .then(() => {
                successMessage.style.display = "block";
                contactForm.reset();
            })
            .catch((error) => {
                alert("Error submitting form: " + error);
            });
    });
});