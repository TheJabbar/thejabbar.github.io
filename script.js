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

// Framework wordcloud animation with grid-based positioning to prevent overlaps
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (wordcloud) {
        const words = Array.from(wordcloud.querySelectorAll('.word'));
        
        // Grid-based positioning to ensure no overlaps
        function positionWords() {
            // Set all words to visibility hidden first to measure their natural sizes
            words.forEach(word => {
                word.style.visibility = 'hidden';
                word.style.position = 'absolute';
            });
            
            // Wait for words to render with their natural sizes, then position them
            setTimeout(() => {
                // Calculate container dimensions after it's rendered
                const containerWidth = wordcloud.offsetWidth || 800; // fallback value
                const containerHeight = wordcloud.offsetHeight || 350;
                
                // Calculate grid size based on number of words and their average size
                const cellSize = 120; // Base size for each cell
                const cols = Math.floor(containerWidth / cellSize);
                const rows = Math.floor(containerHeight / cellSize);
                const totalCells = cols * rows;
                
                // Create an array of available grid positions
                let availablePositions = [];
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        availablePositions.push({row, col});
                    }
                }
                
                // Shuffle the positions array to randomize placement
                for (let i = availablePositions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
                }
                
                // Position each word in a unique grid cell
                words.forEach((word, index) => {
                    if (index < availablePositions.length) {
                        const pos = availablePositions[index];
                        const left = (pos.col * cellSize) + (cellSize - word.offsetWidth) / 2;
                        const top = (pos.row * cellSize) + (cellSize - word.offsetHeight) / 2;
                        
                        // Add some random offset within the cell to make it look more natural
                        const randomOffsetX = (Math.random() - 0.5) * (cellSize - word.offsetWidth);
                        const randomOffsetY = (Math.random() - 0.5) * (cellSize - word.offsetHeight);
                        
                        word.style.left = `${Math.max(5, Math.min(containerWidth - word.offsetWidth - 5, left + randomOffsetX))}px`;
                        word.style.top = `${Math.max(5, Math.min(containerHeight - word.offsetHeight - 5, top + randomOffsetY))}px`;
                        word.style.visibility = 'visible';
                    } else {
                        // If we run out of grid cells, position randomly but ensure they're visible
                        const left = Math.random() * (containerWidth - word.offsetWidth - 20) + 10;
                        const top = Math.random() * (containerHeight - word.offsetHeight - 20) + 10;
                        word.style.left = `${left}px`;
                        word.style.top = `${top}px`;
                        word.style.visibility = 'visible';
                    }
                });
            }, 100);
        }
        
        // Initially position all words
        positionWords();
        
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
        
        // Floating animation function that respects spacing
        function animateWords() {
            // Only animate if the wordcloud still exists
            if (!document.getElementById('frameworks-wordcloud')) return;
            
            const wordsToAnimate = words.filter(() => Math.random() > 0.6); // Animate ~40% of words
            
            wordsToAnimate.forEach(word => {
                // Get original position
                const originalLeft = parseFloat(word.style.left) || 0;
                const originalTop = parseFloat(word.style.top) || 0;
                
                // Random floating direction and distance (with limits to prevent collisions)
                const xMove = (Math.random() - 0.5) * 25; // Reduced movement to maintain spacing
                const yMove = (Math.random() - 0.5) * 25;
                const rotation = (Math.random() - 0.5) * 8;
                
                // Apply the animation
                word.style.transition = 'transform 2s ease';
                word.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg)`;
                
                // Reset position after animation completes
                setTimeout(() => {
                    word.style.transform = 'translate(0, 0) rotate(0)';
                }, 2000);
            });
        }
        
        // Initial animation after DOM loads
        setTimeout(animateWords, 2000);
        
        // Run the animation periodically
        setInterval(animateWords, 4000);
        
        // Re-position words when window resizes
        window.addEventListener('resize', function() {
            setTimeout(positionWords, 300);
        });
    }
});