document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonial-track');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.slider-nav');

    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) +
        parseInt(window.getComputedStyle(cards[0]).marginLeft);
    let cardsPerView = getCardsPerView();
    let currentIndex = 0;
    let maxIndex = Math.ceil(cards.length / cardsPerView) - 1;

    // Create dots
    function createDots() {
        dotsNav.innerHTML = '';
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dotsNav.appendChild(dot);
        }
    }

    // Get number of cards per view based on viewport width
    function getCardsPerView() {
        if (window.innerWidth >= 992) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    // Update carousel display
    function updateCarousel() {
        cardWidth = cards[0].getBoundingClientRect().width;
        cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) +
            parseInt(window.getComputedStyle(cards[0]).marginLeft);
        cardsPerView = getCardsPerView();
        maxIndex = Math.ceil(cards.length / cardsPerView) - 1;

        // If current index is out of bounds after resize
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        // Update track position
        track.style.transform = `translateX(-${currentIndex * (cardWidth + cardMargin) * cardsPerView}px)`;

        // Recreate dots if needed
        createDots();

        // Update active dot
        const dots = Array.from(dotsNav.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Initialize the carousel
    createDots();

    // Next slide
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to first slide
        }
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to last slide
        }
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dotsNav.addEventListener('click', function (e) {
        if (e.target.classList.contains('slider-dot')) {
            currentIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        updateCarousel();
    });

    // Auto-play functionality
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.testimonial-slider');
    sliderContainer.addEventListener('mouseenter', function () {
        clearInterval(autoPlayInterval);
    });

    sliderContainer.addEventListener('mouseleave', function () {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const minSwipeDistance = 50;
        if (touchStartX - touchEndX > minSwipeDistance) {
            // Swipe left
            nextSlide();
        } else if (touchEndX - touchStartX > minSwipeDistance) {
            // Swipe right
            prevSlide();
        }
    }
});
document.getElementById('knowMoreBtn').addEventListener('click', function () {
    // You can add functionality here like scrolling to another section
    // or opening a modal with more information
    alert('Thank you for your interest! We have more information coming soon.');
});

// Simple animation for the divider on page load for a subtle effect
document.addEventListener('DOMContentLoaded', function () {
    const divider = document.querySelector('.divider');
    divider.style.width = '0';
    setTimeout(() => {
        divider.style.transition = 'width 0.8s ease-in-out';
        divider.style.width = '150px';
    }, 300);
});
document.addEventListener('DOMContentLoaded', function () {
    // Fade in footer sections on load
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, index * 200);
    });

    // Add animation when scrolling to the footer
    const footer = document.getElementById('footer');
    const routesSection = document.querySelector('.routes-section');

    // Simple scroll animation
    window.addEventListener('scroll', function () {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerPosition < windowHeight) {
            routesSection.classList.add('animate');
        }
    });

    // Add hover effect for touch devices
    const footerLinks = document.querySelectorAll('.footer-list a');
    footerLinks.forEach(link => {
        link.addEventListener('touchstart', function () {
            this.classList.add('touch-hover');
        });

        link.addEventListener('touchend', function () {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 300);
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevent default action
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AVIGO Taxis",
        "url": "https://avigotaxi.com",
        "logo": "https://avigotaxi.com/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-89XXXXX888",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
        },
        "sameAs": [
            "https://www.facebook.com/avigotaxi",
            "https://www.instagram.com/avigotaxi",
            "https://twitter.com/avigotaxi"
        ]
    };

    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
});
