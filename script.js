(function () {
    const coverPage = document.getElementById('coverPage');
    const letterPage = document.getElementById('letterPage');
    const openBtn = document.getElementById('openLetterBtn');
    const goBackBtn = document.getElementById('goBackBtn');
    const heartBtn = document.getElementById('heartBtn');
    const heartContainer = document.getElementById('heartContainer');

    function burstConfetti() {
        canvasConfetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            startVelocity: 20,
            colors: ['#ff7a9e', '#ffb347', '#ff4d6d', '#ffb7c5', '#ffd966']
        });
        canvasConfetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            startVelocity: 25,
            colors: ['#f2587c', '#ff99b5']
        });
        canvasConfetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            startVelocity: 25,
            colors: ['#ffae42', '#ff5e7e']
        });
    }

    function fireworkConfetti() {
        const duration = 800;
        const end = Date.now() + duration;
        const frame = () => {
            canvasConfetti({
                particleCount: 8,
                angle: 60,
                spread: 55,
                origin: { x: 0.2, y: 0.8 },
                startVelocity: 18,
                colors: ['#ff8c9e', '#ffb77c']
            });
            canvasConfetti({
                particleCount: 8,
                angle: 120,
                spread: 55,
                origin: { x: 0.8, y: 0.7 },
                startVelocity: 18,
                colors: ['#ff5e7e', '#ffbd87']
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
    }

    function megaCelebration() {
        burstConfetti();
        setTimeout(() => {
            canvasConfetti({
                particleCount: 300,
                spread: 100,
                origin: { y: 0.5 },
                startVelocity: 15,
                decay: 0.9,
                colors: ['#ff9a9e', '#fad0c4', '#fbc2eb', '#ffb6c1']
            });
        }, 150);
        setTimeout(() => {
            fireworkConfetti();
        }, 350);
        setTimeout(() => {
            canvasConfetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.3 },
                startVelocity: 12,
                gravity: 1.2
            });
        }, 600);
    }

    function createFloatingHeart() {
        const heartEl = document.createElement('div');
        heartEl.classList.add('floating-heart');
        const icons = ['🌸', '🌸', '💗', '🌸', '💕', '🌸', '✨', '🌸', '🌸', '🌸', '🌸', '💗', '🌸', '💕', '🌸', '✨', '🌸', '🌸',];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        heartEl.innerHTML = randomIcon;
        heartEl.style.fontSize = `${Math.random() * 22 + 18}px`;
        heartEl.style.left = `${Math.random() * 100}vw`;
        heartEl.style.animationDuration = `${Math.random() * 2 + 2.5}s`;
        heartEl.style.opacity = Math.random() * 0.6 + 0.5;
        const rotateStart = Math.random() * 40 - 20;
        heartEl.style.transform = `rotate(${rotateStart}deg)`;
        heartContainer.appendChild(heartEl);
        setTimeout(() => {
            if (heartEl && heartEl.remove) heartEl.remove();
        }, 4500);
    }


    function rainHearts(count = 14) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 70);
        }
        setTimeout(() => {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => createFloatingHeart(), i * 60);
            }
        }, 350);
    }

    function showCover() {
        coverPage.style.display = 'flex';
        letterPage.style.display = 'none';
    }

    function showLetter() {
        coverPage.style.display = 'none';
        letterPage.style.display = 'block';
        canvasConfetti({
            particleCount: 70,
            spread: 55,
            origin: { y: 0.7 },
            startVelocity: 12,
            colors: ['#ff99bb', '#ffd966', '#ffb3c6']
        });
    }

    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLetter();
            openBtn.style.transform = 'scale(0.97)';
            setTimeout(() => { if (openBtn) openBtn.style.transform = ''; }, 150);
        });
    }

    if (goBackBtn) {
        goBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showCover();
            goBackBtn.style.transform = 'scale(0.96)';
            setTimeout(() => { if (goBackBtn) goBackBtn.style.transform = ''; }, 150);
        });
    }

    if (heartBtn) {
        heartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            rainHearts(20);
            canvasConfetti({
                particleCount: 55,
                spread: 60,
                origin: { y: 0.7 },
                startVelocity: 10,
                colors: ['#ffb7c5', '#ff6f91', '#ff9eb5', '#ffc0d0']
            });
            heartBtn.style.transform = 'scale(0.96)';
            setTimeout(() => { if (heartBtn) heartBtn.style.transform = ''; }, 150);
        });
    }

    const cardElement = document.querySelector('.birthday-card');
    if (cardElement) {
        cardElement.addEventListener('dblclick', (e) => {
            if (letterPage.style.display === 'block') {
                e.stopPropagation();
                megaCelebration();
                rainHearts(24);
                canvasConfetti({
                    particleCount: 100,
                    spread: 85,
                    origin: { y: 0.5 },
                    startVelocity: 18,
                    colors: ['#ff5c8a', '#ffb347', '#ff7faa']
                });
            } else if (coverPage.style.display === 'flex') {
                for (let i = 0; i < 6; i++) {
                    setTimeout(() => createFloatingHeart(), i * 60);
                }
                canvasConfetti({
                    particleCount: 30,
                    spread: 45,
                    origin: { y: 0.7 },
                    startVelocity: 8,
                    colors: ['#ffa5be', '#ffcd94']
                });
            }
        });
    }

    function addSparklesOnCard() {
        const card = document.querySelector('.birthday-card');
        if (!card) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                const spark = document.createElement('div');
                spark.style.position = 'absolute';
                spark.style.width = '5px';
                spark.style.height = '5px';
                spark.style.backgroundColor = '#ffdf80';
                spark.style.borderRadius = '50%';
                spark.style.left = `${x}px`;
                spark.style.top = `${y}px`;
                spark.style.pointerEvents = 'none';
                spark.style.opacity = '0.7';
                spark.style.zIndex = '20';
                card.style.position = 'relative';
                card.appendChild(spark);
                setTimeout(() => spark.remove(), 600);
            }
        });
    }
    addSparklesOnCard();

    showCover();

    console.log("%c✨ Happy Birthday! ✨ Open the letter for a magical surprise! 💌", "color: #f05b7a; font-size: 14px; font-weight: bold;");

    window.addEventListener('load', () => {
        setTimeout(() => {
            canvasConfetti({
                particleCount: 40,
                spread: 40,
                origin: { y: 0.8 },
                startVelocity: 6,
                colors: ['#ffb7c5', '#ffd6e0']
            });
        }, 300);
    });
})();
