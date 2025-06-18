document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }
    
    // Dropdown keyboard navigation
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !isExpanded);
                }
            });
        }
    });
    
    // GDPR Cookie banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    // Function to show cookie banner
    function showCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.add('show');
        }
    }
    
    // Function to hide cookie banner
    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        }
    }
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        // Show banner after a short delay
        setTimeout(() => {
            showCookieBanner();
        }, 1000);
    } else {
        // Hide banner if consent already given
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
    }
    
    // Accept cookies
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieBanner();
            
            // Initialize analytics or other cookies here if needed
            console.log('Cookies accepted');
        });
    }
    
    // Decline cookies
    if (declineBtn) {
        declineBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            hideCookieBanner();
            
            console.log('Cookies declined');
        });
    }
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.focus();
                }
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Check if consent is older than 1 year and re-ask
    const consentDate = localStorage.getItem('cookieConsentDate');
    if (consentDate) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        if (new Date(consentDate) < oneYearAgo) {
            localStorage.removeItem('cookieConsent');
            localStorage.removeItem('cookieConsentDate');
            
            showCookieBanner();
        }
    }
    
    // Scroll teaser functionality for beer detail pages
    if (document.querySelector('.beer-detail')) {
        // Create scroll teaser element
        const scrollTeaser = document.createElement('div');
        scrollTeaser.className = 'scroll-teaser';
        scrollTeaser.innerHTML = '<div class="scroll-teaser-text">Scroll voor meer info</div>';
        document.body.appendChild(scrollTeaser);
        
        // Hide teaser when user scrolls
        let hasScrolled = false;
        window.addEventListener('scroll', function() {
            if (!hasScrolled && window.scrollY > 100) {
                hasScrolled = true;
                document.body.classList.add('scrolled');
                setTimeout(() => {
                    if (scrollTeaser && scrollTeaser.parentNode) {
                        scrollTeaser.parentNode.removeChild(scrollTeaser);
                    }
                }, 300);
            }
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (!hasScrolled) {
                document.body.classList.add('scrolled');
                setTimeout(() => {
                    if (scrollTeaser && scrollTeaser.parentNode) {
                        scrollTeaser.parentNode.removeChild(scrollTeaser);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Homepage scroll indicator functionality
    if (document.querySelector('.hero')) {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            // Hide scroll indicator when user scrolls
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.visibility = 'hidden';
                }
            });
            
            // Make scroll indicator clickable
            scrollIndicator.addEventListener('click', function() {
                const aboutSection = document.querySelector('.about-section');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }
});
