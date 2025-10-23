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

// Framework wordcloud animation with physics-based repulsion to prevent overlaps
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (wordcloud) {
        const words = Array.from(wordcloud.querySelectorAll('.word'));
        let animationFrameId;
        
        // Initialize words with random positions
        function initializePositions() {
            // Set all words to visibility hidden first to measure their natural sizes
            words.forEach(word => {
                word.style.visibility = 'hidden';
                word.style.position = 'absolute';
            });
            
            // Wait for words to render with their natural sizes, then position them
            setTimeout(() => {
                const containerWidth = wordcloud.offsetWidth || 800;
                const containerHeight = wordcloud.offsetHeight || 350;
                
                words.forEach((word, index) => {
                    // Position randomly in the container, ensuring they're inside the bounds
                    const maxX = containerWidth - word.offsetWidth - 10;
                    const maxY = containerHeight - word.offsetHeight - 10;
                    
                    const left = Math.max(5, Math.random() * maxX);
                    const top = Math.max(5, Math.random() * maxY);
                    
                    word.style.left = `${left}px`;
                    word.style.top = `${top}px`;
                    word.style.visibility = 'visible';
                });
                
                // Start the physics simulation after positioning
                startPhysicsSimulation();
            }, 50);
        }
        
        // Physics simulation to separate overlapping words
        function startPhysicsSimulation() {
            function physicsStep() {
                const containerRect = wordcloud.getBoundingClientRect();
                const containerWidth = containerRect.width || 800;
                const containerHeight = containerRect.height || 350;
                
                // Calculate repulsion forces between overlapping words
                for (let i = 0; i < words.length; i++) {
                    const word1 = words[i];
                    if (word1.style.visibility !== 'visible') continue;
                    
                    const rect1 = word1.getBoundingClientRect();
                    const word1Pos = {
                        x: parseFloat(word1.style.left) || 0,
                        y: parseFloat(word1.style.top) || 0,
                        width: rect1.width,
                        height: rect1.height
                    };
                    
                    // Apply repulsion from other words
                    for (let j = i + 1; j < words.length; j++) {
                        const word2 = words[j];
                        if (word2.style.visibility !== 'visible') continue;
                        
                        const rect2 = word2.getBoundingClientRect();
                        const word2Pos = {
                            x: parseFloat(word2.style.left) || 0,
                            y: parseFloat(word2.style.top) || 0,
                            width: rect2.width,
                            height: rect2.height
                        };
                        
                        // Check for collision
                        if (rect1.left < rect2.right && rect1.right > rect2.left && 
                            rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                            
                            // Calculate the overlap and repulsion force
                            const dx = word2Pos.x - word1Pos.x;
                            const dy = word2Pos.y - word1Pos.y;
                            const distance = Math.max(0.1, Math.sqrt(dx * dx + dy * dy));
                            
                            // Normalize and apply repulsion force
                            const force = 2.0; // Repulsion strength
                            const moveX = (dx / distance) * force;
                            const moveY = (dy / distance) * force;
                            
                            // Move both words away from each other
                            let newLeft1 = word1Pos.x - moveX;
                            let newTop1 = word1Pos.y - moveY;
                            let newLeft2 = word2Pos.x + moveX;
                            let newTop2 = word2Pos.y + moveY;
                            
                            // Keep words within container bounds
                            newLeft1 = Math.max(0, Math.min(containerWidth - word1Pos.width - 5, newLeft1));
                            newTop1 = Math.max(0, Math.min(containerHeight - word1Pos.height - 5, newTop1));
                            newLeft2 = Math.max(0, Math.min(containerWidth - word2Pos.width - 5, newLeft2));
                            newTop2 = Math.max(0, Math.min(containerHeight - word2Pos.height - 5, newTop2));
                            
                            word1.style.left = `${newLeft1}px`;
                            word1.style.top = `${newTop1}px`;
                            word2.style.left = `${newLeft2}px`;
                            word2.style.top = `${newTop2}px`;
                        }
                    }
                    
                    // Apply boundary constraints to keep words inside the container
                    let currentLeft = parseFloat(word1.style.left) || 0;
                    let currentTop = parseFloat(word1.style.top) || 0;
                    
                    if (currentLeft < 5) currentLeft = 5;
                    if (currentTop < 5) currentTop = 5;
                    if (currentLeft > containerWidth - word1Pos.width - 5) {
                        currentLeft = containerWidth - word1Pos.width - 5;
                    }
                    if (currentTop > containerHeight - word1Pos.height - 5) {
                        currentTop = containerHeight - word1Pos.height - 5;
                    }
                    
                    if (currentLeft !== parseFloat(word1.style.left) || currentTop !== parseFloat(word1.style.top)) {
                        word1.style.left = `${currentLeft}px`;
                        word1.style.top = `${currentTop}px`;
                    }
                }
                
                // Continue the physics simulation
                animationFrameId = requestAnimationFrame(physicsStep);
            }
            
            // Start the simulation
            physicsStep();
        }
        
        // Add mouse enter/leave events for enhanced hover effect
        words.forEach(word => {
            word.addEventListener('mouseenter', function() {
                // Store original color to restore it later
                this.originalColor = this.style.color;
                
                // Random color changes on hover for more dynamic effect
                const colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#d35400', '#34495e', '#e67e22', '#8e44ad'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Enhance the hover effect
                this.style.color = randomColor;
                this.style.transform = 'scale(1.5) rotate(5deg)';
                this.style.zIndex = '100';
                
                // Pause physics simulation for this element to prevent movement during hover
                this.style.transition = 'transform 0.3s ease, color 0.2s ease';
            });
            
            word.addEventListener('mouseleave', function() {
                // Reset to original state
                this.style.transform = 'scale(1) rotate(0)';
                this.style.zIndex = '1';
                if (this.originalColor) {
                    this.style.color = this.originalColor;
                } else {
                    this.style.color = ''; // Let CSS handle the default
                }
                
                // Resume normal transition
                this.style.transition = 'transform 0.8s ease, color 0.3s ease, opacity 0.5s ease';
            });
        });
        
        // Initially position all words
        initializePositions();
        
        // Floating animation function that works with the physics simulation
        function animateWords() {
            // Only animate if the wordcloud still exists
            if (!document.getElementById('frameworks-wordcloud')) return;
            
            const wordsToAnimate = words.filter(() => Math.random() > 0.6); // Animate ~40% of words
            
            wordsToAnimate.forEach(word => {
                if (word.style.visibility !== 'visible' || word.matches(':hover')) return;
                
                // Get original position
                const originalLeft = parseFloat(word.style.left) || 0;
                const originalTop = parseFloat(word.style.top) || 0;
                
                // Random floating direction and distance (with limits to maintain spacing)
                const xMove = (Math.random() - 0.5) * 30; // Moderate movement
                const yMove = (Math.random() - 0.5) * 30;
                const rotation = (Math.random() - 0.5) * 10;
                
                // Apply the animation
                word.style.transition = 'transform 2s ease';
                word.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg)`;
                
                // Reset position after animation completes
                setTimeout(() => {
                    if (!word.matches(':hover')) { // Only reset if not currently hovered
                        word.style.transform = 'translate(0, 0) rotate(0)';
                    }
                }, 2000);
            });
        }
        
        // Initial animation after DOM loads
        setTimeout(animateWords, 2000);
        
        // Run the animation periodically
        const animationInterval = setInterval(animateWords, 4000);
        
        // Clean up animation frames when leaving the page
        window.addEventListener('beforeunload', function() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            clearInterval(animationInterval);
        });
        
        // Re-position words when window resizes
        window.addEventListener('resize', function() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            clearInterval(animationInterval);
            initializePositions();
        });
    }
});