// Tilemap data and helper functions

// Default maze (10x8 grid)
const DEFAULT_MAP = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 4, 1, 1, 1, 2, 1, 1, 1, 2],
    [2, 2, 2, 1, 2, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 0, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

// Load the default map
function loadMap() {
    return DEFAULT_MAP.map((row) => row.slice());
}

// Check if a tile is walkable
function isWalkable(tile) {
    return tile === 0 || tile === 1 || tile === 3 || tile === 4;
}

// Find the starting position (tile 4)
function findStart(map) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 4) {
                return { row, col };
            }
        }
    }
    throw new Error('No start position found in the map');
}

// Export functions
export { loadMap, isWalkable, findStart };
