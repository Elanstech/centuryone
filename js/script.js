// Century One Management - Complete JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // Preloader Animation
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.loading-progress');
    
    if (preloader && progress) {
        let loadProgress = 0;
        const interval = setInterval(() => {
            loadProgress += Math.random() * 30;
            if (loadProgress > 100) {
                loadProgress = 100;
                clearInterval(interval);
                
                // Complete loading
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    // Trigger animations
                    document.querySelectorAll('[data-aos]').forEach(el => {
                        el.classList.add('aos-animate');
                    });
                    
                    // Ensure video plays after page is fully loaded
                    playHeroVideo();
                }, 500);
            }
            progress.style.width = `${loadProgress}%`;
        }, 200);
    } else {
        // If no preloader, still ensure video plays
        playHeroVideo();
    }
    
    // Handle Hero Video correctly for all devices
    function playHeroVideo() {
        const heroVideo = document.querySelector('.hero-video');
        
        if (heroVideo) {
            // Set attributes that help with mobile autoplay
            heroVideo.muted = true;
            heroVideo.playsInline = true;
            heroVideo.setAttribute('playsinline', '');
            heroVideo.setAttribute('muted', '');
            
            // Force play the video
            heroVideo.play().catch(error => {
                console.log('Video play error:', error);
                
                // Try playing again with a user interaction
                document.addEventListener('touchstart', () => {
                    heroVideo.play().catch(e => console.log('Second play attempt failed:', e));
                }, { once: true });
            });
            
            // Ensure video restarts if it ends
            heroVideo.addEventListener('ended', () => {
                heroVideo.currentTime = 0;
                heroVideo.play().catch(e => console.log('Loop play failed:', e));
            });
        }
    }

    // ==========================================================
    // MOBILE HEADER MENU - NEW IMPLEMENTATION
    // ==========================================================
    const header = document.querySelector('.premium-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerButtons = document.querySelector('.header-buttons');
    const body = document.body;
    
    // Create mobile header buttons container if it doesn't exist
    if (mainNav && headerButtons && !document.querySelector('.mobile-header-buttons')) {
        const mobileHeaderButtons = document.createElement('div');
        mobileHeaderButtons.className = 'mobile-header-buttons';
        mobileHeaderButtons.innerHTML = headerButtons.innerHTML;
        mainNav.appendChild(mobileHeaderButtons);
    }
    
    // Toggle mobile menu
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            if (mainNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle && mobileToggle.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        // Check if menu is open and click is outside the menu and not on the toggle
        if (mainNav && mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            mobileToggle && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Handle any mobile header buttons that were dynamically added
    if (document.querySelector('.mobile-header-buttons')) {
        document.querySelectorAll('.mobile-header-buttons a').forEach(button => {
            button.addEventListener('click', () => {
                if (mobileToggle && mobileToggle.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }
    // ==========================================================
    // END MOBILE HEADER MENU
    // ==========================================================

    // Variables for scroll handling
    let lastScroll = 0;
    let scrollTimer;
    
    // Handle scroll events for the header
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight - 200 : 0; // Threshold near bottom of hero
        
        // Add scrolled class when scrolled down even a little
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down and below hero section
        // Show header when scrolling up
        if (currentScroll > lastScroll && currentScroll > heroHeight) {
            // Scrolling DOWN - hide header after a short delay
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                if (mainNav && !mainNav.classList.contains('active')) { // Don't hide if mobile menu is open
                    header.classList.add('hidden');
                }
            }, 150); // Short delay before hiding to avoid flickering
        } else {
            // Scrolling UP - show header immediately
            clearTimeout(scrollTimer);
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    };
    
    // Also ensure mobile menu state is correct on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            if (mainNav && mainNav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.style.overflow = '';
            }
        }
        
        // Reset scroll handling on resize
        handleScroll();
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize header state on page load
    handleScroll();
    
    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            // Set active class
            navLinks.forEach(el => el.classList.remove('active'));
            link.classList.add('active');
            
            // Get target section and scroll to it
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            let startTime = null;
            
            const step = timestamp => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function
                const easing = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
                const current = Math.floor(target * easing);
                
                stat.textContent = current.toLocaleString();
                
                if (progress < duration) {
                    requestAnimationFrame(step);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            
            requestAnimationFrame(step);
        });
    };
    
    // Use Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (stats.length) {
        statsObserver.observe(stats[0].closest('.stats'));
    }
    
    // Testimonials functionality
    const setupTestimonials = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        
        if (!testimonialCards.length) return;
        
        let currentIndex = 0;
        
        // Function to change testimonial
        const changeTestimonial = (index) => {
            // Handle index boundaries
            if (index < 0) {
                index = testimonialCards.length - 1;
            } else if (index >= testimonialCards.length) {
                index = 0;
            }
            
            // Update current index
            currentIndex = index;
            
            // Update testimonial cards
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            
            // Update dots
            if (dots.length) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        };
        
        // Set up navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                changeTestimonial(currentIndex - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                changeTestimonial(currentIndex + 1);
            });
        }
        
        // Set up dot navigation
        if (dots.length) {
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    changeTestimonial(i);
                });
            });
        }
        
        // Auto-advance testimonials
        setInterval(() => {
            changeTestimonial(currentIndex + 1);
        }, 5000);
    };
    
    setupTestimonials();

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 1000) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Service Cards Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(360deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(0deg)';
                }
            });
        });
    }
    
    // Property Filters (if they exist)
    const propertyFilters = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    if (propertyFilters.length && propertyCards.length) {
        propertyFilters.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                propertyFilters.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter properties
                propertyCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category');
                        if (categories && categories.includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});
