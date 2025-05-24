// ===== TESTIMONIAL SLIDER =====
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonial-track');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.slider-nav');

    // Skip if testimonial elements don't exist
    if (!track || !cards.length || !nextBtn || !prevBtn || !dotsNav) {
        return;
    }

    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight) +
        parseInt(window.getComputedStyle(cards[0]).marginLeft);
    let cardsPerView = getCardsPerView();
    let currentIndex = 0;
    let maxIndex = Math.ceil(cards.length / cardsPerView) - 1;

    // Get number of cards per view based on viewport width
    function getCardsPerView() {
        if (window.innerWidth >= 992) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    // Create dots navigation
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

    // Navigation functions
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to first slide
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to last slide
        }
        updateCarousel();
    }

    // Initialize the carousel
    createDots();

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
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function () {
            clearInterval(autoPlayInterval);
        });

        sliderContainer.addEventListener('mouseleave', function () {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }

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

// ===== KNOW MORE BUTTON =====
document.addEventListener('DOMContentLoaded', function () {
    const knowMoreBtn = document.getElementById('knowMoreBtn');
    
    if (knowMoreBtn) {
        knowMoreBtn.addEventListener('click', function () {
            // You can add functionality here like scrolling to another section
            // or opening a modal with more information
            alert('Thank you for your interest! We have more information coming soon.');
        });
    }

    // Simple animation for the divider on page load
    const divider = document.querySelector('.divider');
    if (divider) {
        divider.style.width = '0';
        setTimeout(() => {
            divider.style.transition = 'width 0.8s ease-in-out';
            divider.style.width = '150px';
        }, 300);
    }
});

// ===== FOOTER ANIMATIONS =====
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

    if (footer && routesSection) {
        // Simple scroll animation
        window.addEventListener('scroll', function () {
            const footerPosition = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (footerPosition < windowHeight) {
                routesSection.classList.add('animate');
            }
        });
    }

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

// ===== CAR SLIDER (HORIZONTAL) =====
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('carsSlider');
    const cars = document.querySelectorAll('.car-item');
    
    // Skip if car slider elements don't exist
    if (!slider || !cars.length) {
        console.warn('Car slider elements not found. Make sure you have #carsSlider and .car-item elements in your HTML.');
        return;
    }

    let currentSlide = 0;
    let autoSlideInterval;
    let isDragging = false;
    let startX = 0;

    // Calculate responsive values
    function getSliderConfig() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 480) {
            return {
                itemsToShow: 1.2,
                itemWidth: 200,
                gap: 20
            };
        } else if (screenWidth <= 768) {
            return {
                itemsToShow: 2.5,
                itemWidth: 220,
                gap: 25
            };
        } else if (screenWidth <= 1024) {
            return {
                itemsToShow: 3,
                itemWidth: 250,
                gap: 30
            };
        } else {
            return {
                itemsToShow: 4,
                itemWidth: 280,
                gap: 30
            };
        }
    }

    // Update slider position and constraints
    function updateSlider() {
        const config = getSliderConfig();
        const maxSlideIndex = Math.max(0, cars.length - Math.floor(config.itemsToShow));

        // Ensure current slide is within bounds
        if (currentSlide > maxSlideIndex) {
            currentSlide = maxSlideIndex;
        }

        // Calculate translation
        const translateX = -(currentSlide * (config.itemWidth + config.gap));
        
        // Apply transform with smooth transition
        slider.style.transform = `translateX(${translateX}px)`;
        slider.style.transition = 'transform 0.3s ease-in-out';

        // Update car item widths for consistency
        cars.forEach(car => {
            car.style.minWidth = `${config.itemWidth}px`;
            car.style.maxWidth = `${config.itemWidth}px`;
            car.style.marginRight = `${config.gap}px`;
        });
    }

    // Navigation functions
    function nextSlide() {
        const config = getSliderConfig();
        const maxSlideIndex = Math.max(0, cars.length - Math.floor(config.itemsToShow));

        if (currentSlide < maxSlideIndex) {
            currentSlide++;
        } else {
            currentSlide = 0; // Loop back to start
        }
        updateSlider();
    }

    function previousSlide() {
        const config = getSliderConfig();
        const maxSlideIndex = Math.max(0, cars.length - Math.floor(config.itemsToShow));

        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = maxSlideIndex; // Go to last possible slide
        }
        updateSlider();
    }

    // Auto-slide functionality
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Touch/swipe support for mobile
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoSlide();
        slider.style.transition = 'none'; // Disable transition during drag
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault(); // Prevent scrolling
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const minSwipeDistance = 50;

        // Re-enable transition
        slider.style.transition = 'transform 0.3s ease-in-out';

        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        } else {
            // Snap back to current position if swipe was too short
            updateSlider();
        }

        isDragging = false;
        startAutoSlide();
    }

    // Image zoom functionality
    function setupImageZoom() {
        cars.forEach((car) => {
            const img = car.querySelector('img');
            if (!img) return;

            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                // Create zoom overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;

                const zoomedImg = document.createElement('img');
                zoomedImg.src = img.src;
                zoomedImg.alt = img.alt || 'Car image';
                zoomedImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                    border-radius: 8px;
                `;

                overlay.appendChild(zoomedImg);
                document.body.appendChild(overlay);

                // Prevent body scroll
                document.body.style.overflow = 'hidden';

                // Animate in
                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';
                    zoomedImg.style.transform = 'scale(1)';
                });

                // Close on click or escape key
                function closeZoom() {
                    overlay.style.opacity = '0';
                    zoomedImg.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        if (document.body.contains(overlay)) {
                            document.body.removeChild(overlay);
                        }
                        document.body.style.overflow = '';
                    }, 300);
                }

                overlay.addEventListener('click', closeZoom);
                
                // Close on escape key
                function handleEscape(e) {
                    if (e.key === 'Escape') {
                        closeZoom();
                        document.removeEventListener('keydown', handleEscape);
                    }
                }
                document.addEventListener('keydown', handleEscape);
            });
        });
    }

    // Event listeners
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    slider.addEventListener('touchstart', handleTouchStart, { passive: false });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd);

    window.addEventListener('resize', function() {
        updateSlider();
    });

    // Initialize slider
    updateSlider();
    setupImageZoom();
    startAutoSlide();

    // Add navigation buttons if they exist
    const prevButton = document.querySelector('.car-slider-prev');
    const nextButton = document.querySelector('.car-slider-next');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            previousSlide();
            startAutoSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    // Expose functions globally for external control (optional)
    window.carSlider = {
        next: nextSlide,
        previous: previousSlide,
        goTo: function(index) {
            const config = getSliderConfig();
            const maxIndex = Math.max(0, cars.length - Math.floor(config.itemsToShow));
            currentSlide = Math.max(0, Math.min(index, maxIndex));
            updateSlider();
        },
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => cars.length
    };
});