// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const featuredArticles = document.querySelectorAll('.featured-article');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter news items
            filterNews(category);
        });
    });

    function filterNews(category) {
        const allNewsItems = [...newsCards, ...featuredArticles];

        allNewsItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'all') {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else if (itemCategory === category) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });

        // Update news count
        updateNewsCount();

        // Re-trigger animations for visible items
        setTimeout(() => {
            triggerNewsAnimations();
        }, 100);
    }

    function updateNewsCount() {
        const visibleCards = document.querySelectorAll('.news-card:not(.hidden)');
        const currentCountEl = document.getElementById('currentCount');
        const totalCountEl = document.getElementById('totalCount');

        if (currentCountEl && totalCountEl) {
            currentCountEl.textContent = visibleCards.length;
            // Total count would be dynamic in real implementation
        }
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

    // Dropdown menu functionality
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

    // Trigger animations for news items
    function triggerNewsAnimations() {
        const visibleItems = document.querySelectorAll('.news-card:not(.hidden), .featured-article:not(.hidden)');
        visibleItems.forEach((item, index) => {
            observer.observe(item);
            // Stagger animation
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Initial animation trigger
    triggerNewsAnimations();

    // Enhanced hover effects for news cards
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';

            const image = this.querySelector('.news-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';

            const image = this.querySelector('.news-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Enhanced hover effects for featured articles
    featuredArticles.forEach(article => {
        article.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';

            const image = this.querySelector('.article-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });

        article.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';

            const image = this.querySelector('.article-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Load More functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentlyLoaded = 8;
    const totalArticles = 24;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            // Show loading state
            this.classList.add('loading');
            this.disabled = true;

            // Simulate loading delay
            setTimeout(() => {
                loadMoreArticles();

                // Remove loading state
                this.classList.remove('loading');
                this.disabled = false;

                // Update button text if all articles loaded
                if (currentlyLoaded >= totalArticles) {
                    this.style.display = 'none';

                    // Show "end of articles" message
                    const endMessage = document.createElement('p');
                    endMessage.textContent = 'You\'ve reached the end of our news articles!';
                    endMessage.style.cssText = 'text-align: center; color: #666; margin-top: 1rem;';
                    this.parentNode.appendChild(endMessage);
                }
            }, 1500);
        });
    }

    function loadMoreArticles() {
        // In a real implementation, this would fetch more articles from an API
        // For now, we'll simulate by showing hidden placeholder articles

        const articlesToAdd = 4;
        for (let i = 0; i < articlesToAdd && currentlyLoaded < totalArticles; i++) {
            const newCard = createNewsCard({
                category: 'general',
                date: 'May ' + (15 - currentlyLoaded) + ', 2025',
                title: `News Article ${currentlyLoaded + 1}`,
                excerpt: 'This is a placeholder article that would be loaded from the server in a real implementation.',
                views: Math.floor(Math.random() * 500) + 50,
                shares: Math.floor(Math.random() * 20) + 1
            });

            document.querySelector('.news-grid').appendChild(newCard);
            currentlyLoaded++;
        }

        // Update counter
        updateNewsCount();

        // Trigger animations for new cards
        setTimeout(() => {
            const newCards = document.querySelectorAll('.news-card:not([data-animated])');
            newCards.forEach((card, index) => {
                card.setAttribute('data-animated', 'true');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    }

    function createNewsCard(data) {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.setAttribute('data-category', data.category);
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        card.innerHTML = `
            <div class="card-header">
                <div class="news-image">
                    <div class="image-placeholder">📰</div>
                </div>
                <div class="news-category">${data.category}</div>
            </div>
            <div class="card-content">
                <div class="news-meta">
                    <span class="news-date">${data.date}</span>
                    <span class="news-author">Celtic FC</span>
                </div>
                <h3 class="news-title">${data.title}</h3>
                <p class="news-excerpt">${data.excerpt}</p>
                <div class="card-actions">
                    <a href="#" class="read-more">Read More</a>
                    <div class="article-stats">
                        <span class="views">👁️ ${data.views}</span>
                        <span class="shares">📤 ${data.shares}</span>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button');

            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            // Simulate subscription
            setTimeout(() => {
                alert('Thank you for subscribing to Celtic news!');
                this.reset();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Search functionality (future enhancement)
    function addSearchFeature() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="newsSearch" placeholder="Search news articles..." />
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
                max-width: 500px;
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

        // Insert search after news filters
        const newsFilters = document.querySelector('.news-filters');
        newsFilters.parentNode.insertBefore(searchContainer, newsFilters.nextSibling);

        const searchInput = document.getElementById('newsSearch');
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
        const allArticles = [...newsCards, ...featuredArticles];
        let hasResults = false;

        allArticles.forEach(article => {
            const title = article.querySelector('.news-title, .article-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.news-excerpt, .article-excerpt').textContent.toLowerCase();

            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                article.style.display = 'block';
                article.classList.remove('hidden');
                hasResults = true;
            } else {
                article.style.display = 'none';
                article.classList.add('hidden');
            }
        });

        showNoResultsMessage(!hasResults);
    }

    function resetSearch() {
        const allArticles = [...newsCards, ...featuredArticles];
        allArticles.forEach(article => {
            article.style.display = 'block';
            article.classList.remove('hidden');
        });

        // Re-apply current filter
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            const category = activeFilter.getAttribute('data-category');
            filterNews(category);
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
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or filter</p>
                </div>
            `;
            document.querySelector('.news-section').appendChild(noResultsDiv);
        } else if (!show && noResultsDiv) {
            noResultsDiv.remove();
        }
    }

    // Add search feature
    setTimeout(addSearchFeature, 1000);

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Article click tracking
    const articleLinks = document.querySelectorAll('.read-more, .read-more-btn');
    articleLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const article = this.closest('.news-card, .featured-article');
            const title = article.querySelector('.news-title, .article-title').textContent;
            console.log(`Article clicked: ${title}`);
            // Add analytics tracking here

            // Future: Navigate to full article page
            // window.location.href = `/news/${articleSlug}`;
        });
    });

    // Social sharing functionality
    function addSocialSharing() {
        const shareButtons = document.querySelectorAll('.shares');
        shareButtons.forEach(shareBtn => {
            shareBtn.style.cursor = 'pointer';
            shareBtn.addEventListener('click', function () {
                const article = this.closest('.news-card, .featured-article');
                const title = article.querySelector('.news-title, .article-title').textContent;
                const url = window.location.href;

                if (navigator.share) {
                    navigator.share({
                        title: title,
                        text: 'Check out this news from Stalybridge Celtic FC',
                        url: url,
                    });
                } else {
                    // Fallback: Copy to clipboard
                    navigator.clipboard.writeText(`${title} - ${url}`).then(() => {
                        alert('Article link copied to clipboard!');
                    });
                }
            });
        });
    }

    addSocialSharing();

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
            const category = btn.getAttribute('data-category');
            btn.setAttribute('aria-label', `Filter news by ${category === 'all' ? 'all categories' : category}`);
        });

        // Add role attributes to news cards
        const allArticles = [...newsCards, ...featuredArticles];
        allArticles.forEach(article => {
            article.setAttribute('role', 'article');
            article.setAttribute('tabindex', '0');
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
                    console.log('Club News page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                }, 0);
            });
        }
    }

    logPerformance();

    // Print functionality
    function addPrintStyles() {
        const printStyles = `
            @media print {
                .news-filters, .load-more-section, .newsletter-section, .scroll-to-top,
                .breadcrumb, .mobile-menu, .dropdown-menu { 
                    display: none !important; 
                }
                .news-card, .featured-article { 
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
                .news-grid, .featured-news-grid {
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

    // Auto-refresh news (every 5 minutes in real implementation)
    function setupAutoRefresh() {
        setInterval(() => {
            // In a real implementation, this would check for new articles
            console.log('Checking for new articles...');

            // Simulate new article notification
            if (Math.random() > 0.9) {
                showNewArticleNotification();
            }
        }, 300000); // 5 minutes
    }

    function showNewArticleNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1001;
            cursor: pointer;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 0.25rem;">📰 New Article</div>
            <div style="font-size: 0.9rem;">Fresh news from Celtic - Click to refresh</div>
        `;

        document.body.appendChild(notification);

        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);

        // Click to refresh
        notification.addEventListener('click', function () {
            window.location.reload();
        });
    }

    // setupAutoRefresh(); // Uncomment for production

    // Reading progress indicator
    function addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #1e3a8a, #3b82f6);
            z-index: 1002;
            transition: width 0.3s ease;
        `;

        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }

    addReadingProgress();

}); top functionality
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

// Scroll to