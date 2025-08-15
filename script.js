// DOM Elements
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const skillCards = document.querySelectorAll('.skill-card');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('.contact-form');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillAnimations();
    initializeProjectAnimations();
    initializeContactForm();
    initializeParticleEffect();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(7px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Stagger animation for project cards
                if (entry.target.classList.contains('projects')) {
                    animateProjectCards();
                }
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe individual elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-card, .about-card');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Skill animations
function initializeSkillAnimations() {
    skillCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

function animateSkillBars() {
    skillProgressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200);
    });
}

// Project animations
function initializeProjectAnimations() {
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect
            const glowEffect = document.createElement('div');
            glowEffect.className = 'project-glow';
            glowEffect.style.cssText = `
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                border-radius: 25px;
                opacity: 0.3;
                filter: blur(20px);
                z-index: -1;
                pointer-events: none;
            `;
            card.appendChild(glowEffect);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            // Remove glow effect
            const glowEffect = card.querySelector('.project-glow');
            if (glowEffect) {
                glowEffect.remove();
            }
        });
    });
}

function animateProjectCards() {
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 150);
    });
}

// Contact form functionality
function initializeContactForm() {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add floating label effect
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.style.background = 'linear-gradient(135deg, #666 0%, #888 100%)';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--gradient-accent)';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Particle effect for hero section
function initializeParticleEffect() {
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    heroSection.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #00d4ff, transparent);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: floatParticle ${duration}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        // Create new particle
        createParticle(container);
    }, duration * 1000);
}

// Add particle animation keyframes
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for hero title
function initializeTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 100);
        }, index * 1000);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Parallax effect for floating shapes
function initializeParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize parallax effect
initializeParallaxEffect();

// Cursor trail effect
function initializeCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
}

// Initialize cursor trail on desktop only
if (window.innerWidth > 768) {
    initializeCursorTrail();
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16)); // ~60fps

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading class after animations complete
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body.loading * {
        animation-play-state: paused !important;
    }
    
    body.loaded .hero-title .title-line {
        animation-play-state: running;
    }
`;
document.head.appendChild(loadingStyles);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add rainbow effect to the entire page
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow keyframes
    const rainbowStyles = document.createElement('style');
    rainbowStyles.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyles);
    
    // Show easter egg message
    const message = document.createElement('div');
    message.textContent = '🎉 You found the easter egg! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-accent);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: bounce 1s infinite;
    `;
    document.body.appendChild(message);
    
    // Remove effects after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        message.remove();
        rainbowStyles.remove();
    }, 5000);
}

// Console message for developers
console.log(`
%c🚀 Welcome to Arian's Portfolio! 
%cBuilt with modern web technologies and lots of ☕
%cTry the Konami code for a surprise! ↑↑↓↓←→←→BA
`, 
'color: #00d4ff; font-size: 20px; font-weight: bold;',
'color: #b0b0b0; font-size: 14px;',
'color: #ff6b6b; font-size: 12px;'
);
