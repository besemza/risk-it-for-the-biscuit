const door = document.getElementById('door');
const biscuit = document.getElementById('biscuit');
const hand = document.getElementById('hand');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const gameOverEl = document.getElementById('game-over');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let isDoorOpen = false;
let gameInProgress = true;

highScoreEl.textContent = highScore;

function toggleDoor() {
    if (!gameInProgress) return;

    if (isDoorOpen) {
        // --- The door is currently OPEN, so we are now CLOSING it. ---
        isDoorOpen = false;
        door.style.height = '100%'; // Close the door visually

        // The door will remain CLOSED for exactly 2 seconds.
        setTimeout(toggleDoor, 2000);

    } else {
        // --- The door is currently CLOSED, so we are now OPENING it. ---
        isDoorOpen = true;
        door.style.height = '0%'; // Open the door visually

        // The door will remain OPEN for 1 to 5 seconds.
        const openDuration = Math.random() * 4000 + 1000;
        setTimeout(toggleDoor, openDuration);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameInProgress) {
        hand.style.bottom = '160px'; // Position hand over the biscuit
        setTimeout(checkCollision, 300);
    }
});

function checkCollision() {
    if (isDoorOpen) {
        score++;
        scoreEl.textContent = score;

        // Move hand and biscuit down simultaneously
        hand.style.bottom = '-200px';
        biscuit.style.top = '150%';

        // Reset biscuit position after the animation
        setTimeout(() => {
            biscuit.style.transition = 'none';
            biscuit.style.top = '50%';
            setTimeout(() => {
                biscuit.style.transition = 'top 0.3s ease-in-out';
            }, 50);
        }, 300);
    } else {
        endGame();
    }
}

function endGame() {
    gameInProgress = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreEl.textContent = highScore;
    }
    finalScoreEl.textContent = score;
    gameOverEl.classList.remove('hidden');
}

restartBtn.addEventListener('click', () => {
    score = 0;
    scoreEl.textContent = 0;
    gameInProgress = true;
    gameOverEl.classList.add('hidden');
    hand.style.bottom = '-200px';
    toggleDoor();
});

toggleDoor();
