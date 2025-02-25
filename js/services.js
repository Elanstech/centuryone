// Century One Management - Services Page JavaScript - Optimized

document.addEventListener('DOMContentLoaded', () => {
    // Service Navigation scroll and active state handling
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    const servicesSections = document.querySelectorAll('.service-detail-section, #specialized');
    const servicesNavigation = document.querySelector('.services-navigation');
    const header = document.querySelector('.premium-header');
    
    // Function to detect if device is mobile
    const isMobile = () => {
        return window.innerWidth < 768;
    };
    
    // Function to set active navigation item based on scroll position
    const setActiveNavOnScroll = () => {
        // If no elements found, exit
        if (!servicesSections.length || !serviceNavItems.length) return;
        
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Set a buffer for better UX - larger on mobile
        const scrollBuffer = isMobile() ? 140 : 100;
        
        // Flag to track if a section is active
        let sectionInView = false;
        
        // Determine which section is in view
        servicesSections.forEach((section) => {
            const sectionTop = section.offsetTop - scrollBuffer;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                // Remove active class from all nav items
                serviceNavItems.forEach((item) => {
                    item.classList.remove('active');
                });
                
                // Add active class to corresponding nav item
                const targetNavItem = document.querySelector(`.service-nav-item[href="#${sectionId}"]`);
                if (targetNavItem) {
                    targetNavItem.classList.add('active');
                    
                    // Center active item in view for mobile scrolling navigation
                    if (isMobile() && servicesNavigation) {
                        const navContainer = servicesNavigation.querySelector('.navigation-container');
                        if (navContainer) {
                            const itemPosition = targetNavItem.offsetLeft;
                            const containerWidth = navContainer.offsetWidth;
                            const itemWidth = targetNavItem.offsetWidth;
                            const scrollPosition = itemPosition - (containerWidth / 2) + (itemWidth / 2);
                            
                            navContainer.scrollTo({
                                left: scrollPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
                
                sectionInView = true;
            }
        });
        
        // If no section is in view and we're at the top of the page, activate the first item
        if (!sectionInView && scrollPosition < 300) {
            serviceNavItems.forEach((item, index) => {
                item.classList.toggle('active', index === 0);
            });
        }
    };
    
    // Add scroll event listener with throttling for better performance
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (scrollTimer) return;
        
        scrollTimer = setTimeout(() => {
            setActiveNavOnScroll();
            scrollTimer = null;
        }, 100);
    });
    
    // Set initial active state
    setActiveNavOnScroll();
    
    // Smooth scroll for service navigation
    serviceNavItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            serviceNavItems.forEach((navItem) => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            item.classList.add('active');
            
            // Get target section
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate scroll position with header offset
                const headerHeight = header ? header.offsetHeight : 0;
                const navHeight = servicesNavigation ? servicesNavigation.offsetHeight : 0;
                
                // Add a small buffer for better positioning
                const buffer = isMobile() ? 10 : 20;
                
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight - buffer;
                
                // Smooth scroll to target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class on clicked item
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
                
                // If mobile and opening an item, scroll it into better view
                if (!isActive && isMobile()) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const navHeight = servicesNavigation ? servicesNavigation.offsetHeight : 0;
                    const totalOffset = headerHeight + navHeight + 20;
                    
                    const itemTop = item.getBoundingClientRect().top + window.pageYOffset;
                    const targetScrollPosition = itemTop - totalOffset;
                    
                    // Only scroll if the item isn't already well in view
                    if (item.getBoundingClientRect().top < totalOffset + 50) {
                        window.scrollTo({
                            top: targetScrollPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Feature icons animation on scroll with better performance
    const featureItems = document.querySelectorAll('.feature-item');
    let animationItems = new Set(); // Track items that need animation
    
    const animateFeatureIcons = () => {
        featureItems.forEach((item) => {
            // Skip if already animated
            if (animationItems.has(item)) return;
            
            const itemPosition = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if item is in viewport
            if (itemPosition.top < windowHeight * 0.85) {
                const icon = item.querySelector('.feature-icon');
                if (icon) {
                    // Add to animated set
                    animationItems.add(item);
                    
                    // Animate icon
                    icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    icon.style.transform = 'rotateY(360deg)';
                    
                    // Reset animation after delay
                    setTimeout(() => {
                        icon.style.transition = 'transform 0.3s ease';
                        icon.style.transform = '';
                    }, 800);
                }
            }
        });
    };
    
    // Optimize scroll event with throttling
    let animationTimer;
    window.addEventListener('scroll', () => {
        if (animationTimer) return;
        
        animationTimer = setTimeout(() => {
            animateFeatureIcons();
            animationTimer = null;
        }, 150);
    });
    
    // Initialize AOS animations if available
    const initAOS = () => {
        if (typeof AOS !== 'undefined' && AOS) {
            // Configure AOS for better mobile performance
            AOS.init({
                duration: isMobile() ? 600 : 1000,
                once: true,
                offset: isMobile() ? 50 : 100,
                delay: isMobile() ? 0 : 100,
                disable: 'phone' // Disable on very small devices for better performance
            });
        }
    };
    
    // Initialize AOS
    initAOS();
    
    // Refresh AOS on resize for better responsiveness
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (typeof AOS !== 'undefined' && AOS) {
                AOS.refresh();
            }
            
            // Reset animation tracking on resize
            animationItems.clear();
            
            // Force recalculation of active nav item
            setActiveNavOnScroll();
        }, 250);
    });
    
    // Handle touch swipe for navigation on mobile
    if (isMobile() && servicesNavigation) {
        const navContainer = servicesNavigation.querySelector('.navigation-container');
        if (navContainer) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            navContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            navContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            const handleSwipe = () => {
                // Detect swipe direction and scroll nav accordingly
                const swipeDistance = touchEndX - touchStartX;
                if (Math.abs(swipeDistance) > 50) {
                    navContainer.scrollBy({
                        left: -swipeDistance * 2,
                        behavior: 'smooth'
                    });
                }
            };
        }
    }
    
    // Add animation to service images
    const serviceImages = document.querySelectorAll('.service-image');
    
    serviceImages.forEach((image) => {
        const imgElement = image.querySelector('img');
        const accentElement = image.querySelector('.image-accent');
        
        if (imgElement && accentElement) {
            // Animation on image hover
            const handleImageHover = (isHovering) => {
                if (imgElement && accentElement) {
                    imgElement.style.transform = isHovering ? 'scale(1.02) translateY(-5px)' : '';
                    accentElement.style.transform = isHovering ? 'scale(1.05)' : '';
                }
            };
            
            // Add both mouse and touch events for universal support
            image.addEventListener('mouseenter', () => handleImageHover(true));
            image.addEventListener('mouseleave', () => handleImageHover(false));
            
            // For touch devices
            image.addEventListener('touchstart', () => handleImageHover(true), { passive: true });
            image.addEventListener('touchend', () => handleImageHover(false), { passive: true });
        }
    });
    
    // Handle preloader if present
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Ensure preloader hides after max 3 seconds if it hasn't already
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
                
                // Trigger animations again after preloader is gone
                if (typeof AOS !== 'undefined' && AOS) {
                    AOS.refresh();
                }
                animationItems.clear();
                animateFeatureIcons();
            }, 500);
        }, 3000);
    }
    
    // Execute initial animations
    setTimeout(() => {
        animateFeatureIcons();
    }, 500);
});
