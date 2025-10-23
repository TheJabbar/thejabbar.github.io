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

// Framework wordcloud animation with enhanced floating effect and proper spacing
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (wordcloud) {
        const words = Array.from(wordcloud.querySelectorAll('.word'));
        const containerWidth = wordcloud.offsetWidth;
        const containerHeight = wordcloud.offsetHeight;
        
        // Function to check for collision between two words
        function checkCollision(word1, word2) {
            const rect1 = word1.getBoundingClientRect();
            const rect2 = word2.getBoundingClientRect();
            
            // Get positions relative to container
            const pos1 = {
                left: parseFloat(word1.style.left) || 0,
                top: parseFloat(word1.style.top) || 0,
                width: rect1.width,
                height: rect1.height
            };
            
            const pos2 = {
                left: parseFloat(word2.style.left) || 0,
                top: parseFloat(word2.style.top) || 0,
                width: rect2.width,
                height: rect2.height
            };
            
            // Check if rectangles overlap
            return pos1.left < pos2.left + pos2.width + 10 && 
                   pos1.left + pos1.width + 10 > pos2.left && 
                   pos1.top < pos2.top + pos2.height + 10 && 
                   pos1.top + pos1.height + 10 > pos2.top;
        }
        
        // Function to adjust positions to avoid collisions
        function adjustForCollisions() {
            for (let i = 0; i < words.length; i++) {
                for (let j = i + 1; j < words.length; j++) {
                    if (checkCollision(words[i], words[j])) {
                        // If collision detected, move one of the words
                        const xMove = (Math.random() - 0.5) * 50;
                        const yMove = (Math.random() - 0.5) * 50;
                        
                        let newLeft = parseFloat(words[j].style.left) + xMove;
                        let newTop = parseFloat(words[j].style.top) + yMove;
                        
                        // Make sure it stays within container bounds
                        newLeft = Math.max(10, Math.min(containerWidth - words[j].offsetWidth - 10, newLeft));
                        newTop = Math.max(10, Math.min(containerHeight - words[j].offsetHeight - 10, newTop));
                        
                        words[j].style.left = `${newLeft}px`;
                        words[j].style.top = `${newTop}px`;
                    }
                }
            }
        }
        
        // Position words with proper spacing using a grid-based approach
        function positionWords() {
            // First, let each word render to measure its size
            words.forEach(word => {
                word.style.visibility = 'hidden';
            });
            
            // Make them visible after a short delay so we can measure them
            setTimeout(() => {
                words.forEach(word => {
                    word.style.visibility = 'visible';
                    // Measure the word dimensions after it's rendered
                    const wordWidth = word.offsetWidth;
                    const wordHeight = word.offsetHeight;
                    
                    // Calculate safe positioning area (leaving margins)
                    const maxX = containerWidth - wordWidth - 20;
                    const maxY = containerHeight - wordHeight - 20;
                    
                    // Generate random position
                    let leftPos = Math.floor(Math.random() * maxX);
                    let topPos = Math.floor(Math.random() * maxY);
                    
                    // Try to find a position that doesn't collide with others
                    let attempts = 0;
                    while (attempts < 50) {
                        word.style.left = `${leftPos}px`;
                        word.style.top = `${topPos}px`;
                        
                        // Check for collisions with other words
                        let hasCollision = false;
                        for (let otherWord of words) {
                            if (otherWord !== word && checkCollision(word, otherWord)) {
                                hasCollision = true;
                                break;
                            }
                        }
                        
                        if (!hasCollision) {
                            break; // Found a good position
                        }
                        
                        // Try a new position
                        leftPos = Math.floor(Math.random() * maxX);
                        topPos = Math.floor(Math.random() * maxY);
                        attempts++;
                    }
                    
                    // Final position assignment
                    word.style.left = `${leftPos}px`;
                    word.style.top = `${topPos}px`;
                });
                
                // Adjust any remaining collisions
                adjustForCollisions();
            }, 50);
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
        
        // Enhanced floating animation function with collision awareness
        function animateWords() {
            words.forEach(word => {
                // Randomly select words to animate
                if (Math.random() > 0.7) { // Animate 30% of words at any time
                    // Random floating direction and distance
                    const xMove = (Math.random() - 0.5) * 40; // Increased movement range
                    const yMove = (Math.random() - 0.5) * 40;
                    const rotation = (Math.random() - 0.5) * 10;
                    
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
        setTimeout(animateWords, 1500);
        
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