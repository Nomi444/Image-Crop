// ===================================
// Particles Animation for Hero Section
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particlesContainer');
    
    if (!particlesContainer) return;
    
    // Particle icons (related to image editing)
    const icons = [
        'fas fa-cut',
        'fas fa-crop',
        'fas fa-image',
        'fas fa-scissors',
        'fas fa-camera',
        'fas fa-paint-brush',
        'fas fa-palette',
        'fas fa-shapes',
        'far fa-images',
        'fas fa-magic'
    ];
    
    // Create floating particles
    function createParticle() {
        const particle = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        particle.className = `particle ${randomIcon}`;
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration (10-20 seconds)
        const duration = 10 + Math.random() * 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // Create 15 particles
    for (let i = 0; i < 15; i++) {
        createParticle();
    }
});