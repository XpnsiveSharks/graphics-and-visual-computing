// Keyboard input handling

let moveIntent = null;
let onRestart = null;

// Initialize input handling
function initInput(restartCallback) {
    onRestart = typeof restartCallback === 'function' ? restartCallback : null;
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

// Handle key down events
function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveIntent = { dRow: -1, dCol: 0 };
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveIntent = { dRow: 1, dCol: 0 };
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moveIntent = { dRow: 0, dCol: -1 };
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveIntent = { dRow: 0, dCol: 1 };
            break;
        case 'r':
        case 'R':
            if (onRestart) {
                onRestart();
            }
            break;
    }
}

// Handle key up events
function handleKeyUp(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
        case 'ArrowDown':
        case 's':
        case 'S':
        case 'ArrowLeft':
        case 'a':
        case 'A':
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveIntent = null;
            break;
    }
}

// Get the current move intent
function getMoveIntent() {
    return moveIntent;
}

// Export functions
export { initInput, getMoveIntent };
