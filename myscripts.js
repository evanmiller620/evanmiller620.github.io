document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    const colors = ['#4a90e2', '#50c878', '#ff6b6b', '#ffa500', '#9370db', '#20b2aa'];

    skillCards.forEach(card => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        card.style.setProperty('--card-color', randomColor);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme === 'enabled' || (savedTheme === null && prefersDarkScheme.matches)) {
        setTheme(true);
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        setTheme(!isDarkMode);
    });

    // Listen for changes in the OS theme preference
    prefersDarkScheme.addListener((e) => {
        if (localStorage.getItem('darkMode') === null) {
            setTheme(e.matches);
        }
    });
});