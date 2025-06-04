// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const staffSections = document.querySelectorAll('.staff-section');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter sections
            filterSections(filter);
        });
    });

    function filterSections(filter) {
        staffSections.forEach(section => {
            const category = section.getAttribute('data-category');

            if (filter === 'all') {
                section.classList.remove('hidden');
                section.style.display = 'block';
            } else if (category === filter) {
                section.classList.remove('hidden');
                section.style.display = 'block';
            } else {
                section.classList.add('hidden');
                section.style.display = 'none';
            }
        });

        // Re-trigger animations for visible cards
        setTimeout(() => {
            triggerCardAnimations();
        }, 100);
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('show');

            if (navMenu.classList.contains('show')) {
                mobileMenuBtn.innerHTML = '✕';
                navMenu.style.display = 'flex';
            } else {
                mobileMenuBtn.innerHTML = '☰';
                navMenu.style.display = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('show');
                    mobileMenuBtn.innerHTML = '☰';
                    navMenu.style.display = 'none';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('header') && window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                mobileMenuBtn.innerHTML = '☰';
                navMenu.style.display = 'none';
            }
        });
    }

    // Dropdown menu functionality for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');

        dropdown.addEventListener('mouseenter', function () {
            if (window.innerWidth > 768) {
                menu.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseleave', function () {
            if (window.innerWidth > 768) {
                menu.style.display = 'none';
            }
        });

        // Mobile dropdown toggle
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isVisible = menu.style.display === 'block';

                // Hide all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.style.display = 'none';
                });

                // Toggle current dropdown
                menu.style.display = isVisible ? 'none' : 'block';
            }
        });
    });

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

    // Observe cards for animations
    function triggerCardAnimations() {
        const visibleCards = document.querySelectorAll('.staff-section:not(.hidden) .staff-card');
        visibleCards.forEach((card, index) => {
            observer.observe(card);
            // Stagger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Initial animation trigger
    triggerCardAnimations();

    // Enhanced hover effects for staff cards
    const staffCards = document.querySelectorAll('.staff-card');
    staffCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';

            const avatar = this.querySelector('.staff-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.15)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';

            const avatar = this.querySelector('.staff-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1)';
            }
        });
    });

    // Search functionality
    function addSearchFeature() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="staffSearch" placeholder="Search staff members..." />
                <button type="button" class="search-clear" style="display: none;">✕</button>
            </div>
        `;

        // Add CSS for search
        const searchStyles = `
            .search-container {
                margin-bottom: 2rem;
                text-align: center;
            }
            .search-box {
                position: relative;
                max-width: 400px;
                margin: 0 auto;
            }
            .search-box input {
                width: 100%;
                padding: 1rem 3rem 1rem 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 50px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            .search-box input:focus {
                outline: none;
                border-color: #3b82f6;
            }
            .search-clear {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #666;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = searchStyles;
        document.head.appendChild(styleSheet);

        // Insert search after filter tabs
        const filterTabs = document.querySelector('.filter-tabs');
        filterTabs.parentNode.insertBefore(searchContainer, filterTabs.nextSibling);

        const searchInput = document.getElementById('staffSearch');
        const clearButton = document.querySelector('.search-clear');

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            if (searchTerm.length > 0) {
                clearButton.style.display = 'block';
                performSearch(searchTerm);
            } else {
                clearButton.style.display = 'none';
                resetSearch();
            }
        });

        clearButton.addEventListener('click', function () {
            searchInput.value = '';
            this.style.display = 'none';
            resetSearch();
        });
    }

    function performSearch(searchTerm) {
        const allCards = document.querySelectorAll('.staff-card');
        let hasResults = false;

        allCards.forEach(card => {
            const name = card.querySelector('.staff-name').textContent.toLowerCase();
            const role = card.querySelector('.staff-role').textContent.toLowerCase();

            if (name.includes(searchTerm) || role.includes(searchTerm)) {
                card.style.display = 'block';
                card.parentElement.parentElement.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Hide empty sections
        staffSections.forEach(section => {
            const visibleCards = section.querySelectorAll('.staff-card[style*="display: block"], .staff-card:not([style*="display: none"])');
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            }
        });

        // Show "no results" message
        showNoResultsMessage(!hasResults);
    }

    function resetSearch() {
        const allCards = document.querySelectorAll('.staff-card');
        allCards.forEach(card => {
            card.style.display = 'block';
        });

        staffSections.forEach(section => {
            section.style.display = 'block';
        });

        // Re-apply current filter
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            const filter = activeFilter.getAttribute('data-filter');
            filterSections(filter);
        }

        showNoResultsMessage(false);
    }

    function showNoResultsMessage(show) {
        let noResultsDiv = document.querySelector('.no-results');

        if (show && !noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <h3>No staff members found</h3>
                    <p>Try adjusting your search terms</p>
                </div>
            `;
            document.querySelector('.container').appendChild(noResultsDiv);
        } else if (!show && noResultsDiv) {
            noResultsDiv.remove();
        }
    }

    // Add search feature
    addSearchFeature();

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

    // Contact button tracking
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const staffMember = this.closest('.staff-card').querySelector('.staff-name').textContent;
            console.log(`Contact clicked for: ${staffMember}`);
            // Add analytics tracking here
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

    // Window resize handler
    window.addEventListener('resize', function () {
        // Reset mobile menu on resize
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('nav ul');
            const mobileMenuBtn = document.querySelector('.mobile-menu');

            if (navMenu && mobileMenuBtn) {
                navMenu.classList.remove('show');
                navMenu.style.display = '';
                mobileMenuBtn.innerHTML = '☰';
            }

            // Hide all dropdown menus
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = '';
            });
        }
    });

    // Accessibility improvements
    function enhanceAccessibility() {
        // Add aria-labels to filter buttons
        filterButtons.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            btn.setAttribute('aria-label', `Filter staff by ${filter === 'all' ? 'all departments' : filter}`);
        });

        // Add role attributes to staff cards
        staffCards.forEach(card => {
            card.setAttribute('role', 'article');
            card.setAttribute('tabindex', '0');
        });

        // Add keyboard navigation for filter buttons
        filterButtons.forEach((btn, index) => {
            btn.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % filterButtons.length;
                    filterButtons[nextIndex].focus();
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + filterButtons.length) % filterButtons.length;
                    filterButtons[prevIndex].focus();
                }
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

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

    // Performance monitoring
    function logPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function () {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    console.log('Staff Directory load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                }, 0);
            });
        }
    }

    logPerformance();

    // Print functionality
    function addPrintStyles() {
        const printStyles = `
            @media print {
                .filter-tabs, .search-container, .contact-cta, .scroll-to-top, 
                .breadcrumb, .mobile-menu, .dropdown-menu { 
                    display: none !important; 
                }
                .staff-card { 
                    break-inside: avoid; 
                    margin-bottom: 1rem; 
                    box-shadow: none;
                    border: 1px solid #ccc;
                }
                .page-hero { 
                    background: #1e3a8a !important; 
                    -webkit-print-color-adjust: exact; 
                }
                body { 
                    font-size: 12pt; 
                    line-height: 1.4; 
                }
                .staff-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                .section-title {
                    page-break-after: avoid;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = printStyles;
        document.head.appendChild(styleSheet);
    }

    addPrintStyles();

    // Staff card click tracking
    staffCards.forEach(card => {
        card.addEventListener('click', function () {
            const staffName = this.querySelector('.staff-name').textContent;
            const staffRole = this.querySelector('.staff-role').textContent;
            console.log(`Staff card clicked: ${staffName} - ${staffRole}`);
            // Add analytics tracking here
        });
    });

    // Email and phone link validation
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const email = this.href.replace('mailto:', '');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Invalid email address');
            }
        });
    });

    phoneLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('Phone link clicked:', this.href);
            // Add analytics tracking here
        });
    });

    // Lazy loading for future profile images
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            // Future implementation for when profile images are added
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    setupLazyLoading();

    // Export functionality for staff directory
    function addExportFeature() {
        const exportBtn = document.createElement('button');
        exportBtn.textContent = '📥 Export Directory';
        exportBtn.className = 'export-btn';
        exportBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            padding: 0.75rem 1rem;
            background: linear-gradient(135deg, #059669, #10b981);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 0.9rem;
            cursor: pointer;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;

        document.body.appendChild(exportBtn);

        // Show export button after page loads
        setTimeout(() => {
            exportBtn.style.opacity = '1';
            exportBtn.style.transform = 'translateX(0)';
        }, 2000);

        exportBtn.addEventListener('click', function () {
            exportStaffDirectory();
        });
    }

    function exportStaffDirectory() {
        const staffData = [];
        const visibleCards = document.querySelectorAll('.staff-section:not(.hidden) .staff-card');

        visibleCards.forEach(card => {
            const name = card.querySelector('.staff-name').textContent;
            const role = card.querySelector('.staff-role').textContent;
            const section = card.closest('.staff-section').querySelector('.section-title').textContent.replace(/[^a-zA-Z\s]/g, '').trim();

            staffData.push({
                name: name,
                role: role,
                department: section
            });
        });

        // Create CSV content
        const csvContent = [
            ['Name', 'Role', 'Department'],
            ...staffData.map(item => [item.name, item.role, item.department])
        ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'stalybridge-celtic-staff-directory.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    addExportFeature();

});