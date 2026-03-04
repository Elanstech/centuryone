/* =============================================
   CONTACT PAGE — REDESIGNED JS
   Century One Management
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- UTILITY ---------- */
    function debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    /* ---------- HERO STAT COUNTER ---------- */
    const counters = document.querySelectorAll('.hero-stat-num[data-count]');
    let counterStarted = false;

    const startCounters = () => {
        if (counterStarted) return;
        counterStarted = true;

        counters.forEach(el => {
            const target = parseInt(el.dataset.count, 10);
            if (isNaN(target)) return;

            const duration = 2000;
            let startTime = null;

            const tick = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                // Ease-out
                const eased = 1 - Math.pow(1 - percentage, 3);
                const current = Math.floor(target * eased);

                el.textContent = current;

                if (percentage < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target;
                }
            };

            requestAnimationFrame(tick);
        });
    };

    // Trigger counters when hero stats section is in view
    if (counters.length) {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const heroObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounters();
                        heroObserver.disconnect();
                    }
                });
            }, { threshold: 0.3 });

            heroObserver.observe(heroStats);
        }
    }


    /* ---------- FAQ ACCORDION ---------- */
    const faqItems = document.querySelectorAll('.faq-section .faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');

        if (!trigger || !panel) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all others
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherTrigger = other.querySelector('.faq-trigger');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (isOpen) {
                item.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });


    /* ---------- SCROLL-TRIGGERED FADE-IN ANIMATIONS ---------- */
    const animatedEls = document.querySelectorAll(
        '.detail-block, .form-card, .map-overlay-card, .faq-section .faq-item, .qc-item'
    );

    if (animatedEls.length) {
        // Set initial hidden state
        animatedEls.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1) ' + (i * 0.05) + 's, transform 0.6s cubic-bezier(0.4,0,0.2,1) ' + (i * 0.05) + 's';
        });

        const animObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Directly set inline styles to reveal — this overrides the inline hidden styles
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        animatedEls.forEach(el => animObserver.observe(el));
    }


    /* ---------- SMOOTH SCROLL TO FORM ---------- */
    document.querySelectorAll('a[href="#contact-form"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById('contact-form');
            if (!target) return;

            const headerH = document.querySelector('.premium-header');
            const offset = headerH ? headerH.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - offset - 30;

            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });


    /* ---------- MAP INTERACTION ---------- */
    const mapWrapper = document.querySelector('.map-wrapper');
    const mapIframe = mapWrapper ? mapWrapper.querySelector('iframe') : null;

    if (mapIframe && mapWrapper) {
        // Prevent accidental scroll-jacking — only enable pointer events on click
        mapIframe.style.pointerEvents = 'none';

        mapWrapper.addEventListener('click', () => {
            mapIframe.style.pointerEvents = 'auto';
        });

        document.addEventListener('click', e => {
            if (!mapWrapper.contains(e.target)) {
                mapIframe.style.pointerEvents = 'none';
            }
        });

        // Responsive map height
        const setMapHeight = () => {
            if (window.innerWidth < 768) {
                mapWrapper.style.height = '350px';
            } else {
                mapWrapper.style.height = '500px';
            }
        };

        setMapHeight();
        window.addEventListener('resize', debounce(setMapHeight, 200));
    }


    /* ---------- ANALYTICS HOOKS ---------- */
    // Phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'phone_click', { phone_number: link.href });
            }
        });
    });

    // Email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'email_click', { email: link.href });
            }
        });
    });


    /* ---------- ELFSIGHT FORM MONITOR ---------- */
    const elfsightEl = document.querySelector('.elfsight-app-881b9b4f-5e51-4454-9b2a-9e7d6f33a0e9');

    if (elfsightEl) {
        const formObserver = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.type === 'childList') {
                    const success = elfsightEl.querySelector('.success-message, [class*="success"]');
                    if (success) {
                        if (typeof gtag === 'function') {
                            gtag('event', 'form_submission', { form_name: 'contact_form' });
                        }
                    }
                }
            }
        });

        formObserver.observe(elfsightEl, { childList: true, subtree: true });
    }


    console.log('Contact page scripts loaded');
});    if (counters.length) {
        const heroObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    heroObserver.disconnect();
                }
            });
        }, { threshold: 0.4 });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) heroObserver.observe(heroStats);
    }

    /* ---------- FAQ ACCORDION ---------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');

        if (!trigger || !panel) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all others
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherTrigger = other.querySelector('.faq-trigger');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            item.classList.toggle('active', !isOpen);
            trigger.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    /* ---------- SCROLL-TRIGGERED ANIMATIONS ---------- */
    const animatedEls = document.querySelectorAll(
        '.detail-block, .form-card, .map-overlay-card, .faq-item, .qc-item'
    );

    if (animatedEls.length) {
        const animObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        animatedEls.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.05}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.05}s`;
            animObserver.observe(el);
        });
    }

    /* ---------- SMOOTH SCROLL TO FORM ---------- */
    document.querySelectorAll('a[href="#contact-form"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById('contact-form');
            if (!target) return;

            const headerH = document.querySelector('.premium-header')?.offsetHeight || 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 30;

            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    /* ---------- MAP INTERACTION ---------- */
    const mapWrapper = document.querySelector('.map-wrapper');
    const mapIframe = mapWrapper?.querySelector('iframe');

    if (mapIframe) {
        // Prevent accidental scroll-jacking — only enable pointer events on click
        mapIframe.style.pointerEvents = 'none';

        mapWrapper.addEventListener('click', () => {
            mapIframe.style.pointerEvents = 'auto';
        });

        document.addEventListener('click', e => {
            if (!mapWrapper.contains(e.target)) {
                mapIframe.style.pointerEvents = 'none';
            }
        });

        // Responsive map height
        const setMapHeight = () => {
            mapWrapper.style.height = window.innerWidth < 768 ? '350px' : '500px';
        };

        setMapHeight();
        window.addEventListener('resize', debounce(setMapHeight, 200));
    }

    /* ---------- ANALYTICS HOOKS ---------- */
    // Phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'phone_click', { phone_number: link.href });
            }
        });
    });

    // Email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'email_click', { email: link.href });
            }
        });
    });

    /* ---------- ELFSIGHT FORM MONITOR ---------- */
    const elfsightEl = document.querySelector('.elfsight-app-881b9b4f-5e51-4454-9b2a-9e7d6f33a0e9');

    if (elfsightEl) {
        const formObserver = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.type === 'childList') {
                    const success = elfsightEl.querySelector('.success-message, [class*="success"]');
                    if (success) {
                        if (typeof gtag === 'function') {
                            gtag('event', 'form_submission', { form_name: 'contact_form' });
                        }
                    }
                }
            }
        });

        formObserver.observe(elfsightEl, { childList: true, subtree: true });
    }

    /* ---------- UTILITY ---------- */
    function debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    console.log('Contact page scripts loaded');
});
