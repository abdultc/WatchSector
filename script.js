// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    mobileMenuButton.innerHTML = isMenuOpen ? '✕' : '☰';
    body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Add slide animation
    if (isMenuOpen) {
        navLinks.style.transform = 'translateX(0)';
        navLinks.style.opacity = '1';
    } else {
        navLinks.style.transform = 'translateX(100%)';
        navLinks.style.opacity = '0';
    }
}

// Toggle menu when button is clicked
mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu when pressing escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (isMenuOpen) {
                toggleMenu();
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add stagger effect for grid items
            if (entry.target.parentElement.classList.contains('services-grid')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
            }
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.2,
    rootMargin: '50px'
});

// Observe all cards and sections that should animate
document.querySelectorAll('.service-card, .stat-card, .feature-card, .dashboard-left, .dashboard-right, .person-image').forEach(element => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
});

// Header scroll effects
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let isScrollingDown = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add background and shadow when scrolling
    if (currentScrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
    
    // Determine scroll direction
    isScrollingDown = currentScrollY > lastScrollY;
    
    // Add class for scroll direction
    header.classList.toggle('scrolling-down', isScrollingDown);
    
    lastScrollY = currentScrollY;
});

// Parallax effect for hero section
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 1.5) / window.innerHeight;
    }
});

// Form submission handling with animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '✓ Message sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Show error message
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Initialize AOS (Animate on Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });
} 