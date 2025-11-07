document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switcher Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeOptions = document.querySelector('.theme-options');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        localStorage.setItem('selectedTheme', theme); // Save theme to local storage
    };

    // Toggle the theme options popup
    themeToggleBtn.addEventListener('click', () => {
        themeOptions.classList.toggle('show');
        themeToggleBtn.classList.toggle('active');
    });

    // Handle theme selection
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.dataset.theme;
            applyTheme(selectedTheme);
            themeOptions.classList.remove('show');
            themeToggleBtn.classList.remove('active');
        });
    });

    // Load saved theme from local storage on page load
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('blush'); // Default theme
    }


    // --- Scroll-triggered Animations ---
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Mouse Sparkle Effect ---
    const sparkleContainer = document.getElementById('sparkle-container');
    if (sparkleContainer) {
        document.addEventListener('mousemove', (e) => {
            // Create a new sparkle element as a Font Awesome icon
            const sparkle = document.createElement('i');
            sparkle.classList.add('fas', 'fa-heart', 'sparkle');

            // Position the sparkle at the cursor's location
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;

            // Add random movement to the animation
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            sparkle.style.setProperty('--x', `${randomX}px`);
            sparkle.style.setProperty('--y', `${randomY}px`);

            // Append and then remove the sparkle
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => {
                sparkle.remove();
            }, 1000); // Corresponds to the animation duration
        });
    }

});