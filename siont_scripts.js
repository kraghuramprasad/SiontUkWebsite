//console.log("Website loaded successfully!");
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  function validatePhone(value) {
    // Allow empty OR digits 7..15
    if (!value) return true;
    return /^\d{7,15}$/.test(value.trim());
  }

  form.addEventListener('submit', function (ev) {
    status.textContent = '';
    const fullName = form.querySelector('#fullName').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic checks
    if (!fullName) {
      ev.preventDefault();
      status.textContent = 'Please enter your full name.';
      form.querySelector('#fullName').focus();
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ev.preventDefault();
      status.textContent = 'Please enter a valid email address.';
      form.querySelector('#email').focus();
      return;
    }

    if (!validatePhone(phone)) {
      ev.preventDefault();
      status.textContent = 'Please enter a valid phone number (digits only, 7–15 chars) or leave blank.';
      form.querySelector('#phone').focus();
      return;
    }

    if (!message || message.length < 10) {
      ev.preventDefault();
      status.textContent = 'Please enter a message of at least 10 characters.';
      form.querySelector('#message').focus();
      return;
    }

    // If we reach here, the form will submit to FormSubmit.co (default action)
    status.textContent = 'Sending message...';
    // allow default submit to happen
  });

  // Optional: show friendly message if redirected with ?success=1 (requires _next param on form)
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === '1') {
    status.textContent = 'Thank you — your message was sent successfully.';
  }
});





