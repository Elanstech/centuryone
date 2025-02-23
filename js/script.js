// ✧˖°. Luxury Property Management Website JavaScript .°˖✧
document.addEventListener('DOMContentLoaded', () => {
    // ⭐️ Initialize AOS Animations with Premium Settings
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // 🌟 Premium Preloader Animation
    class LuxuryPreloader {
        constructor() {
            this.preloader = document.querySelector('.preloader');
            this.logo = document.querySelector('.loader-logo');
            this.progress = document.querySelector('.loading-progress');
            this.init();
        }

        init() {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress > 100) {
                    progress = 100;
                    clearInterval(interval);
                    this.completeLoading();
                }
                this.updateProgress(progress);
            }, 200);
        }

        updateProgress(progress) {
            if (this.progress) {
                this.progress.style.width = `${progress}%`;
            }
        }

        completeLoading() {
            this.preloader.classList.add('fade-out');
            setTimeout(() => {
                this.preloader.style.display = 'none';
                document.body.classList.add('loaded');
                this.triggerPageAnimations();
            }, 500);
        }

        triggerPageAnimations() {
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.classList.add('aos-animate');
            });
        }
    }

    // ✨ Sophisticated Header Controller
    class PremiumHeader {
        constructor() {
            this.header = document.querySelector('.premium-header');
            this.logo = document.querySelector('.header-logo');
            this.mobileToggle = document.querySelector('.mobile-toggle');
            this.navLinks = document.querySelectorAll('.nav-link');
            this.lastScroll = 0;
            this.init();
        }

        init() {
            this.handleScroll = this.handleScroll.bind(this);
            window.addEventListener('scroll', () => requestAnimationFrame(this.handleScroll));
            this.initMobileMenu();
            this.initNavigation();
        }

        handleScroll() {
            const currentScroll = window.pageYOffset;
            
            // Elegant scroll state handling
            if (currentScroll > 50) {
                this.header.classList.add('scrolled');
                this.addHeaderGlow();
            } else {
                this.header.classList.remove('scrolled');
                this.removeHeaderGlow();
            }

            // Creative hide/show animation
            if (currentScroll > this.lastScroll && currentScroll > 500) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }

            this.lastScroll = currentScroll;
        }

        addHeaderGlow() {
            this.header.style.boxShadow = '0 10px 30px -10px rgba(4, 99, 7, 0.1)';
        }

        removeHeaderGlow() {
            this.header.style.boxShadow = 'none';
        }

        initMobileMenu() {
            this.mobileToggle.addEventListener('click', () => {
                this.mobileToggle.classList.toggle('active');
                document.querySelector('.main-nav').classList.toggle('active');
                this.animateMenuLines();
            });
        }

        animateMenuLines() {
            const lines = this.mobileToggle.querySelectorAll('.toggle-line');
            lines.forEach((line, index) => {
                line.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            });
        }

        initNavigation() {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        this.smoothScroll(target);
                    }
                });
            });
        }

        smoothScroll(target) {
            const headerHeight = this.header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // 🎨 Creative Stats Animation
    class LuxuryStats {
        constructor() {
            this.stats = document.querySelectorAll('.stat-number');
            this.animated = false;
            this.init();
        }

        init() {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animated) {
                        this.animateStats();
                        this.animated = true;
                    }
                });
            }, { threshold: 0.5 });

            this.stats.forEach(stat => observer.observe(stat));
        }

        animateStats() {
            this.stats.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000;
                let start = 0;
                const step = timestamp => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Premium easing function
                    const easing = this.easeOutExpo(percentage);
                    const current = Math.floor(target * easing);
                    
                    stat.textContent = current.toLocaleString();
                    
                    if (progress < duration) {
                        requestAnimationFrame(step);
                    } else {
                        stat.textContent = target.toLocaleString();
                        this.addSparkle(stat);
                    }
                };
                
                requestAnimationFrame(step);
            });
        }

        easeOutExpo(x) {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        }

        addSparkle(element) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-effect';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // ✨ Premium Services Animation
    class ServicesAnimation {
        constructor() {
            this.cards = document.querySelectorAll('.service-card');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                this.addHoverEffect(card);
                this.addClickEffect(card);
            });
        }

        addHoverEffect(card) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = 
                    `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        }

        addClickEffect(card) {
            card.addEventListener('click', () => {
                card.classList.add('clicked');
                setTimeout(() => card.classList.remove('clicked'), 500);
            });
        }
    }

    // 🌟 Testimonials Carousel
    class LuxuryCarousel {
        constructor() {
            this.slider = document.querySelector('.testimonials-slider');
            this.slides = document.querySelectorAll('.testimonial-card');
            this.currentSlide = 0;
            this.init();
        }

        init() {
            if (this.slider && this.slides.length) {
                this.setupSlider();
                this.startAutoplay();
                this.addTouchSupport();
            }
        }

        setupSlider() {
            this.slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${index * 100}%)`;
            });
        }

        moveToSlide(index) {
            this.slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });
            this.currentSlide = index;
        }

        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.moveToSlide(next);
        }

        startAutoplay() {
            setInterval(() => this.nextSlide(), 5000);
        }

        addTouchSupport() {
            let startX, isDragging = false;

            this.slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.pageX - this.slider.offsetLeft;
            });

            this.slider.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - this.slider.offsetLeft;
                const walk = (x - startX) * 2;
                
                if (Math.abs(walk) > 100) {
                    if (walk > 0 && this.currentSlide > 0) {
                        this.moveToSlide(this.currentSlide - 1);
                    } else if (walk < 0 && this.currentSlide < this.slides.length - 1) {
                        this.moveToSlide(this.currentSlide + 1);
                    }
                    isDragging = false;
                }
            });

            this.slider.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }
    }

    // 🎭 Premium Contact Form
    class LuxuryForm {
        constructor() {
            this.form = document.getElementById('contactForm');
            this.init();
        }

        init() {
            if (this.form) {
                this.addInputEffects();
                this.handleSubmission();
            }
        }

        addInputEffects() {
            const inputs = this.form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });

                input.addEventListener('input', () => {
                    this.validateInput(input);
                });
            });
        }

        validateInput(input) {
            const parent = input.parentElement;
            let isValid = true;

            switch(input.type) {
                case 'email':
                    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                    break;
                case 'tel':
                    isValid = /^\+?[\d\s-]{10,}$/.test(input.value);
                    break;
                default:
                    isValid = input.value.length > 0;
            }

            parent.classList.toggle('error', !isValid);
            parent.classList.toggle('success', isValid);
        }

        async handleSubmission() {
            this.form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = this.form.querySelector('.btn-submit');
                submitBtn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
                
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    submitBtn.innerHTML = '<span><i class="fas fa-check"></i> Message Sent!</span>';
                    submitBtn.classList.add('success');
                    
                    setTimeout(() => {
                        this.form.reset();
                        submitBtn.innerHTML = '<span>Send Message <i class="fas fa-paper-plane"></i></span>';
                        submitBtn.classList.remove('success');
                        this.form.querySelectorAll('.form-group').forEach(group => {
                            group.classList.remove('focused', 'success');
                        });
                    }, 3000);
                    
                } catch (error) {
                    submitBtn.innerHTML = '<span><i class="fas fa-exclamation-circle"></i> Error</span>';
                    submitBtn.classList.add('error');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Send Message <i class="fas fa-paper-plane"></i></span>';
                        submitBtn.classList.remove('error');
                    }, 3000);
                }
            });
        }
    }

    // 🌟 Initialize Everything
    new LuxuryPreloader();
    new PremiumHeader();
    new LuxuryStats();
    new ServicesAnimation();
    new LuxuryCarousel();
    new LuxuryForm();

    // ✨ Back to Top Button
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

    // 🎨 Premium Particle Background
    const addParticles = () => {
        const container = document.querySelector('.hero');
        if (container) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(particle);
            }
        }
    };

    addParticles();
});
