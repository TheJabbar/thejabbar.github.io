// FIXED: Framework wordcloud with balanced clustering and collision detection
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (!wordcloud) return;
    
    const words = Array.from(wordcloud.querySelectorAll('.word'));
    if (words.length === 0) return;
    
    const placedWords = [];
    const padding = 18; // Increased padding to prevent overlapping
    
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
        
        // Calculate a reasonable radius that balances clustering and spacing
        const maxRadius = Math.min(containerWidth, containerHeight) * 0.45; // Larger radius for better spacing
        
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
            
            // Try spiral placement with proper spacing
            const maxAttempts = 2000; // More attempts to find a good position
            const angleStep = 0.15; // Finer steps for better coverage
            const radiusStep = 1.2; // Small steps for dense placement
            
            for (let i = 0; i < maxAttempts && !placed; i++) {
                // Use a spiral pattern with sufficient spacing
                const angle = i * angleStep;
                // Calculate radius to stay within our maxRadius but allow for proper spacing
                const radius = Math.min(maxRadius * 0.9, i * radiusStep * 0.1);
                
                // Calculate position relative to center
                let x = centerX + Math.cos(angle) * radius - wordWidth / 2;
                let y = centerY + Math.sin(angle) * radius - wordHeight / 2;
                
                // Boundary checks to ensure word stays within container with margin
                if (x < 10 || x + wordWidth + 10 > containerWidth || 
                    y < 10 || y + wordHeight + 10 > containerHeight) {
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
            
            // If still not placed using spiral, try grid-based placement in the central area
            if (!placed) {
                // Use a grid-based approach within the central area
                const gridSize = 120; // Size of each grid cell
                const cols = Math.floor(containerWidth / gridSize);
                const rows = Math.floor(containerHeight / gridSize);
                
                for (let row = 0; row < rows && !placed; row++) {
                    for (let col = 0; col < cols && !placed; col++) {
                        // Calculate grid position
                        let x = col * gridSize + (gridSize - wordWidth) / 2;
                        let y = row * gridSize + (gridSize - wordHeight) / 2;
                        
                        // Center the grid around the center of the container
                        x = x - (cols * gridSize) / 2 + centerX;
                        y = y - (rows * gridSize) / 2 + centerY;
                        
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
            }
            
            // As a last resort, place it with minimum overlap
            if (!placed) {
                console.warn(`Could not place word without collision: ${word.textContent}`);
                // Place at a fixed position in the grid as a last resort
                const idx = placedWords.length;
                const x = centerX - 100 + (idx % 4) * 50;
                const y = centerY - 50 + Math.floor(idx / 4) * 40;
                
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