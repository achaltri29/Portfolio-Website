// ─── DOM Elements ───
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const contactSubmitBtn = contactForm ? document.getElementById('contactSubmit') : null;
const themeToggle = document.getElementById('themeToggle');
const scrollToTopBtn = document.getElementById('scrollToTop');
const navbar = document.querySelector('.navbar');

// ─── Debounce Utility ───
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// ===================================================================
// 1. MOBILE HAMBURGER MENU
// ===================================================================
const closeMobileMenu = () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (navbar) {
            navbar.classList.remove('menu-open');
        }
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
};

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active', isActive);
        if (navbar) {
            navbar.classList.toggle('menu-open', isActive);
        }
        document.body.classList.toggle('menu-open', isActive);
        hamburger.setAttribute('aria-expanded', isActive);
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking outside links on the overlay backdrop
if (navMenu) {
    navMenu.addEventListener('click', (e) => {
        if (e.target === navMenu) {
            closeMobileMenu();
        }
    });
}

// Ensure mobile menu closes cleanly if screen resized to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ===================================================================
// 2. SMOOTH SCROLLING
// ===================================================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================================================
// 3. NAVBAR SCROLL BEHAVIOR (class-based, theme-aware)
// ===================================================================
const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// ===================================================================
// 4. INTERSECTION OBSERVER — Scroll Reveal Animations
// ===================================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve after revealing to avoid re-triggering
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    // Observe all elements with the .reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

// ===================================================================
// 5. HERO TYPING ANIMATION
// ===================================================================
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--accent)';

    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Remove cursor after typing completes
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, speed);
};

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent.trim();
        typeWriter(heroTitle, originalText, 60);
    }
});

// ===================================================================
// 6. SUBTLE PARALLAX ON HERO
// ===================================================================
const handleHeroParallax = () => {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        const rate = scrolled * 0.15;
        heroContent.style.transform = `translateY(${rate}px)`;
        heroContent.style.opacity = Math.max(1 - (scrolled / window.innerHeight) * 0.6, 0);
    }
};

// ===================================================================
// 7. EMAILJS CONTACT FORM
// ===================================================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

if (contactSubmitBtn && contactForm) {
    contactSubmitBtn.addEventListener('click', () => {
        // Verify EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('[ContactForm] EmailJS is not available');
            alert('EmailJS is not loaded. Check the <script> in <head>.');
            return;
        }

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const originalText = contactSubmitBtn.textContent;
        contactSubmitBtn.textContent = 'Sending...';
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.style.opacity = '0.7';

        const serviceID = 'service_1ybo6jr';
        const templateID = 'template_1cz10he';
        const templateParams = { name, email, subject, message };

        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, (error) => {
                console.error('[ContactForm] EmailJS FAILED', error);
                showNotification('Failed to send message. Please try again later.', 'error');
            })
            .finally(() => {
                contactSubmitBtn.textContent = originalText;
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.style.opacity = '';
            });
    });
}

// ===================================================================
// 8. NOTIFICATION SYSTEM
// ===================================================================
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Trigger slide-in animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            notification.classList.add('visible');
        });
    });

    // Auto-dismiss after 5 seconds
    const autoDismiss = setTimeout(() => {
        dismissNotification(notification);
    }, 5000);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoDismiss);
        dismissNotification(notification);
    });
};

const dismissNotification = (notification) => {
    notification.classList.remove('visible');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
};

// ===================================================================
// 9. HERO VISUAL
// ===================================================================


// ===================================================================
// 10. ACTIVE NAVIGATION HIGHLIGHTING
// ===================================================================
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// ===================================================================
// 11. THEME TOGGLE (dark default)
// ===================================================================
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
};

// Initialize theme on load
document.addEventListener('DOMContentLoaded', initTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ===================================================================
// 12. SCROLL TO TOP
// ===================================================================
const toggleScrollToTop = () => {
    if (!scrollToTopBtn) return;
    if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
};

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================================================
// 13. KEYBOARD SHORTCUTS
// ===================================================================
document.addEventListener('keydown', (e) => {
    // Escape closes mobile menu
    if (e.key === 'Escape' && hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Ctrl/Cmd + K toggles theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleTheme();
    }
});

// ===================================================================
// 14. FOCUS TRAP FOR MOBILE MENU
// ===================================================================
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const trapFocus = (element) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    if (focusableContent.length === 0) return;

    const firstFocusable = focusableContent[0];
    const lastFocusable = focusableContent[focusableContent.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
};

// Watch for mobile menu activation
if (navMenu) {
    const menuObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (navMenu.classList.contains('active')) {
                    trapFocus(navMenu);
                }
            }
        });
    });
    menuObserver.observe(navMenu, { attributes: true });
}

// ===================================================================
// 15. PERFORMANCE LOGGING
// ===================================================================
const logPerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`⚡ Page load time: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
                }
            }, 0);
        });
    }
};

logPerformance();

// ===================================================================
// UNIFIED SCROLL HANDLER
// ===================================================================
const handleScroll = debounce(() => {
    handleNavbarScroll();
    updateActiveNavLink();
    toggleScrollToTop();
}, 10);

// Non-debounced for smooth parallax
const handleScrollRaw = () => {
    handleHeroParallax();
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', handleScrollRaw, { passive: true });

// ===================================================================
// PAGE LOAD
// ===================================================================
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
});

// Console welcome message
console.log(`
🚀 Welcome to Achal Tripathi's Portfolio!
💻 Computer Science Student & Full-Stack Developer
📫 Contact: tripathiachal75@gmail.com
🔗 GitHub: https://github.com/achaltri29
`);
