/* main.js - Global Interactions */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once initially in case page loads scrolled down

  // --- Mobile Hamburger Menu ---
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerMenu && mobileNav) {
    const toggleMobileMenu = () => {
      const isActive = hamburgerMenu.classList.toggle('is-active');
      mobileNav.classList.toggle('is-active');
      
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    hamburgerMenu.addEventListener('click', toggleMobileMenu);

    // Close menu when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('is-active');
        mobileNav.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Intersection Observer for Scroll Animations ---
  const animateOnScroll = () => {
    const targets = document.querySelectorAll('.card, .step-card, .hero-content, .hero-visual, .section-header');
    
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    targets.forEach(target => {
      target.classList.add('reveal-element');
      observer.observe(target);
    });
  };

  // Run observer if supported
  if ('IntersectionObserver' in window) {
    animateOnScroll();
  } else {
    // Fallback for older browsers: show elements immediately
    const targets = document.querySelectorAll('.card, .step-card, .hero-content, .hero-visual, .section-header');
    targets.forEach(target => target.classList.add('is-visible'));
  }
});
