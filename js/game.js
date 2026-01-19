// Game state and loop management
import { loadMap, findStart } from './map.js';
import { initPlayer, updatePlayer } from './player.js';
import { initInput, getMoveIntent } from './input.js';
import { initRenderer, render } from './renderer.js';

// Game state constants
const GameState = {
    RUNNING: 'running',
    WIN: 'win',
};

// Game configuration
const config = {
    TILE_SIZE: 16,
    TILESET_COLS: 9,
    MOVE_DELAY: 150,
};

// Game state
let gameState = GameState.RUNNING;
let map = [];
let player = null;
let tilesetImage = null;
let characterImage = null;
let startPosition = null;

// Initialize the game
async function initGame() {
    // Load assets
    tilesetImage = await loadImage('assets/maptile.png');
    characterImage = await loadImage('assets/character.png');

    // Initialize game components
    map = loadMap();
    startPosition = findStart(map);
    map[startPosition.row][startPosition.col] = 1;
    player = initPlayer(startPosition);
    initInput(restartGame);
    initRenderer(document.getElementById('gameCanvas'), config, tilesetImage, characterImage, map);
}

// Load an image with error handling
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });
}

// Game loop
function gameLoop() {
    if (gameState === GameState.RUNNING) {
        update();
    }
    render(map, player, gameState);
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    const moveIntent = getMoveIntent();
    const now = Date.now();
    const newPosition = updatePlayer(player, moveIntent, map, config, now);
    if (newPosition) {
        const tile = map[newPosition.row][newPosition.col];
        if (tile === 0) {
            gameState = GameState.WIN;
            document.getElementById('winMessage').classList.remove('hidden');
        }
    }
}

// Restart the game
function restartGame() {
    gameState = GameState.RUNNING;
    document.getElementById('winMessage').classList.add('hidden');
    player = initPlayer(startPosition);
}

// Expose game loop and initialization
export { initGame, gameLoop, restartGame };
