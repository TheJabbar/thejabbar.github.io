// FIXED: Framework wordcloud with better clustering and collision detection
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (!wordcloud) return;
    
    const words = Array.from(wordcloud.querySelectorAll('.word'));
    if (words.length === 0) return;
    
    const placedWords = [];
    const padding = 12; // Reduced padding for tighter clustering
    
    function positionWords() {
        // Reset all words
        placedWords.length = 0;
        words.forEach(word => {
            word.style.visibility = 'hidden';
            word.style.position = 'absolute';
            word.style.left = '-9999px'; // Move off-screen initially
            word.style.top = '-9999px';
        });
        
        // Force reflow to ensure styles are applied
        void wordcloud.offsetWidth;
        
        const containerWidth = wordcloud.offsetWidth || 800;
        const containerHeight = wordcloud.offsetHeight || 350;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        
        // Calculate maximum radius to keep words clustered
        const maxRadius = Math.min(containerWidth, containerHeight) * 0.35; // Tighter cluster
        
        // Sort words by size (largest first) to place larger words first
        const sortedWords = [...words].sort((a, b) => {
            // Ensure dimensions are measured after styles are applied
            a.style.visibility = 'hidden';
            b.style.visibility = 'hidden';
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            const aSize = aRect.width * aRect.height;
            const bSize = bRect.width * bRect.height;
            return bSize - aSize;
        });
        
        sortedWords.forEach(word => {
            // Ensure accurate measurements
            word.style.visibility = 'hidden';
            const rect = word.getBoundingClientRect();
            const wordWidth = rect.width;
            const wordHeight = rect.height;
            let placed = false;
            
            // Try spiral placement within the defined max radius
            const maxAttempts = 1000; // Reasonable number of attempts
            const angleStep = 0.3; // Slightly larger steps
            const radiusStep = 1.5; // Smaller radius steps for denser packing
            
            for (let i = 0; i < maxAttempts && !placed; i++) {
                // Use a spiral pattern that stays within maxRadius
                const angle = i * angleStep;
                // Use a radius that stays within our maxRadius limit
                const radius = Math.min(maxRadius * 0.8, (i * radiusStep * 0.15));
                
                // Calculate position relative to center
                const x = centerX + Math.cos(angle) * radius - wordWidth / 2;
                const y = centerY + Math.sin(angle) * radius - wordHeight / 2;
                
                // Boundary checks to ensure word stays within container
                if (x < 5 || x + wordWidth + 5 > containerWidth || 
                    y < 5 || y + wordHeight + 5 > containerHeight) {
                    continue;
                }
                
                // Collision detection
                const hasCollision = placedWords.some(placed => {
                    return !(x + wordWidth < placed.left - padding ||
                             x > placed.right + padding ||
                             y + wordHeight < placed.top - padding ||
                             y > placed.bottom + padding);
                });
                
                if (!hasCollision) {
                    word.style.left = `${x}px`;
                    word.style.top = `${y}px`;
                    word.style.visibility = 'visible';
                    
                    placedWords.push({
                        left: x,
                        top: y,
                        right: x + wordWidth,
                        bottom: y + wordHeight
                    });
                    
                    placed = true;
                }
            }
            
            // If still not placed, try a tighter random clustering approach
            if (!placed) {
                // Try positions within a more centralized area
                for (let attempt = 0; attempt < 300 && !placed; attempt++) {
                    // Generate a position within a tighter radius
                    const angle = Math.random() * 2 * Math.PI;
                    const distance = Math.random() * maxRadius * 0.9; // Even tighter than max radius
                    
                    const x = centerX + Math.cos(angle) * distance - wordWidth / 2;
                    const y = centerY + Math.sin(angle) * distance - wordHeight / 2;
                    
                    // Boundary checks
                    if (x < 5 || x + wordWidth + 5 > containerWidth || 
                        y < 5 || y + wordHeight + 5 > containerHeight) {
                        continue;
                    }
                    
                    const hasCollision = placedWords.some(placed => {
                        return !(x + wordWidth < placed.left - padding ||
                                 x > placed.right + padding ||
                                 y + wordHeight < placed.top - padding ||
                                 y > placed.bottom + padding);
                    });
                    
                    if (!hasCollision) {
                        word.style.left = `${x}px`;
                        word.style.top = `${y}px`;
                        word.style.visibility = 'visible';
                        
                        placedWords.push({
                            left: x,
                            top: y,
                            right: x + wordWidth,
                            bottom: y + wordHeight
                        });
                        
                        placed = true;
                    }
                }
            }
            
            // As a last resort, place it in the central area anyway
            if (!placed) {
                console.warn(`Could not place word without collision: ${word.textContent}`);
                // Find an approximate open area near the center
                word.style.left = `${centerX - wordWidth / 2}px`;
                word.style.top = `${centerY - wordHeight / 2 + (placedWords.length * 15 % 50) - 25}px`;
                word.style.visibility = 'visible';
                placed = true; // Mark as placed to continue
                
                placedWords.push({
                    left: centerX - wordWidth / 2,
                    top: centerY - wordHeight / 2 + (placedWords.length * 15 % 50) - 25,
                    right: centerX + wordWidth / 2,
                    bottom: centerY + wordHeight / 2 + (placedWords.length * 15 % 50) - 25
                });
            }
        });
    }
    
    // Wait for images and fonts to load before positioning
    if (document.readyState === 'complete') {
        positionWords();
    } else {
        window.addEventListener('load', positionWords);
    }
    
    // Reposition on resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionWords, 300);
    });
    
    // Hover effects (apply only after positioning)
    setTimeout(() => {
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
    }, 100);
});