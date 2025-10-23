// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header height
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Reset the form
        contactForm.reset();
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.padding = '1rem 0';
        }
    }
});

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
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

// Back to top button functionality (optional enhancement)
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.title = 'Back to Top';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Framework wordcloud animation with enhanced floating effect
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (wordcloud) {
        const words = wordcloud.querySelectorAll('.word');
        const containerWidth = wordcloud.offsetWidth;
        const containerHeight = wordcloud.offsetHeight;
        
        // Position words randomly in the container
        function positionWords() {
            words.forEach(word => {
                // Random position within the container
                const maxWidth = containerWidth - 120; // account for word width
                const maxHeight = containerHeight - 40; // account for word height
                
                const leftPos = Math.floor(Math.random() * maxWidth);
                const topPos = Math.floor(Math.random() * maxHeight);
                
                word.style.left = `${leftPos}px`;
                word.style.top = `${topPos}px`;
            });
        }
        
        // Initially position all words
        setTimeout(positionWords, 100);
        
        // Add mouse enter/leave events for enhanced hover effect
        words.forEach(word => {
            word.addEventListener('mouseenter', function() {
                // Random color changes on hover for more dynamic effect
                const colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#d35400', '#34495e', '#e67e22', '#8e44ad'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Enhance the hover effect
                this.style.color = randomColor;
                this.style.transform = 'scale(1.5) rotate(5deg)';
                this.style.zIndex = '100';
            });
            
            word.addEventListener('mouseleave', function() {
                // Reset to original state
                this.style.transform = 'scale(1) rotate(0)';
                this.style.zIndex = '1';
                this.style.color = ''; // Let CSS handle the default
            });
        });
        
        // Enhanced floating animation function
        function animateWords() {
            words.forEach(word => {
                // Randomly select words to animate
                if (Math.random() > 0.7) { // Animate 30% of words at any time
                    // Random floating direction and distance
                    const xMove = (Math.random() - 0.5) * 30; // Increased movement range
                    const yMove = (Math.random() - 0.5) * 30;
                    const rotation = (Math.random() - 0.5) * 10;
                    
                    // Save original position
                    const originalLeft = parseFloat(word.style.left);
                    const originalTop = parseFloat(word.style.top);
                    
                    // Apply the animation
                    word.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg)`;
                    
                    // Reset position after animation completes
                    setTimeout(() => {
                        word.style.transform = 'translate(0, 0) rotate(0)';
                    }, 2000);
                }
            });
        }
        
        // Initial animation after DOM loads
        setTimeout(animateWords, 1000);
        
        // Run the animation periodically
        setInterval(animateWords, 3000);
        
        // Re-position words when window resizes
        window.addEventListener('resize', function() {
            const newContainerWidth = wordcloud.offsetWidth;
            const newContainerHeight = wordcloud.offsetHeight;
            
            // Update the container dimensions
            setTimeout(positionWords, 300);
        });
    }
});