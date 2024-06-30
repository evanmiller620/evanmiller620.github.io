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

    // Animate skill charts on scroll
    const skillSection = document.getElementById('skills');
    const skillItems = document.querySelectorAll('.skill-item');

    const animateSkills = () => {
        skillItems.forEach(item => {
            const circle = item.querySelector('.circle');
            const percent = item.dataset.skill;
            circle.style.strokeDasharray = `${percent}, 100`;
        });
    };

    window.addEventListener('scroll', () => {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            animateSkills();
        }
    });
});