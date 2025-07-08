
// Menu Icon Functionality
    document.addEventListener('DOMContentLoaded', () => {
      const menuIcon = document.getElementById('menu-icon');
      const navMenu = document.getElementById('nav-menu');
      
      // Toggle menu on icon click
      menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      });
      
      // Close menu when clicking on links
      const navLinks = document.querySelectorAll('#nav-menu a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          menuIcon.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const thankYouMsg = document.getElementById('thankYouMsg');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      thankYouMsg.style.display = 'block';
      contactForm.reset();
      
      setTimeout(() => {
        thankYouMsg.style.display = 'none';
      }, 5000);
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopbtn');

    window.onscroll = function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    };

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dark mode toggle
    const toggleBtn = document.getElementById('toggleMode');
    const isDark = localStorage.getItem('theme') === 'dark';

    if (isDark) {
      document.body.classList.add('dark-theme');
      toggleBtn.textContent = '🌞';
    }

    toggleBtn.addEventListener('click', () => {
      const darkEnabled = document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', darkEnabled ? 'dark' : 'light');
      toggleBtn.textContent = darkEnabled ? '🌞' : '🌙';
    });

    // Skill animation on scroll
    const skills = document.querySelectorAll('.skill');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    skills.forEach(skill => {
      observer.observe(skill);
    });
function updateScrollPadding() {
      const header = document.querySelector('header');
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      
      if (window.innerWidth <= 768) {
        document.documentElement.style.setProperty('--mobile-header-height', `${headerHeight}px`);
      }
    }    
    window.addEventListener('load', updateScrollPadding);
    window.addEventListener('resize', updateScrollPadding);
    
    // Navigation click handler
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        // Prevent default only for same-page anchors
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Calculate exact scroll position
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });