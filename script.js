// FIXED: Framework wordcloud with iterative collision resolution
document.addEventListener('DOMContentLoaded', function() {
    const wordcloud = document.getElementById('frameworks-wordcloud');
    if (!wordcloud) return;
    
    const words = Array.from(wordcloud.querySelectorAll('.word'));
    if (words.length === 0) return;
    
    const padding = 20; // Increased padding to prevent overlapping
    
    function positionWords() {
        // Reset all words
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
        const maxRadius = Math.min(containerWidth, containerHeight) * 0.4;
        
        // Sort words by size (largest first) to place larger words first
        const sortedWords = [...words].sort((a, b) => {
            a.style.visibility = 'hidden';
            b.style.visibility = 'hidden';
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            const aSize = aRect.width * aRect.height;
            const bSize = bRect.width * bRect.height;
            return bSize - aSize;
        });
        
        // Place all words in a central area with minimal overlap possibility
        sortedWords.forEach((word, index) => {
            // Ensure accurate measurements
            word.style.visibility = 'hidden';
            const rect = word.getBoundingClientRect();
            const wordWidth = rect.width;
            const wordHeight = rect.height;
            
            // Determine grid dimensions based on word count
            const gridSize = Math.ceil(Math.sqrt(words.length));
            // Calculate cell size to ensure words fit with padding
            const cellSize = Math.max(120, Math.min(180, Math.min(containerWidth, containerHeight) / gridSize));
            
            // Calculate grid position
            const col = index % gridSize;
            const row = Math.floor(index / gridSize);
            
            // Calculate position with centering
            let x = centerX + (col - (gridSize-1)/2) * cellSize;
            let y = centerY + (row - (gridSize-1)/2) * cellSize;
            
            // Add some randomization within the cell to make it look more natural
            const randX = (Math.random() - 0.5) * (cellSize - wordWidth - 20);
            const randY = (Math.random() - 0.5) * (cellSize - wordHeight - 20);
            
            x = x - wordWidth/2 + randX;
            y = y - wordHeight/2 + randY;
            
            // Ensure boundaries
            x = Math.max(10, Math.min(containerWidth - wordWidth - 10, x));
            y = Math.max(10, Math.min(containerHeight - wordHeight - 10, y));
            
            word.style.left = `${x}px`;
            word.style.top = `${y}px`;
            word.style.visibility = 'visible';
        });
        
        // Then resolve any remaining collisions iteratively 
        resolveCollisions();
    }
    
    // Function to resolve collisions iteratively
    function resolveCollisions() {
        const maxIterations = 10; // Limit iterations to prevent infinite loops
        
        for (let iter = 0; iter < maxIterations; iter++) {
            let anyCollision = false;
            
            for (let i = 0; i < words.length; i++) {
                const word1 = words[i];
                if (word1.style.visibility !== 'visible') continue;
                
                const rect1 = word1.getBoundingClientRect();
                const word1Left = parseFloat(word1.style.left) || 0;
                const word1Top = parseFloat(word1.style.top) || 0;
                
                for (let j = i + 1; j < words.length; j++) {
                    const word2 = words[j];
                    if (word2.style.visibility !== 'visible') continue;
                    
                    const rect2 = word2.getBoundingClientRect();
                    const word2Left = parseFloat(word2.style.left) || 0;
                    const word2Top = parseFloat(word2.style.top) || 0;
                    
                    // Check for collision
                    if (word1Left < word2Left + rect2.width + padding &&
                        word1Left + rect1.width + padding > word2Left &&
                        word1Top < word2Top + rect2.height + padding &&
                        word1Top + rect1.height + padding > word2Top) {
                        
                        // Calculate repulsion vector
                        const dx = (word1Left + rect1.width/2) - (word2Left + rect2.width/2);
                        const dy = (word1Top + rect1.height/2) - (word2Top + rect2.height/2);
                        
                        // Avoid division by zero
                        const distance = Math.max(0.1, Math.sqrt(dx*dx + dy*dy));
                        const force = 1.0; // Repulsion strength
                        
                        // Calculate normalized direction
                        const moveX = (dx / distance) * force * 10; // Scale factor
                        const moveY = (dy / distance) * force * 10;
                        
                        // Move both words apart (with limits to stay in container)
                        const newLeft1 = Math.max(5, Math.min(containerWidth - rect1.width - 5, word1Left + moveX/2));
                        const newTop1 = Math.max(5, Math.min(containerHeight - rect1.height - 5, word1Top + moveY/2));
                        const newLeft2 = Math.max(5, Math.min(containerWidth - rect2.width - 5, word2Left - moveX/2));
                        const newTop2 = Math.max(5, Math.min(containerHeight - rect2.height - 5, word2Top - moveY/2));
                        
                        word1.style.left = `${newLeft1}px`;
                        word1.style.top = `${newTop1}px`;
                        word2.style.left = `${newLeft2}px`;
                        word2.style.top = `${newTop2}px`;
                        
                        anyCollision = true;
                    }
                }
            }
            
            // If no collisions were found, we're done
            if (!anyCollision) break;
        }
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