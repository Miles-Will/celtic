// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {

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

                // Add staggered animation for cards
                const cards = document.querySelectorAll('.info-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });

                // Add staggered animation for facility items
                const facilityItems = document.querySelectorAll('.facility-item');
                facilityItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.info-card, .facility-item, .highlight-box, .contact-cta');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced hover effects for info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';

            // Add glow effect to icon
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.boxShadow = '0 5px 15px rgba(30, 58, 138, 0.3)';
                icon.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';

            // Remove glow effect from icon
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.boxShadow = '';
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Enhanced hover effects for facility items
    const facilityItems = document.querySelectorAll('.facility-item');
    facilityItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.background = '#e3f2fd';
            this.style.transform = 'translateY(-5px)';

            // Scale the icon
            const icon = this.querySelector('.facility-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });

        item.addEventListener('mouseleave', function () {
            this.style.background = '#f8f9fa';
            this.style.transform = 'translateY(0)';

            // Reset icon scale
            const icon = this.querySelector('.facility-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Map section interaction
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function () {
            // Future: Replace with actual Google Maps integration
            const address = "Mottram Road, Stalybridge SK15 2RT";
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(googleMapsUrl, '_blank');
        });

        mapPlaceholder.style.cursor = 'pointer';
        mapPlaceholder.title = 'Click to open in Google Maps';

        // Add hover effect to map
        mapPlaceholder.addEventListener('mouseenter', function () {
            this.style.background = 'linear-gradient(135deg, #bbdefb, #90caf9)';
            this.style.transform = 'scale(1.02)';
        });

        mapPlaceholder.addEventListener('mouseleave', function () {
            this.style.background = 'linear-gradient(135deg, #e3f2fd, #bbdefb)';
            this.style.transform = 'scale(1)';
        });
    }

    // Email and phone link tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('Email link clicked:', this.href);
            // Future: Add analytics tracking
        });
    });

    phoneLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('Phone link clicked:', this.href);
            // Future: Add analytics tracking
        });
    });

    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `