/* ============================================================
   CENTURY ONE MANAGEMENT — CONTACT PAGE JS
   Handles: Hero stat counters, FAQ accordion
   Dependencies: script.js (header, preloader, AOS, back-to-top)
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       HERO STAT COUNTERS
       Animates the .ct-stat-num elements when the hero scrolls
       into view. Reads target from data-count attribute.
    ============================================================ */
    const statNums = document.querySelectorAll('.ct-stat-num');
    let statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;
        statsAnimated = true;

        statNums.forEach(el => {
            const target = parseInt(el.dataset.count, 10);
            if (isNaN(target)) return;

            const duration = 2000;
            let startTime = null;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const pct = Math.min(progress / duration, 1);
                // Exponential ease-out
                const eased = pct === 1 ? 1 : 1 - Math.pow(2, -10 * pct);
                const current = Math.floor(target * eased);

                el.textContent = current.toLocaleString();

                if (progress < duration) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(step);
        });
    }

    if (statNums.length) {
        const heroSection = document.querySelector('.ct-hero');

        if (heroSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.disconnect();
                    }
                });
            }, { threshold: 0.4 });

            statsObserver.observe(heroSection);
        } else {
            // Fallback: animate immediately if hero isn't found
            animateCounters();
        }
    }


    /* ============================================================
       FAQ ACCORDION
       Toggles .active on .ct-faq-item, only one open at a time.
       Updates aria-expanded on the trigger button.
    ============================================================ */
    const faqItems = document.querySelectorAll('.ct-faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.ct-faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherTrigger = other.querySelector('.ct-faq-trigger');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            trigger.setAttribute('aria-expanded', String(!isActive));
        });
    });

    // Open the first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstTrigger = faqItems[0].querySelector('.ct-faq-trigger');
        if (firstTrigger) firstTrigger.setAttribute('aria-expanded', 'true');
    }


    /* ============================================================
       SMOOTH SCROLL FOR "GET STARTED" / ANCHOR LINKS
       Handles the #contact-form CTA button and any other
       in-page anchors specific to the contact page.
    ============================================================ */
    const contactAnchors = document.querySelectorAll('a[href="#contact-form"], .ct-faq-btn');

    contactAnchors.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const header = document.querySelector('.premium-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });


}); // END DOMContentLoaded
