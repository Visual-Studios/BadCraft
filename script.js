const gameContainer = document.getElementById('gameContainer');

// Create a 50x50 grid of blocks
for (let i = 0; i < 2500; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.addEventListener('click', () => {
        if (block.style.backgroundColor === 'red') {
            block.style.backgroundColor = '#ccc'; // Break block
        } else {
            block.style.backgroundColor = 'red'; // Place block
        }
    });
    gameContainer.appendChild(block);
}

// Handle arrow key navigation
document.addEventListener('keydown', (event) => {
    const step = 20; // Scroll step size
    switch (event.key) {
        case 'ArrowUp':
            gameContainer.scrollBy(0, -step);
            break;
        case 'ArrowDown':
            gameContainer.scrollBy(0, step);
            break;
        case 'ArrowLeft':
            gameContainer.scrollBy(-step, 0);
            break;
        case 'ArrowRight':
            gameContainer.scrollBy(step, 0);
            break;
    }
});