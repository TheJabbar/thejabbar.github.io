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
                top: targetElement.offsetTop - 70,
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
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
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

// Back to top button functionality
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

document.addEventListener('DOMContentLoaded', createBackToTopButton);

// FIXED: Framework wordcloud with proper collision detection
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (!wordcloud) return;
    
    const words = Array.from(wordcloud.querySelectorAll('.word'));
    const placedWords = []; // Track successfully placed words
    const padding = 15; // Minimum space between words
    
    function positionWords() {
        // Clear previous positions
        placedWords.length = 0;
        
        // Make all words invisible while positioning
        words.forEach(word => {
            word.style.visibility = 'hidden';
            word.style.position = 'absolute';
        });
        
        // Wait for layout to settle
        requestAnimationFrame(() => {
            const containerWidth = wordcloud.offsetWidth || 800;
            const containerHeight = wordcloud.offsetHeight || 350;
            const centerX = containerWidth / 2;
            const centerY = containerHeight / 2;
            
            // Sort words by size (larger words placed first for better packing)
            const sortedWords = [...words].sort((a, b) => {
                const aSize = a.offsetWidth * a.offsetHeight;
                const bSize = b.offsetWidth * b.offsetHeight;
                return bSize - aSize;
            });
            
            sortedWords.forEach(word => {
                const wordWidth = word.offsetWidth;
                const wordHeight = word.offsetHeight;
                let placed = false;
                
                // Try spiral placement starting from center
                const maxAttempts = 1000;
                const angleStep = 0.5;
                const radiusStep = 3;
                
                for (let i = 0; i < maxAttempts && !placed; i++) {
                    const angle = i * angleStep;
                    const radius = i * radiusStep * 0.1;
                    
                    const x = centerX + Math.cos(angle) * radius - wordWidth / 2;
                    const y = centerY + Math.sin(angle) * radius - wordHeight / 2;
                    
                    // Check boundaries
                    if (x < 5 || x + wordWidth > containerWidth - 5 ||
                        y < 5 || y + wordHeight > containerHeight - 5) {
                        continue;
                    }
                    
                    // Check collision with placed words
                    const hasCollision = placedWords.some(placed => {
                        return !(x > placed.right + padding ||
                                x + wordWidth < placed.left - padding ||
                                y > placed.bottom + padding ||
                                y + wordHeight < placed.top - padding);
                    });
                    
                    if (!hasCollision) {
                        // Place the word
                        word.style.left = `${x}px`;
                        word.style.top = `${y}px`;
                        word.style.visibility = 'visible';
                        
                        // Record placement
                        placedWords.push({
                            element: word,
                            left: x,
                            top: y,
                            right: x + wordWidth,
                            bottom: y + wordHeight,
                            width: wordWidth,
                            height: wordHeight
                        });
                        
                        placed = true;
                    }
                }
                
                // Fallback: if still not placed, try random positions
                if (!placed) {
                    for (let attempt = 0; attempt < 100; attempt++) {
                        const x = Math.random() * (containerWidth - wordWidth - 10) + 5;
                        const y = Math.random() * (containerHeight - wordHeight - 10) + 5;
                        
                        const hasCollision = placedWords.some(placed => {
                            return !(x > placed.right + padding ||
                                    x + wordWidth < placed.left - padding ||
                                    y > placed.bottom + padding ||
                                    y + wordHeight < placed.top - padding);
                        });
                        
                        if (!hasCollision) {
                            word.style.left = `${x}px`;
                            word.style.top = `${y}px`;
                            word.style.visibility = 'visible';
                            
                            placedWords.push({
                                element: word,
                                left: x,
                                top: y,
                                right: x + wordWidth,
                                bottom: y + wordHeight,
                                width: wordWidth,
                                height: wordHeight
                            });
                            break;
                        }
                    }
                }
            });
        });
    }
    
    // Enhanced hover effects
    words.forEach(word => {
        word.addEventListener('mouseenter', function() {
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#d35400', '#34495e', '#e67e22', '#8e44ad'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            this.style.color = randomColor;
            this.style.transform = 'scale(1.5) rotate(5deg)';
            this.style.zIndex = '100';
            this.style.transition = 'transform 0.3s ease, color 0.2s ease';
        });
        
        word.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
            this.style.zIndex = '1';
            this.style.color = '';
            this.style.transition = 'transform 0.8s ease, color 0.3s ease';
        });
    });
    
    // Initial positioning
    positionWords();
    
    // Gentle floating animation
    function animateWords() {
        if (!document.getElementById('frameworks-wordcloud')) return;
        
        const wordsToAnimate = words.filter(() => Math.random() > 0.7);
        
        wordsToAnimate.forEach(word => {
            if (word.style.visibility !== 'visible' || word.matches(':hover')) return;
            
            const xMove = (Math.random() - 0.5) * 15;
            const yMove = (Math.random() - 0.5) * 15;
            const rotation = (Math.random() - 0.5) * 5;
            
            word.style.transition = 'transform 3s ease';
            word.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg)`;
            
            setTimeout(() => {
                if (!word.matches(':hover')) {
                    word.style.transform = 'translate(0, 0) rotate(0)';
                }
            }, 3000);
        });
    }
    
    setTimeout(animateWords, 1500);
    setInterval(animateWords, 3500);
    
    // Reposition on window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionWords, 300);
    });
});