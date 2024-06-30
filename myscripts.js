
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    // Hide all sections except home
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.classList.add('hidden');
        }
    });

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            // Hide all sections
            sections.forEach(section => section.classList.add('hidden'));

            // Show the target section
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // Add a simple animation to project list items
    const projectItems = document.querySelectorAll('#projects li');
    projectItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.1)';
            item.style.transition = 'transform 0.3s';
        });

        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
        });
    });
});
