document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.innerHTML = body.classList.contains('dark-mode') ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

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