// Luxury Real Estate JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 🌟 Premium Preloader Animation
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    let progress = 0;
    
    const simulateLoading = () => {
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.classList.add('loaded');
                    }, 500);
                }, 500);
            }
            loadingProgress.style.width = `${progress}%`;
        }, 200);
    };
    
    simulateLoading();

    // 🎨 Luxury Navigation Effects
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let lastScroll = 0;

    // Premium Scroll Effects
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Dynamic Navbar Background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Smart Navbar Hide/Show
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // 🍔 Sophisticated Mobile Menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animated Toggle Icon
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('animate'));
        
        // Prevent Body Scroll
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // 📊 Advanced Stats Counter Animation
    const startCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / duration * 10;
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Initialize counters when in viewport
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // ✨ Premium About Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // 🎨 Creative Animation Controller
    class AnimationController {
        constructor() {
            this.initializeObserver();
            this.initializeParallax();
            this.initializeStats();
            this.initializeHoverEffects();
        }

        // 🔮 Premium Intersection Observer
        initializeObserver() {
            const options = {
                threshold: 0.2,
                rootMargin: '0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        if (entry.target.classList.contains('stat-card')) {
                            this.animateStats(entry.target);
                        }
                    }
                });
            }, options);

            // Observe elements
            document.querySelectorAll('.fade-in, .stat-card, .feature-card').forEach(el => {
                observer.observe(el);
            });
        }

        // 🌟 Elegant Parallax Effect
        initializeParallax() {
            const parallaxElements = document.querySelectorAll('.founder-image-wrapper, .feature-card');
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        parallaxElements.forEach(el => {
                            const speed = el.dataset.speed || 0.2;
                            const rect = el.getBoundingClientRect();
                            const visible = rect.top < window.innerHeight && rect.bottom > 0;
                            
                            if (visible) {
                                const yPos = (window.scrollY - rect.top) * speed;
                                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                            }
                        });
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }

        // 📊 Creative Stats Animation
        initializeStats() {
            const stats = document.querySelectorAll('.stat-number');
            
            stats.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000; // Animation duration in ms
                let start = null;
                
                const easeOutQuart = t => 1 - (--t) * t * t * t;

                function animateStat(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    const easing = easeOutQuart(percentage);
                    const current = Math.floor(target * easing);
                    
                    stat.textContent = current.toLocaleString();

                    if (progress < duration) {
                        requestAnimationFrame(animateStat);
                    } else {
                        stat.textContent = target.toLocaleString();
                        this.addSparkleEffect(stat);
                    }
                }

                // Start animation when in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            requestAnimationFrame(animateStat);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe(stat);
            });
        }

        // ✨ Premium Sparkle Effect
        addSparkleEffect(element) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            element.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }

        // 💫 Sophisticated Hover Interactions
        initializeHoverEffects() {
            // Premium Card Tilt Effect
            const cards = document.querySelectorAll('.feature-card, .stat-card');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const angleX = (y - centerY) / 20;
                    const angleY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
            });

            // Elegant Image Hover Effect
            const founderImage = document.querySelector('.founder-image-wrapper');
            if (founderImage) {
                founderImage.addEventListener('mousemove', (e) => {
                    const { left, top, width, height } = founderImage.getBoundingClientRect();
                    const x = (e.clientX - left) / width;
                    const y = (e.clientY - top) / height;
                    
                    const shine = founderImage.querySelector('.shine');
                    if (shine) {
                        shine.style.opacity = '1';
                        shine.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
                    }
                });

                founderImage.addEventListener('mouseleave', () => {
                    const shine = founderImage.querySelector('.shine');
                    if (shine) {
                        shine.style.opacity = '0';
                    }
                });
            }
        }
    }

    // 🎭 Premium Scroll Animations
    class ScrollAnimator {
        constructor() {
            this.initializeScrollEffects();
        }

        initializeScrollEffects() {
            const sections = document.querySelectorAll('.about-section');
            
            const scrollHandler = () => {
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const visible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (visible) {
                        const progress = Math.min(
                            1,
                            1 - (rect.top / window.innerHeight)
                        );
                        
                        this.animateSection(section, progress);
                    }
                });
            };

            window.addEventListener('scroll', () => {
                requestAnimationFrame(scrollHandler);
            });
        }

        animateSection(section, progress) {
            const elements = section.querySelectorAll('.animate-on-scroll');
            
            elements.forEach((el, index) => {
                const delay = index * 100;
                setTimeout(() => {
                    el.style.opacity = progress;
                    el.style.transform = `translateY(${20 - (progress * 20)}px)`;
                }, delay);
            });
        }
    }

    // 🎨 Initialize Premium Animations
    new AnimationController();
    new ScrollAnimator();

    // 🌟 Smooth Scroll Implementation
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

    // ✨ Add Dynamic Background Effects
    const addDynamicBackground = () => {
        const section = document.querySelector('.about-section');
        const particles = 20;

        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'background-particle';
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            section.appendChild(particle);
        }
    };

    // 🎠 Premium Testimonials Carousel
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;

        // Touch and Mouse Events
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialSlider.classList.add('active');
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });

        // Auto Slide
        const autoSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            testimonialSlider.scrollTo({
                left: slides[currentSlide].offsetLeft,
                behavior: 'smooth'
            });
        };

        setInterval(autoSlide, 5000);
    }

    // 📝 Advanced Form Validation and Animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');

            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });

            // Real-time Validation
            input.addEventListener('input', () => {
                validateInput(input, group);
            });
        });

        const validateInput = (input, group) => {
            const value = input.value.trim();
            
            switch(input.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    toggleValidation(group, emailRegex.test(value));
                    break;
                case 'tel':
                    const phoneRegex = /^\+?[\d\s-]{10,}$/;
                    toggleValidation(group, phoneRegex.test(value));
                    break;
                default:
                    toggleValidation(group, value.length > 0);
            }
        };

        const toggleValidation = (group, isValid) => {
            group.classList.toggle('error', !isValid);
            group.classList.toggle('success', isValid);
        };

        // Form Submission with Animation
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success Animation
                submitBtn.innerHTML = '<span><i class="fas fa-check"></i> Sent Successfully!</span>';
                submitBtn.classList.add('success');
                
                // Reset Form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Send Message <i class="fas fa-paper-plane"></i></span>';
                    submitBtn.classList.remove('success');
                    formGroups.forEach(group => {
                        group.classList.remove('focused', 'success');
                    });
                }, 3000);
                
            } catch (error) {
                submitBtn.innerHTML = '<span><i class="fas fa-exclamation-circle"></i> Error, Try Again</span>';
                submitBtn.classList.add('error');
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Message <i class="fas fa-paper-plane"></i></span>';
                    submitBtn.classList.remove('error');
                }, 3000);
            }
        });
    }

    // 🎯 Premium Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 1000) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 🌟 Parallax Effects
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // 💫 Elegant Hover Effects
    const addHoverEffect = (elements, className) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add(className);
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove(className);
            });
        });
    };

    // Apply hover effects to various elements
    addHoverEffect(document.querySelectorAll('.service-card'), 'hover-active');
    addHoverEffect(document.querySelectorAll('.property-card'), 'hover-active');

    // 🎨 Dynamic Color Theme Based on Time
    const updateTheme = () => {
        const hour = new Date().getHours();
        const root = document.documentElement;
        
        if (hour >= 18 || hour < 6) {
            // Evening/Night Theme
            root.style.setProperty('--primary-dark', '#024205');
            root.style.setProperty('--accent', '#FFE44D');
        } else {
            // Day Theme
            root.style.setProperty('--primary-dark', '#035206');
            root.style.setProperty('--accent', '#FFD700');
        }
    };

    updateTheme();
    setInterval(updateTheme, 1800000); // Update every 30 minutes

    // 🎭 Advanced Modal Handling
    const initializeModals = () => {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const modals = document.querySelectorAll('.modal');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.dataset.modal;
                const modal = document.getElementById(modalId);
                openModal(modal);
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        });
    };

    const openModal = (modal) => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    initializeModals();

    // 📱 Initialize Mobile-specific Features
    const initializeMobileFeatures = () => {
        if (window.innerWidth <= 768) {
            // Add mobile-specific event listeners and features
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchmove', handleTouchMove, false);
        }
    };

    initializeMobileFeatures();
});

// 🎨 Advanced Cursor Effect
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.cursorinner = document.createElement('div');
        this.cursorinner.className = 'cursor-inner';
        document.body.appendChild(this.cursorinner);

        this.init();
    }

    init() {
        document.addEventListener('mousemove', e => {
            this.cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            this.cursorinner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
            this.cursorinner.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
            this.cursorinner.classList.remove('click');
        });
    }
}
