// FIXED: Framework wordcloud with more reliable collision detection
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (!wordcloud) return;
    
    const words = Array.from(wordcloud.querySelectorAll('.word'));
    if (words.length === 0) return;
    
    const placedWords = [];
    const padding = 15;
    
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
        
        // Sort words by size (largest first)
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
            
            // Try spiral placement
            const maxAttempts = 1500; // Increased attempts
            const angleStep = 0.2;
            const radiusStep = 2;
            
            for (let i = 0; i < maxAttempts && !placed; i++) {
                const angle = i * angleStep;
                const radius = i * radiusStep * 0.1;
                
                // Calculate position relative to center
                const x = centerX + Math.cos(angle) * radius - wordWidth / 2;
                const y = centerY + Math.sin(angle) * radius - wordHeight / 2;
                
                // Boundary checks
                if (x < 0 || x + wordWidth > containerWidth || 
                    y < 0 || y + wordHeight > containerHeight) {
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
            
            // If still not placed, try a different strategy
            if (!placed) {
                // Try random positions in less crowded areas
                for (let attempt = 0; attempt < 200 && !placed; attempt++) {
                    const x = Math.random() * (containerWidth - wordWidth - 10) + 5;
                    const y = Math.random() * (containerHeight - wordHeight - 10) + 5;
                    
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
            
            // As a last resort, place it anyway but mark it
            if (!placed) {
                console.warn(`Could not place word without collision: ${word.textContent}`);
                // Position in top-left as fallback
                word.style.left = '5px';
                word.style.top = `${5 + (placedWords.length * 25)}px`;
                word.style.visibility = 'visible';
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
                const colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12'];
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