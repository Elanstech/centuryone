// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle active class on clicked item
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Smooth scroll for contact form link
    const contactFormLinks = document.querySelectorAll('a[href="#contact-form"]');
    
    contactFormLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const formSection = document.getElementById('contact-form');
            
            if (formSection) {
                const header = document.querySelector('.premium-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = formSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 50;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate info cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const infoCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        infoCardObserver.observe(card);
    });
    
    // Phone number click tracking (optional analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Phone number clicked:', link.href);
            // Add your analytics tracking here
            // Example: gtag('event', 'phone_click', { phone_number: link.href });
        });
    });
    
    // Email link click tracking (optional analytics)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Email link clicked:', link.href);
            // Add your analytics tracking here
            // Example: gtag('event', 'email_click', { email: link.href });
        });
    });
    
    // Map interaction enhancement
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        const iframe = mapContainer.querySelector('iframe');
        
        // Prevent scroll hijacking on mobile
        mapContainer.addEventListener('click', () => {
            if (iframe) {
                iframe.style.pointerEvents = 'auto';
            }
        });
        
        // Reset pointer events when clicking outside
        document.addEventListener('click', (e) => {
            if (iframe && !mapContainer.contains(e.target)) {
                iframe.style.pointerEvents = 'none';
            }
        });
    }
    
    // Form validation enhancement (if needed beyond Elfsight)
    const contactForm = document.querySelector('.elfsight-app-881b9b4f-5e51-4454-9b2a-9e7d6f33a0e9');
    if (contactForm) {
        // Monitor form submission
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Check for success message
                    const successMessage = contactForm.querySelector('.success-message');
                    if (successMessage) {
                        console.log('Form submitted successfully');
                        // Add your success tracking here
                        // Example: gtag('event', 'form_submission', { form_name: 'contact_form' });
                    }
                }
            });
        });
        
        observer.observe(contactForm, {
            childList: true,
            subtree: true
        });
    }
    
    // Emergency contact highlight on scroll
    const emergencyContact = document.querySelector('.emergency-contact');
    if (emergencyContact) {
        const emergencyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    emergencyContact.style.animation = 'pulse 2s ease-in-out';
                }
            });
        }, { threshold: 0.5 });
        
        emergencyObserver.observe(emergencyContact);
    }
    
    // Social links hover effect enhancement
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Info card icon rotation on hover
    const infoCardIcons = document.querySelectorAll('.info-card-icon');
    infoCardIcons.forEach(icon => {
        const card = icon.closest('.info-card');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(360deg)';
            icon.style.transition = 'transform 0.6s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0deg)';
        });
    });
    
    // Feature check animation
    const featureChecks = document.querySelectorAll('.feature-check');
    const checkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'checkPop 0.5s ease forwards';
            }
        });
    }, { threshold: 0.5 });
    
    featureChecks.forEach(check => {
        checkObserver.observe(check);
    });
    
    // Add CSS animation for check pop
    const style = document.createElement('style');
    style.textContent = `
        @keyframes checkPop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
    `;
    document.head.appendChild(style);
    
    // Lazy load map iframe
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const src = mapIframe.getAttribute('src');
                    if (src && !mapIframe.hasAttribute('data-loaded')) {
                        mapIframe.setAttribute('data-loaded', 'true');
                        console.log('Map loaded');
                    }
                    mapObserver.unobserve(mapIframe);
                }
            });
        }, { threshold: 0.1 });
        
        mapObserver.observe(mapIframe);
    }
    
    // Handle window resize for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset any inline styles that might cause issues
            const mapIframe = document.querySelector('.map-container iframe');
            if (mapIframe && window.innerWidth < 768) {
                mapIframe.style.height = '400px';
            } else if (mapIframe) {
                mapIframe.style.height = '500px';
            }
        }, 250);
    });
    
    // Add loading state for form
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper) {
        // Wait for Elfsight to load
        const checkElfsight = setInterval(() => {
            const elfsightWidget = formWrapper.querySelector('.elfsight-app-881b9b4f-5e51-4454-9b2a-9e7d6f33a0e9 > *');
            if (elfsightWidget) {
                formWrapper.classList.add('loaded');
                clearInterval(checkElfsight);
            }
        }, 100);
        
        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkElfsight), 10000);
    }
    
    console.log('Contact page scripts loaded successfully');
});
