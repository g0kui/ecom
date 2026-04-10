// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });

    // Sidebar toggle for dashboard
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar on link click in mobile
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Animate on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Login option toggle
    const loginOptions = document.querySelectorAll('.login-option');
    loginOptions.forEach(option => {
        option.addEventListener('click', function() {
            loginOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const loginType = this.getAttribute('data-login-type');
            document.getElementById('login-type').value = loginType;
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--danger)';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });

    // Search redirect handling
    const searchBars = document.querySelectorAll('.search-bar');
    searchBars.forEach(bar => {
        const input = bar.querySelector('input[type="text"]');
        const button = bar.querySelector('button');
        if (input && button) {
            button.addEventListener('click', function(e) {
                const query = input.value.trim();
                if (query) {
                    e.preventDefault();
                    window.location.href = '404.html';
                }
            });
        }
    });

    // Cart functionality
    let cartCount = 0;
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBadge = document.querySelector('.cart-badge');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('redirect-404') || this.getAttribute('href') === '404.html' || this.classList.contains('add-to-cart')) {
                e.preventDefault();
                window.location.href = '404.html';
                return;
            }

            e.preventDefault();
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }
            
            // Animation
            this.textContent = 'Added!';
            this.style.background = 'var(--success)';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
            }, 2000);
        });
    });

    // Category cards redirect to 404
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            window.location.href = '404.html';
        });
    });

    // 404 Back button functionality
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // Countdown timer
    const countdown = document.querySelector('.countdown');
    if (countdown) {
        const countdownDate = new Date(countdown.getAttribute('data-date')).getTime();
        
        const updateCountdown = function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdown.innerHTML = 'EXPIRED';
            }
        };
        
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            if (email) {
                window.location.href = '404.html';
            }
        });
    }

    // Product image hover effect
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // GSAP Animations (if GSAP is loaded)
    if (typeof gsap !== 'undefined') {
        gsap.from('.hero h1', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'bounce'
        });

        gsap.from('.hero p', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.3
        });

        gsap.from('.hero .btn', {
            duration: 1,
            scale: 0,
            opacity: 0,
            delay: 0.6
        });
    }

    // Parallax effect (if Jarallax is loaded)
    if (typeof jarallax !== 'undefined') {
        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.2
        });
    }

    // Isotope filtering (if Isotope is loaded)
    if (typeof Isotope !== 'undefined') {
        const grid = document.querySelector('.product-grid');
        if (grid) {
            const iso = new Isotope(grid, {
                itemSelector: '.product-card',
                layoutMode: 'fitRows'
            });
        }
    }

    // Owl Carousel (if loaded)
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            }
        });
    }

    // Slick Slider (if loaded)
    if (typeof $ !== 'undefined' && $.fn.slick) {
        $('.slick-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    // AOS Animation (if loaded)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Magnific Popup (if loaded)
    if (typeof $ !== 'undefined' && $.fn.magnificPopup) {
        $('.popup-link').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Redirect external links to 404
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && (link.classList.contains('external-link') || link.classList.contains('redirect-404'))) {
        e.preventDefault();
        window.location.href = '404.html';
    }
});