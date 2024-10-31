let score = 0;

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("backToHome").addEventListener("click", backToHome);

function startGame() {
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("startGame").classList.add("d-none");
    document.getElementById("backToHome").classList.remove("d-none");
    document.getElementById("instructions").classList.add("d-none"); // Oculta las instrucciones al iniciar el juego

    for (let i = 0; i < 100; i++) {
        createTank();
    }
}

function backToHome() {
    location.reload();
}

// Agregar el sonido de explosión
const explosionSound = new Audio("sounds/explosion.mp3");

function createTank() {
    const tank = document.createElement("div");
    tank.classList.add("tank");

    const gameContainer = document.getElementById("gameContainer");
    gameContainer.appendChild(tank);

    let x = Math.random() * gameContainer.clientWidth;
    let y = Math.random() * gameContainer.clientHeight;
    let speedX = (Math.random() - 0.5) * 7;
    let speedY = (Math.random() - 0.5) * 7;
    let angle = 0;

    function moveTank() {
        const pattern = Math.floor(Math.random() * 3);
        switch (pattern) {
            case 0:
                x += speedX;
                y += speedY;
                break;
            case 1:
                x += speedX * 1.5;
                y += speedY * 1.5;
                break;
            case 2:
                x += Math.sin(angle) * 5;
                y += Math.cos(angle) * 5;
                angle += 0.05;
                break;
            case 3:
                x += Math.sin(angle) * 3 + (Math.random() - 0.5) * 5;
                 y += Math.cos(angle) * 3 + (Math.random() - 0.5) * 5;
                angle += 0.15;
                break;
        }

        if (Math.random() < 0.01) {
            tank.style.display = tank.style.display === "none" ? "block" : "none";
        }

        if (x < 0 || x > gameContainer.clientWidth - tank.clientWidth) speedX = -speedX;
        if (y < 0 || y > gameContainer.clientHeight - tank.clientHeight) speedY = -speedY;

        tank.style.transform = `translate(${x}px, ${y}px)`;

        requestAnimationFrame(moveTank);
    }

    tank.addEventListener("click", () => {
        explosionSound.currentTime = 0; // Reinicia el sonido para reproducirlo desde el principio
        explosionSound.play(); // Reproduce el sonido de explosión
        createExplosion(x, y);
        tank.remove();
        score++;
        document.getElementById("score").textContent = score;
    });

    moveTank();
}

function createExplosion(x, y) {
    const explosion = document.createElement("div");
    explosion.classList.add("explosion");
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;

    const gameContainer = document.getElementById("gameContainer");
    gameContainer.appendChild(explosion);

    setTimeout(() => explosion.remove(), 350);
}

const mainContainer = document.getElementById("mainContainer");

mainContainer.addEventListener("click", () => {
    mainContainer.classList.add("animated-container");
    
    // Remover la clase después de la animación para permitir futuros clics
    setTimeout(() => {
        mainContainer.classList.remove("animated-container");
    }, 500); // Duración de la animación en ms
});



