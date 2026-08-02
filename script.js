/* ==========================================================================
   DEVELOPER PORTFOLIO - SOUMYA RANJAN NAYAK
   PORTFOLIO JS INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Navigation Header ---
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    const handleScrollHeader = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Trigger once on load in case page is refreshed while scrolled


    // --- 2. Mobile Menu Navigation ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');

    const toggleMenu = () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        
        // Toggle icon between hamburger and close cross
        if (isOpen) {
            toggleIcon.className = 'fa-solid fa-xmark';
        } else {
            toggleIcon.className = 'fa-solid fa-bars-staggered';
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // --- 3. Dynamic Active Nav Link Highlights on Scroll ---
    const sections = document.querySelectorAll('section');

    const highlightActiveNav = () => {
        let scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // Offset for sticky navbar
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);
    highlightActiveNav(); // Trigger once on load


    // --- 4. Interactive Typewriter Animation (Hero Subtitle) ---
    const typewriterElement = document.getElementById('typewriter');
    const words = [".NET Developer", "Full Stack Developer", "C# Specialist", "API Builder"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const performTypewriterEffect = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Erase faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Type standard speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to next word
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(performTypewriterEffect, typingSpeed);
    };

    if (typewriterElement) {
        // Start typing effect with a small initial delay
        setTimeout(performTypewriterEffect, 1000);
    }


    // --- 5. Interactive Skills Filter Logic ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons and apply to current
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card animation states
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Trigger fade-in repaint
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });


    // --- 6. Simulated Contact Form & Animated Toast Notification ---
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastClose = document.getElementById('toast-close');
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalSubmitHtml = submitBtn.innerHTML;

    const showToast = () => {
        toast.classList.add('show');
        
        // Auto hide toast after 5 seconds
        setTimeout(() => {
            hideToast();
        }, 5000);
    };

    const hideToast = () => {
        toast.classList.remove('show');
    };

    toastClose.addEventListener('click', hideToast);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Visual loading feedback
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        // Simulate API post response time
        setTimeout(() => {
            // Successful response simulated
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalSubmitHtml;
            
            // Show successful message toast
            showToast();
            
            // Reset fields
            contactForm.reset();
        }, 1500);
    });
});
