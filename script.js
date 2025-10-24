// SVG Framework wordcloud interaction
$(document).ready(function() {
    // Check if the SVG element exists
    if ($('#tagi text').length > 0) {
        var
            words = $('#tagi text'),
            l = words.length,
            current = null,
            delay = 2500; // 2.5 second delay between highlights

        function clearBlink(o) {
            var
                ca = o.getAttribute('class').split(' '),
                i = ca.indexOf('blink');

            if (i !== -1) {
                ca.splice(i, 1);
                o.setAttribute('class', ca.join(' '));
            }
        }

        function addBlink(o) {
            var
                ca = o.getAttribute('class').split(' ');
            ca.push('blink');
            o.setAttribute('class', ca.join(' '));
        }

        function wordblink() {
            var e;

            if (current !== null) {
                clearBlink(words.eq(current)[0])
            }

            // Select a random word to highlight
            current = Math.floor(Math.random() * l);
            e = words.eq(current);
            addBlink(e[0]);

            setTimeout(wordblink, delay);
        }

        // Start the random highlighting
        wordblink();
    }
});

// Fallback vanilla JS in case jQuery is not available
document.addEventListener('DOMContentLoaded', function() {
    const svg = document.getElementById('tagi');
    if (svg) {
        // Set up the random highlighting if jQuery isn't available
        if (typeof $ === 'undefined') {
            const textElements = svg.querySelectorAll('text');
            if (textElements.length > 0) {
                let current = null;
                const delay = 2500; // 2.5 second delay between highlights

                function clearBlink(element) {
                    element.classList.remove('blink');
                }

                function addBlink(element) {
                    element.classList.add('blink');
                }

                function wordblink() {
                    if (current !== null) {
                        clearBlink(textElements[current]);
                    }

                    // Select a random word to highlight
                    current = Math.floor(Math.random() * textElements.length);
                    addBlink(textElements[current]);

                    setTimeout(wordblink, delay);
                }

                // Start the random highlighting
                wordblink();
            }
        }
    }
});