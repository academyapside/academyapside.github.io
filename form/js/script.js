document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
    const inputPhone = document.getElementById('phone');
    
    form.addEventListener('submit', function (event) {
        // Prevent default form submission to allow for custom validation
        event.preventDefault();
        
            // If native validation passes, call custom validation
            if (checkValidity()) {
                form.submit(); // Only submit if custom validation passes
            }
    });

    function checkValidity() {
        let isValid = true;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phonePattern = /^(\+33)[67]\d{8}$/;
        let firstInvalidField = null;
        // Clear previous error messages
        form.querySelectorAll('.error-message').forEach(el => el.remove());

        requiredInputs.forEach((input, index) => {
            const errorId = 'error-' + input.id;
            input.removeAttribute('aria-labelledby');
            input.removeAttribute('aria-invalid');

            
            if (input.type === 'email' && !emailPattern.test(input.value)) {
                isValid = false;
                showError(input, 'Veuillez entrer une adresse e-mail valide (exemple : nomprenom@email.fr).', errorId);
                if (!firstInvalidField) firstInvalidField = input;
            } else if (input.value.trim() === '') {
                isValid = false;
                showError(input, input.getAttribute("placeholder") +' est obligatoire!!!', errorId);
                if (!firstInvalidField) firstInvalidField = input;
            }
        });

        if(inputPhone.value.trim() !== '' && !phonePattern.test(inputPhone.value)) {
            isValid = false;
            const errorId = 'error-' + inputPhone.id;
            showError(inputPhone, 'Veuillez entrer un numéro de téléphone valide.', errorId);
            if (!firstInvalidField) firstInvalidField = inputPhone;
        }

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return isValid;
    }

    function showError(input, message, errorId) {
        // Create error message element
        const error = document.createElement('div');
        error.className = 'error-message';
        error.id = errorId;
        error.style.color = '#CD3C14';
        error.style.marginTop = '5px';
        error.setAttribute('role', 'alert');
        error.textContent = message;
        
        // Insert error message after the input field
        input.parentNode.insertBefore(error, input.nextSibling);
        input.setAttribute('aria-labelledby', errorId);
        console.log('toto')
        input.setAttribute('aria-invalid', "true");
        console.log(input)
    }
});