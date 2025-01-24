const gameContainer = document.getElementById('gameContainer');

// Create a 10x10 grid of blocks
for (let i = 0; i < 100; i++) {
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