// ===== MOBILE NAVIGATION =====
// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Check if elements exist before adding event listeners
    if (menuBtn && closeBtn && navLinks) {
        // Open menu when hamburger icon is clicked
        menuBtn.addEventListener('click', function() {
            navLinks.classList.add('active');
        });
        
        // Close menu when X icon is clicked
        closeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            navLinks.classList.remove('active');
        });
        
        // Close menu when clicking outside (optional enhancement)
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !menuBtn.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            // Ensure proper display of menu buttons based on screen size
            if (window.innerWidth > 768) {
                // Hide buttons on desktop
                if (menuBtn) menuBtn.style.display = 'none';
            } else {
                // Show hamburger on mobile
                if (menuBtn) menuBtn.style.display = 'block';
            }
        });
        
        // Initial check for screen size
        if (window.innerWidth > 768) {
            menuBtn.style.display = 'none';
            closeBtn.style.display = 'none';
        }
    }
});

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
            img.addEventListener('click', function () {
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

    window.addEventListener('resize', function () {
        updateSlider();
    });

    // Initialize slider
    updateSlider();
    setupImageZoom();
    startAutoSlide();

    // Make functions globally accessible for onclick handlers
    window.previousSlide = function () {
        console.log('Global previousSlide called');
        stopAutoSlide();
        previousSlide();
        setTimeout(() => startAutoSlide(), 100);
    };

    window.nextSlide = function () {
        console.log('Global nextSlide called');
        stopAutoSlide();
        nextSlide();
        setTimeout(() => startAutoSlide(), 100);
    };

    // Add navigation buttons - Multiple selector attempts for compatibility
    const prevButtonSelectors = [
        '.nav-btn.prev',
        '.navigation .prev',
        '.car-slider-prev',
        '.prev-car-btn',
        '.car-prev',
        '#carPrevBtn',
        '.slider-prev',
        '[data-car-prev]'
    ];

    const nextButtonSelectors = [
        '.nav-btn.next',
        '.navigation .next',
        '.car-slider-next',
        '.next-car-btn',
        '.car-next',
        '#carNextBtn',
        '.slider-next',
        '[data-car-next]'
    ];

    let prevButton = null;
    let nextButton = null;

    // Find prev button using multiple selectors
    for (const selector of prevButtonSelectors) {
        prevButton = document.querySelector(selector);
        if (prevButton) {
            console.log('Previous button found with selector:', selector, prevButton);
            break;
        }
    }

    // Find next button using multiple selectors
    for (const selector of nextButtonSelectors) {
        nextButton = document.querySelector(selector);
        if (nextButton) {
            console.log('Next button found with selector:', selector, nextButton);
            break;
        }
    }

    // Add event listeners with proper error handling (in addition to onclick)
    if (prevButton) {
        prevButton.addEventListener('click', function (e) {
            console.log('Previous button clicked via event listener');
            stopAutoSlide();
            previousSlide();
            setTimeout(() => startAutoSlide(), 100);
        });
    } else {
        console.warn('Previous button not found. Tried selectors:', prevButtonSelectors);
    }

    if (nextButton) {
        nextButton.addEventListener('click', function (e) {
            console.log('Next button clicked via event listener');
            stopAutoSlide();
            nextSlide();
            setTimeout(() => startAutoSlide(), 100);
        });
    } else {
        console.warn('Next button not found. Tried selectors:', nextButtonSelectors);
    }

    // Also try to find buttons as direct children or siblings of slider container
    const sliderContainer = slider.parentElement;
    if (sliderContainer) {
        const containerPrev = sliderContainer.querySelector('button[class*="prev"], button[id*="prev"], .btn-prev, .previous');
        const containerNext = sliderContainer.querySelector('button[class*="next"], button[id*="next"], .btn-next, .next');

        if (containerPrev && !prevButton) {
            console.log('Found prev button in container:', containerPrev);
            containerPrev.addEventListener('click', function (e) {
                stopAutoSlide();
                previousSlide();
                setTimeout(() => startAutoSlide(), 100);
            });
        }

        if (containerNext && !nextButton) {
            console.log('Found next button in container:', containerNext);
            containerNext.addEventListener('click', function (e) {
                stopAutoSlide();
                nextSlide();
                setTimeout(() => startAutoSlide(), 100);
            });
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        // Only work if slider is visible and focused area
        const sliderRect = slider.getBoundingClientRect();
        const isSliderVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;

        if (isSliderVisible) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoSlide();
                previousSlide();
                setTimeout(() => startAutoSlide(), 100);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoSlide();
                nextSlide();
                setTimeout(() => startAutoSlide(), 100);
            }
        }
    });

    // Universal click handler for any button with car slider attributes
    document.addEventListener('click', function (e) {
        const target = e.target;

        // Check if clicked element or its parent is a car slider button
        const isCarPrevBtn = target.hasAttribute('data-car-prev') ||
            target.closest('[data-car-prev]') ||
            target.classList.contains('car-prev') ||
            target.classList.contains('car-slider-prev');

        const isCarNextBtn = target.hasAttribute('data-car-next') ||
            target.closest('[data-car-next]') ||
            target.classList.contains('car-next') ||
            target.classList.contains('car-slider-next');

        if (isCarPrevBtn) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Car previous button clicked via universal handler');
            stopAutoSlide();
            previousSlide();
            setTimeout(() => startAutoSlide(), 100);
        } else if (isCarNextBtn) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Car next button clicked via universal handler');
            stopAutoSlide();
            nextSlide();
            setTimeout(() => startAutoSlide(), 100);
        }
    });

    // Global API for car slider
    window.carSlider = {
        next: nextSlide,
        previous: previousSlide,
        goTo: function (index) {
            const config = getSliderConfig();
            const maxIndex = Math.max(0, cars.length - Math.floor(config.itemsToShow));
            currentSlide = Math.max(0, Math.min(index, maxIndex));
            updateSlider();
        },
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => cars.length
    };
});