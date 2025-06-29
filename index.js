// Personalize Message
function personalizeMessage() {
    const name = document.getElementById("nameInput").value.trim() || "Friend";
    document.getElementById("birthday-title").innerText = `🎉 Happy Birthday, ${name}! 🎊`;
    startConfetti();
}

// Balloon Functions
function addBalloons() {
    const container = document.getElementById('balloon-container');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const balloonCount = window.innerWidth < 768 ? 15 : 30;
    
    // Clear existing balloons
    container.innerHTML = '';
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Random properties
        const size = Math.random() * 30 + 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = Math.random() * 3 + 4;
        
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.25}px`;
        balloon.style.backgroundColor = color;
        balloon.style.left = `${left}%`;
        balloon.style.animationDelay = `${delay}s`;
        balloon.style.animationDuration = `${duration}s`;
        
        // Balloon tail
        const tail = document.createElement('div');
        tail.className = 'balloon-tail';
        balloon.appendChild(tail);
        
        // Make balloons clickable
        balloon.addEventListener('click', function() {
            this.style.animation = 'pop 0.5s forwards';
            setTimeout(() => this.remove(), 500);
        });
        
        container.appendChild(balloon);
    }
}

// Auto-sliding Cards
let currentCard = 0;
let slideInterval;
let isSliderPaused = false;

function startSlider() {
    const cards = document.querySelectorAll('.card');
    const cardSlider = document.querySelector('.cards-slider');
    const totalCards = cards.length;
    
    // Set initial position
    updateSliderPosition();
    
    // Start auto-sliding
    slideInterval = setInterval(() => {
        if (!isSliderPaused) {
            currentCard = (currentCard + 1) % totalCards;
            updateSliderPosition();
        }
    }, 3000);
    
    // Pause on hover/touch
    cardSlider.addEventListener('mouseenter', () => isSliderPaused = true);
    cardSlider.addEventListener('mouseleave', () => isSliderPaused = false);
    
    // Handle touch events for mobile
    cardSlider.addEventListener('touchstart', () => isSliderPaused = true);
    cardSlider.addEventListener('touchend', () => {
        setTimeout(() => isSliderPaused = false, 5000);
    });
}

function updateSliderPosition() {
    const cards = document.querySelectorAll('.card');
    const cardSlider = document.querySelector('.cards-slider');
    const cardWidth = cards[0].offsetWidth + 20; // Include margin
    
    cardSlider.style.transform = `translateX(-${currentCard * cardWidth}px)`;
}

// Confetti Effect
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiPieces = [];
    const confettiCount = window.innerWidth < 768 ? 100 : 200;
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 2 + 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5,
            shape: Math.random() > 0.5 ? 'circle' : 'rect'
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(confetto => {
            ctx.save();
            ctx.translate(confetto.x, confetto.y);
            ctx.rotate(confetto.rotation * Math.PI / 180);
            ctx.fillStyle = confetto.color;
            
            if (confetto.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, confetto.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-confetto.size / 2, -confetto.size / 2, confetto.size, confetto.size);
            }
            
            ctx.restore();
            
            confetto.y += confetto.speed;
            confetto.rotation += confetto.rotationSpeed;
            
            if (confetto.y > canvas.height) {
                confetto.y = Math.random() * -20;
                confetto.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
    
    // Stop confetti after 3 seconds
    setTimeout(() => {
        const confettiCanvas = document.getElementById('confetti');
        const ctx = confettiCanvas.getContext('2d');
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 3000);
}

// Music Player
const birthdayMusic = document.getElementById('birthdayMusic');
let isMusicPlaying = false;

function toggleMusic() {
    if (isMusicPlaying) {
        birthdayMusic.pause();
    } else {
        birthdayMusic.play()
            .catch(e => console.log("Audio play failed:", e));
    }
    isMusicPlaying = !isMusicPlaying;
    
    const musicButton = document.querySelector('.controls button:nth-child(2)');
    musicButton.innerHTML = isMusicPlaying ? 
        '<i class="fas fa-music"></i> Stop Music' : 
        '<i class="fas fa-music"></i> Play Music';
}

// Initialize on load
window.onload = function() {
    addBalloons();
    startSlider();
    setTimeout(startConfetti, 1000);
    
    // Handle mobile touch events
    document.addEventListener('touchstart', function() {}, {passive: true});
};