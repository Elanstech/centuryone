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

    // Header Scroll Behavior
    const header = document.querySelector('.premium-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
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
                if (!navList.classList.contains('active')) { // Don't hide if mobile menu is open
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
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Ensure header is visible when menu is toggled
            if (navList.classList.contains('active')) {
                header.classList.remove('hidden');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle && mobileToggle.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
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

    // Testimonials Carousel
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        const testimonials = [
            {
                text: "Century One Management has exceeded all our expectations. Their dedication to maintaining our properties is truly impressive.",
                author: "Jennifer Roberts",
                position: "Property Owner",
                image: "testimonial-1.jpg"
            },
            {
                text: "Working with Zarina and her team has transformed our investment strategy. Their expertise is unmatched in the industry.",
                author: "Michael Chen",
                position: "Real Estate Investor",
                image: "testimonial-2.jpg"
            },
            {
                text: "The attention to detail and personalized service from Century One is exceptional. They treat our properties as if they were their own.",
                author: "Sarah Johnson",
                position: "Portfolio Manager",
                image: "testimonial-3.jpg"
            }
        ];
        
        // Create testimonial slides
        testimonials.forEach((testimonial, index) => {
            const slide = document.createElement('div');
            slide.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
            
            slide.innerHTML = `
                <div class="testimonial-quote">"</div>
                <div class="testimonial-content">
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="${testimonial.image}" alt="${testimonial.author}">
                        </div>
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.position}</p>
                        </div>
                    </div>
                </div>
            `;
            
            slider.appendChild(slide);
        });
        
        // Set up carousel functionality
        const slides = slider.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        
        // Position slides initially
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
        });
        
        // Function to change slides
        const moveToSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
                slide.classList.toggle('active', i === index);
            });
            currentSlide = index;
        };
        
        // Auto-advance slides
        setInterval(() => {
            const next = (currentSlide + 1) % slides.length;
            moveToSlide(next);
        }, 5000);
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add focus effects to inputs
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Check if input has value initially
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('focused');
            }
            
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual form submission)
                setTimeout(() => {
                    submitBtn.innerHTML = '<span><i class="fas fa-check"></i> Message Sent!</span>';
                    submitBtn.classList.add('success');
                    
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = '<span>Send Message <i class="fas fa-paper-plane"></i></span>';
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                        
                        // Reset form state
                        contactForm.querySelectorAll('.form-group').forEach(group => {
                            group.classList.remove('focused', 'success');
                        });
                    }, 3000);
                }, 2000);
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = newsletterForm.querySelector('button');
            const input = newsletterForm.querySelector('input[type="email"]');
            
            if (submitBtn && input) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    submitBtn.classList.add('success');
                    
                    setTimeout(() => {
                        input.value = '';
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

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

    // Floating Contact Button
    const floatingContact = document.querySelector('.floating-contact');
    if (floatingContact) {
        floatingContact.addEventListener('click', () => {
            // Smooth scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.premium-header')?.offsetHeight || 0;
                const contactPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: contactPosition,
                    behavior: 'smooth'
                });
            }
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
    
    // Lazy loading images for better performance
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Hero Particles for visual interest
    const addParticles = () => {
        const container = document.querySelector('.hero');
        if (container) {
            // Remove any existing particles first
            const existingParticles = container.querySelectorAll('.particle');
            existingParticles.forEach(p => p.remove());
            
            // Add new particles
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.width = `${Math.random() * 5 + 1}px`;
                particle.style.height = particle.style.width;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(particle);
            }
        }
    };

    // Add particles and handle window resize
    addParticles();
    window.addEventListener('resize', () => {
        requestAnimationFrame(addParticles);
    });
    
    // Handle property location filters if they exist
    const locationFilters = document.querySelectorAll('.location-btn');
    if (locationFilters.length) {
        locationFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                locationFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                filter.classList.add('active');
                
                // Filter properties (this would be implemented based on your map solution)
                const filterValue = filter.dataset.filter;
                console.log(`Filtering properties by: ${filterValue}`);
                
                // Example implementation if you have a map
                // filterPropertyMap(filterValue);
            });
        });
    }
});
