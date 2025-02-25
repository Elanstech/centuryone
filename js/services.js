// Century One Management - Services Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Service Navigation scroll and active state handling
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    const servicesSections = document.querySelectorAll('.service-detail-section, #specialized');
    
    // Function to set active navigation item based on scroll position
    const setActiveNavOnScroll = () => {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Set a buffer for better UX
        const scrollBuffer = 100;
        
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
                }
            }
        });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', setActiveNavOnScroll);
    
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
                const headerHeight = document.querySelector('.premium-header').offsetHeight;
                const navHeight = document.querySelector('.services-navigation').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight + 2; // +2px buffer
                
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
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active class on clicked item
            item.classList.toggle('active');
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Feature icons animation on scroll
    const featureItems = document.querySelectorAll('.feature-item');
    
    const animateFeatureIcons = () => {
        featureItems.forEach((item) => {
            const itemPosition = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if item is in viewport
            if (itemPosition.top < windowHeight * 0.85) {
                const icon = item.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(360deg)';
                    setTimeout(() => {
                        icon.style.transform = 'rotateY(0)';
                    }, 1000);
                }
            }
        });
    };
    
    // Add scroll event listener for feature icons animation
    window.addEventListener('scroll', animateFeatureIcons);
    
    // Trigger animation on page load
    setTimeout(animateFeatureIcons, 1000);
    
    // Initialize AOS animations if not already initialized
    if (typeof AOS !== 'undefined' && AOS) {
        AOS.refresh();
    }
    
    // Technology section parallax effect
    const techSection = document.querySelector('.technology-section');
    const techImage = document.querySelector('.tech-image');
    
    if (techSection && techImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const techSectionTop = techSection.offsetTop;
            const techSectionHeight = techSection.offsetHeight;
            
            // Check if tech section is in viewport
            if (
                scrollPosition > techSectionTop - window.innerHeight &&
                scrollPosition < techSectionTop + techSectionHeight
            ) {
                // Calculate parallax effect
                const parallaxOffset = (scrollPosition - (techSectionTop - window.innerHeight)) * 0.15;
                
                // Apply parallax effect
                techImage.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    }
    
    // Service images subtle animation on hover
    const serviceImages = document.querySelectorAll('.service-image');
    
    serviceImages.forEach((image) => {
        const imgElement = image.querySelector('img');
        const accentElement = image.querySelector('.image-accent');
        
        if (imgElement && accentElement) {
            image.addEventListener('mouseenter', () => {
                imgElement.style.transform = 'scale(1.02) translateY(-5px)';
                imgElement.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                
                accentElement.style.transform = 'scale(1.05)';
                accentElement.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            image.addEventListener('mouseleave', () => {
                imgElement.style.transform = 'scale(1) translateY(0)';
                accentElement.style.transform = 'scale(1)';
            });
        }
    });
});
