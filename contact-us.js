// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {

    // Form Elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');

    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.info-card, .hours-card, .contact-form-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced hover effects for info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';

            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';

            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Form Validation
    function validateForm() {
        const formData = new FormData(contactForm);
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
            const input = group.querySelector('input, select, textarea');
            if (input) {
                input.classList.remove('error');
            }
        });

        // Required field validation
        const requiredFields = ['name', 'email', 'subject', 'message', 'privacy'];

        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const value = formData.get(fieldName);

            if (!value || value.trim() === '') {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Email validation
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            showFieldError(document.getElementById('email'), 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation (if provided)
        const phone = formData.get('phone');
        if (phone && phone.trim() !== '') {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showFieldError(document.getElementById('phone'), 'Please enter a valid phone number');
                isValid = false;
            }
        }

        return isValid;
    }

    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        field.classList.add('error');
        formGroup.classList.add('has-error');

        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm()) {
                // Scroll to first error
                const firstError = document.querySelector('.form-group.has-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                successMessage.classList.add('show');

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Reset loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Optional: Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'flex';
                    successMessage.classList.remove('show');
                }, 5000);

            }, 2000); // Simulate 2 second delay
        });
    }

    // Real-time validation
    const formFields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function () {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'This field is required');
            } else {
                // Clear error if field is now valid
                const formGroup = this.closest('.form-group');
                this.classList.remove('error');
                formGroup.classList.remove('has-error');
            }
        });

        field.addEventListener('input', function () {
            // Clear error on input
            const formGroup = this.closest('.form-group');
            this.classList.remove('error');
            formGroup.classList.remove('has-error');
        });
    });

    // Google Maps integration
    window.openGoogleMaps = function () {
        const address = "Bower Fold, Mottram Road, Stalybridge SK15 2RT";
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    // Map hover effects
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.style.cursor = 'pointer';
        mapPlaceholder.title = 'Click to open in Google Maps';
    }

    // Quick contact button tracking
    const quickButtons = document.querySelectorAll('.quick-btn');
    quickButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const action = this.classList.contains('phone-btn') ? 'phone' :
                this.classList.contains('email-btn') ? 'email' : 'directions';
            console.log(`Quick contact: ${action}`);
            // Add analytics tracking here
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, ''); // Remove non-digits

            // Format UK phone numbers
            if (value.startsWith('44')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                // UK domestic format
                if (value.length >= 4) {
                    value = value.substring(0, 4) + ' ' + value.substring(4);
                }
                if (value.length >= 9) {
                    value = value.substring(0, 9) + ' ' + value.substring(9);
                }
            }

            this.value = value;
        });
    }

    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.875rem; color: #666; margin-top: 0.25rem;';
        messageField.parentNode.appendChild(counter);

        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${remaining} characters remaining`;

            if (remaining < 50) {
                counter.style.color = '#ef4444';
            } else if (remaining < 100) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = '#666';
            }
        }

        messageField.addEventListener('input', updateCounter);
        messageField.setAttribute('maxlength', maxLength);
        updateCounter(); // Initial update
    }

    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Loading animation
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');
    if (copyrightText) {
        copyrightText.innerHTML = `&copy; ${currentYear} Stalybridge Celtic Football Club. All rights reserved.`;
    }

    // Accessibility improvements
    function enhanceAccessibility() {
        // Add aria-labels to form fields
        const nameField = document.getElementById('name');
        if (nameField) nameField.setAttribute('aria-label', 'Your full name');

        const emailField = document.getElementById('email');
        if (emailField) emailField.setAttribute('aria-label', 'Your email address');

        const phoneField = document.getElementById('phone');
        if (phoneField) phoneField.setAttribute('aria-label', 'Your phone number (optional)');

        const subjectField = document.getElementById('subject');
        if (subjectField) subjectField.setAttribute('aria-label', 'Subject of your enquiry');

        const messageField = document.getElementById('message');
        if (messageField) messageField.setAttribute('aria-label', 'Your message or enquiry details');

        // Add skip link for keyboard navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #1e3a8a;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
        `;

        skipLink.addEventListener('focus', function () {
            this.style.top = '6px';
        });

        skipLink.addEventListener('blur', function () {
            this.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content ID
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
    }

    enhanceAccessibility();

});