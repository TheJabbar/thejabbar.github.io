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

// Framework wordcloud with proper spacing to prevent overlaps
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (wordcloud) {
        const words = Array.from(wordcloud.querySelectorAll('.word'));
        
        // Position words with proper spacing using a more stable algorithm
        function positionWords() {
            // Set all words to visibility hidden first to measure their natural sizes
            words.forEach(word => {
                word.style.visibility = 'hidden';
                word.style.position = 'absolute';
            });
            
            // Wait for words to render with their natural sizes, then position them
            setTimeout(() => {
                const containerWidth = wordcloud.offsetWidth || 800;
                const containerHeight = wordcloud.offsetHeight || 350;
                
                // Create a grid of possible positions with adequate spacing
                const gridSize = 100; // Base size for spacing
                const cols = Math.ceil(containerWidth / gridSize);
                const rows = Math.ceil(containerHeight / gridSize);
                
                // Shuffle all possible grid positions
                const allPositions = [];
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        allPositions.push({row, col});
                    }
                }
                
                // Shuffle the positions array
                for (let i = allPositions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
                }
                
                // Position each word with collision avoidance
                for (let i = 0; i < words.length && i < allPositions.length; i++) {
                    const word = words[i];
                    const pos = allPositions[i];
                    
                    // Calculate position based on the grid position
                    const gridLeft = pos.col * gridSize;
                    const gridTop = pos.row * gridSize;
                    
                    // Center the word in its grid space
                    const wordWidth = word.offsetWidth;
                    const wordHeight = word.offsetHeight;
                    
                    // Calculate centered position within the grid cell
                    let left = gridLeft + (gridSize - wordWidth) / 2;
                    let top = gridTop + (gridSize - wordHeight) / 2;
                    
                    // Add small random offset to make it look less grid-aligned
                    const randomOffsetX = (Math.random() - 0.5) * 20;
                    const randomOffsetY = (Math.random() - 0.5) * 20;
                    
                    // Ensure the word stays within the container
                    left = Math.max(5, Math.min(containerWidth - wordWidth - 5, left + randomOffsetX));
                    top = Math.max(5, Math.min(containerHeight - wordHeight - 5, top + randomOffsetY));
                    
                    word.style.left = `${left}px`;
                    word.style.top = `${top}px`;
                    word.style.visibility = 'visible';
                }
                
                // For remaining words (if more words than grid positions), position with extra care
                for (let i = allPositions.length; i < words.length; i++) {
                    const word = words[i];
                    const wordWidth = word.offsetWidth;
                    const wordHeight = word.offsetHeight;
                    
                    // Find a position where this word doesn't overlap with existing ones
                    let newPosition = findNonOverlappingPosition(word, wordWidth, wordHeight, containerWidth, containerHeight);
                    if (newPosition) {
                        word.style.left = `${newPosition.x}px`;
                        word.style.top = `${newPosition.y}px`;
                        word.style.visibility = 'visible';
                    }
                }
            }, 50);
        }
        
        // Helper function to find a non-overlapping position for a word
        function findNonOverlappingPosition(word, wordWidth, wordHeight, containerWidth, containerHeight) {
            const attempts = 50;
            for (let i = 0; i < attempts; i++) {
                // Generate random position
                const x = Math.random() * (containerWidth - wordWidth - 10) + 5;
                const y = Math.random() * (containerHeight - wordHeight - 10) + 5;
                
                // Check if this position overlaps with any other visible word
                let hasOverlap = false;
                for (const otherWord of words) {
                    if (otherWord === word || otherWord.style.visibility !== 'visible') continue;
                    
                    const otherRect = otherWord.getBoundingClientRect();
                    const otherWordX = parseFloat(otherWord.style.left) || 0;
                    const otherWordY = parseFloat(otherWord.style.top) || 0;
                    const otherWidth = otherRect.width;
                    const otherHeight = otherRect.height;
                    
                    // Check for overlap
                    if (x < otherWordX + otherWidth + 10 && 
                        x + wordWidth + 10 > otherWordX && 
                        y < otherWordY + otherHeight + 10 && 
                        y + wordHeight + 10 > otherWordY) {
                        hasOverlap = true;
                        break;
                    }
                }
                
                if (!hasOverlap) {
                    return {x, y};
                }
            }
            
            // If no non-overlapping position found, use a default position
            return {
                x: Math.random() * (containerWidth - wordWidth - 10) + 5,
                y: Math.random() * (containerHeight - wordHeight - 10) + 5
            };
        }
        
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
                this.style.transition = 'transform 0.3s ease, color 0.2s ease';
            });
            
            word.addEventListener('mouseleave', function() {
                // Reset to original state
                this.style.transform = 'scale(1) rotate(0)';
                this.style.zIndex = '1';
                this.style.color = ''; // Let CSS handle the default
                this.style.transition = 'transform 0.8s ease, color 0.3s ease, opacity 0.5s ease';
            });
        });
        
        // Initially position all words
        positionWords();
        
        // Static floating animation function (less aggressive)
        function animateWords() {
            // Only animate if the wordcloud still exists
            if (!document.getElementById('frameworks-wordcloud')) return;
            
            const wordsToAnimate = words.filter(() => Math.random() > 0.7); // Animate 30% of words
            
            wordsToAnimate.forEach(word => {
                if (word.style.visibility !== 'visible' || word.matches(':hover')) return;
                
                // Gentle floating motion
                const xMove = (Math.random() - 0.5) * 15; // Reduced movement
                const yMove = (Math.random() - 0.5) * 15;
                const rotation = (Math.random() - 0.5) * 5;
                
                // Apply the animation
                word.style.transition = 'transform 3s ease';
                word.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg)`;
                
                // Reset position after animation completes
                setTimeout(() => {
                    if (!word.matches(':hover')) {
                        word.style.transform = 'translate(0, 0) rotate(0)';
                    }
                }, 3000);
            });
        }
        
        // Initial animation after DOM loads
        setTimeout(animateWords, 1500);
        
        // Run the animation periodically
        setInterval(animateWords, 3500);
        
        // Re-position words when window resizes
        window.addEventListener('resize', function() {
            setTimeout(positionWords, 300);
        });
    }
});