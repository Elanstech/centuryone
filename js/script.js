/* ============================================================
   CENTURY ONE MANAGEMENT — COMPLETE JAVASCRIPT
   Original scripts + All new section scripts in one file
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       AOS ANIMATIONS INIT
    ============================================================ */
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });


    /* ============================================================
       PRELOADER
    ============================================================ */
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.loading-progress');

    if (preloader && progress) {
        let loadProgress = 0;
        const interval = setInterval(() => {
            loadProgress += Math.random() * 30;
            if (loadProgress > 100) {
                loadProgress = 100;
                clearInterval(interval);

                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    document.querySelectorAll('[data-aos]').forEach(el => {
                        el.classList.add('aos-animate');
                    });
                    playHeroVideo();
                }, 500);
            }
            progress.style.width = `${loadProgress}%`;
        }, 200);
    } else {
        playHeroVideo();
    }


    /* ============================================================
       HERO VIDEO
    ============================================================ */
    function playHeroVideo() {
        const heroVideo = document.querySelector('.hero-video');

        if (heroVideo) {
            heroVideo.muted = true;
            heroVideo.playsInline = true;
            heroVideo.setAttribute('playsinline', '');
            heroVideo.setAttribute('muted', '');

            heroVideo.play().catch(error => {
                console.log('Video play error:', error);
                document.addEventListener('touchstart', () => {
                    heroVideo.play().catch(e => console.log('Second play attempt failed:', e));
                }, { once: true });
            });

            heroVideo.addEventListener('ended', () => {
                heroVideo.currentTime = 0;
                heroVideo.play().catch(e => console.log('Loop play failed:', e));
            });
        }
    }


    /* ============================================================
       TENANT PORTAL LINKS
    ============================================================ */
    const tenantPortalLinks = document.querySelectorAll('.tenant-portal');
    tenantPortalLinks.forEach(link => {
        link.setAttribute('href', 'https://centuryone.app.doorloop.com');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
    });


    /* ============================================================
       HEADER & MOBILE MENU
    ============================================================ */
    const header = document.querySelector('.premium-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Remove any existing mobile buttons to avoid duplicates
    const existingMobileButtons = document.querySelector('.mobile-header-buttons');
    if (existingMobileButtons) {
        existingMobileButtons.remove();
    }

    // Create mobile header buttons
    if (mainNav) {
        const mobileHeaderButtons = document.createElement('div');
        mobileHeaderButtons.className = 'mobile-header-buttons';

        const tenantPortalBtn = document.createElement('a');
        tenantPortalBtn.href = 'https://centuryone.app.doorloop.com';
        tenantPortalBtn.target = '_blank';
        tenantPortalBtn.rel = 'noopener';
        tenantPortalBtn.className = 'portal-btn tenant-portal';
        tenantPortalBtn.innerHTML = '<i class="fas fa-user"></i><span>Tenant Portal</span>';

        const ctaBtn = document.createElement('a');
        ctaBtn.href = '#contact';
        ctaBtn.className = 'cta-btn';
        ctaBtn.innerHTML = '<span>Get Started</span><i class="fas fa-arrow-right"></i>';

        mobileHeaderButtons.appendChild(tenantPortalBtn);
        mobileHeaderButtons.appendChild(ctaBtn);
        mainNav.appendChild(mobileHeaderButtons);
    }

    // Toggle mobile menu
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('active');

            if (mainNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle && mobileToggle.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active') &&
            !mainNav.contains(e.target) &&
            mobileToggle && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Mobile buttons close menu on click
    const mobileButtons = document.querySelectorAll('.mobile-header-buttons a');
    mobileButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('dropdown-toggle')) {
                if (mobileToggle && mobileToggle.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
    });


    /* ============================================================
       HEADER SCROLL BEHAVIOR
    ============================================================ */
    let lastScroll = 0;
    let scrollTimer;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight - 200 : 0;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > heroHeight) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                if (mainNav && !mainNav.classList.contains('active')) {
                    header.classList.add('hidden');
                }
            }, 150);
        } else {
            clearTimeout(scrollTimer);
            header.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            if (mainNav && mainNav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.style.overflow = '';
            }
        }
        handleScroll();
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();


    /* ============================================================
       SMOOTH SCROLL FOR ALL ANCHOR LINKS
    ============================================================ */
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

    allAnchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                const target = document.querySelector(targetId);

                if (target) {
                    e.preventDefault();

                    // Set active nav class if it's a nav link
                    if (link.classList.contains('nav-link')) {
                        navLinks.forEach(el => el.classList.remove('active'));
                        link.classList.add('active');
                    }

                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    /* ============================================================
       STATS COUNTER ANIMATION
    ============================================================ */
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            if (isNaN(target)) return;

            const duration = 2000;
            let startTime = null;

            const step = timestamp => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
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

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    if (stats.length) {
        const statsSection = stats[0].closest('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }


    /* ============================================================
       TESTIMONIALS SLIDER
    ============================================================ */
    const setupTestimonials = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');

        if (!testimonialCards.length) return;

        let currentIndex = 0;

        const changeTestimonial = (index) => {
            if (index < 0) index = testimonialCards.length - 1;
            else if (index >= testimonialCards.length) index = 0;

            currentIndex = index;

            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });

            if (dots.length) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => changeTestimonial(currentIndex - 1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => changeTestimonial(currentIndex + 1));
        }

        if (dots.length) {
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => changeTestimonial(i));
            });
        }

        setInterval(() => changeTestimonial(currentIndex + 1), 5000);
    };

    setupTestimonials();


    /* ============================================================
       BACK TO TOP BUTTON
    ============================================================ */
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ============================================================
       SERVICE CARDS HOVER
    ============================================================ */
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.service-icon');
                if (icon) icon.style.transform = 'rotateY(360deg)';
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.service-icon');
                if (icon) icon.style.transform = 'rotateY(0deg)';
            });
        });
    }


    /* ============================================================
       PROPERTY FILTERS
    ============================================================ */
    const propertyFilters = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    if (propertyFilters.length && propertyCards.length) {
        propertyFilters.forEach(button => {
            button.addEventListener('click', () => {
                propertyFilters.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

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


    /* ============================================================
       ============================================================
       NEW SECTION SCRIPTS START HERE
       ============================================================
       ============================================================ */


    /* ============================================================
       FAQ ACCORDION
    ============================================================ */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all others
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.faq-question');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
            });
        }
    });

    // Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstBtn = faqItems[0].querySelector('.faq-question');
        if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    }


    /* ============================================================
       PROCESS STEPS — SEQUENTIAL REVEAL
    ============================================================ */
    const processSteps = document.querySelectorAll('.process-step');

    if (processSteps.length) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    const index = Array.from(processSteps).indexOf(step);

                    setTimeout(() => {
                        step.classList.add('step-visible');
                    }, index * 200);

                    processObserver.unobserve(step);
                }
            });
        }, { threshold: 0.3 });

        processSteps.forEach(step => processObserver.observe(step));
    }


    /* ============================================================
       TRUST STATS — COUNTER ANIMATION
    ============================================================ */
    const trustStats = document.querySelector('.trust-stats');
    let trustAnimated = false;

    if (trustStats) {
        const trustObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !trustAnimated) {
                    trustAnimated = true;
                    animateTrustStats();
                }
            });
        }, { threshold: 0.5 });

        trustObserver.observe(trustStats);
    }

    function animateTrustStats() {
        const statNumbers = document.querySelectorAll('.trust-stat-number');

        statNumbers.forEach(stat => {
            const text = stat.textContent.trim();
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const hasSlash = text.includes('/');

            // "24/7" — just show it
            if (hasSlash) {
                stat.style.opacity = '1';
                return;
            }

            const numericStr = text.replace(/[^0-9.]/g, '');
            const target = parseFloat(numericStr);

            if (isNaN(target)) {
                stat.style.opacity = '1';
                return;
            }

            const isDecimal = numericStr.includes('.');
            const duration = 2000;
            let startTime = null;

            stat.textContent = '0';

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const easing = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
                let current = target * easing;

                let display;
                if (isDecimal) {
                    display = current.toFixed(1);
                } else {
                    display = Math.floor(current).toLocaleString();
                }

                let suffix = '';
                if (hasPlus) suffix = '+';
                if (hasPercent) suffix = '%';

                stat.textContent = display + suffix;

                if (progress < duration) {
                    requestAnimationFrame(step);
                } else {
                    stat.textContent = text;
                }
            };

            requestAnimationFrame(step);
        });
    }


    /* ============================================================
       DYNAMIC COPYRIGHT YEAR
    ============================================================ */
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }


    /* ============================================================
       AREA CARDS — SUBTLE TILT ON HOVER
    ============================================================ */
    const areaCards = document.querySelectorAll('.area-card');

    areaCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });


    /* ============================================================
       BLOG CARDS — CLICK TO CONTACT (until blog is live)
    ============================================================ */
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            // When blog is live, update this to navigate to the article URL
            const contact = document.querySelector('#contact');
            if (contact) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = contact.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ============================================================
       CTA BANNER — PARALLAX SCROLL EFFECT
    ============================================================ */
    const ctaBanner = document.querySelector('.cta-banner-section');

    if (ctaBanner) {
        window.addEventListener('scroll', () => {
            const rect = ctaBanner.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
                const overlay = ctaBanner.querySelector('.cta-banner-overlay');

                if (overlay) {
                    overlay.style.transform = `translateY(${scrollPercent * 30}px)`;
                }
            }
        });
    }


    /* ============================================================
       ACTIVE NAV HIGHLIGHTING ON SCROLL
    ============================================================ */
    const sections = document.querySelectorAll('section[id]');
    const headerNavLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length && headerNavLinks.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    headerNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-30% 0px -70% 0px'
        });

        sections.forEach(section => sectionObserver.observe(section));
    }


}); // END DOMContentLoaded
