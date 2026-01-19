// Main entry point for the game
import { initGame, gameLoop } from './game.js';

// Initialize the game when the window loads
window.addEventListener('load', async () => {
    await initGame();
    gameLoop();
});
