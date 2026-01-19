// Player state and movement logic
import { isWalkable } from './map.js';

// Initialize player
function initPlayer(startPosition) {
    return {
        row: startPosition.row,
        col: startPosition.col,
        frame: 0,
        frameCounter: 0,
        isMoving: false,
        lastMoveTime: 0,
    };
}

// Update player position based on move intent
function updatePlayer(player, moveIntent, map, config, now) {
    if (!moveIntent) {
        player.isMoving = false;
        updatePlayerAnimation(player);
        return null;
    }

    if (now - player.lastMoveTime < config.MOVE_DELAY) {
        player.isMoving = false;
        updatePlayerAnimation(player);
        return null;
    }

    const newRow = player.row + moveIntent.dRow;
    const newCol = player.col + moveIntent.dCol;

    // Check if new position is within bounds and walkable
    if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[newRow].length) {
        if (isWalkable(map[newRow][newCol])) {
            player.row = newRow;
            player.col = newCol;
            player.isMoving = true;
            player.lastMoveTime = now;
            updatePlayerAnimation(player);
            return { row: newRow, col: newCol };
        }
    }

    player.isMoving = false;
    updatePlayerAnimation(player);
    return null;
}

// Update player animation frame
function updatePlayerAnimation(player) {
    if (player.isMoving) {
        player.frameCounter++;
        if (player.frameCounter >= 10) {
            player.frame = (player.frame + 1) % 5;
            player.frameCounter = 0;
        }
    } else {
        player.frame = 0;
        player.frameCounter = 0;
    }
}

// Export functions
export { initPlayer, updatePlayer };
