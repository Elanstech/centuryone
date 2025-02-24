// Century One Management - Essential JavaScript
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
                }, 500);
            }
            progress.style.width = `${loadProgress}%`;
        }, 200);
    }

    // Header Scroll Effects
    const header = document.querySelector('.premium-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    
    // Scroll handler for header
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        // Handle header appearance
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));

    // Mobile Menu Toggle
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Animate toggle lines
            const lines = mobileToggle.querySelectorAll('.toggle-line');
            if (mobileToggle.classList.contains('active')) {
                // Animate to X
                if (lines[0]) lines[0].style.transform = 'translateY(10px) rotate(45deg)';
                if (lines[1]) lines[1].style.opacity = '0';
                if (lines[2]) lines[2].style.transform = 'translateY(-10px) rotate(-45deg)';
            } else {
                // Reset to hamburger
                if (lines[0]) lines[0].style.transform = 'translateY(0) rotate(0)';
                if (lines[1]) lines[1].style.opacity = '1';
                if (lines[2]) lines[2].style.transform = 'translateY(0) rotate(0)';
            }
        });
    }

    // Navigation Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('active');
                
                // Reset toggle lines
                const lines = mobileToggle.querySelectorAll('.toggle-line');
                if (lines[0]) lines[0].style.transform = 'translateY(0) rotate(0)';
                if (lines[1]) lines[1].style.opacity = '1';
                if (lines[2]) lines[2].style.transform = 'translateY(0) rotate(0)';
            }
            
            // Set active class
            navLinks.forEach(el => el.classList.remove('active'));
            link.classList.add('active');
            
            // Smooth scroll to target
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
            let start = 0;
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

    // Testimonials Carousel (if needed)
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

    // Hero Particles
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
});
