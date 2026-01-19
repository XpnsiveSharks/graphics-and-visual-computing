// Rendering logic for the game

let canvas = null;
let ctx = null;
let config = null;
let tilesetImage = null;
let characterImage = null;

// Initialize the renderer
function initRenderer(
  canvasElement,
  gameConfig,
  tilesetImg,
  characterImg,
  map,
) {
  canvas = canvasElement;
  ctx = canvas.getContext("2d");
  config = gameConfig;
  tilesetImage = tilesetImg;
  characterImage = characterImg;

  // Set canvas size based on map dimensions
  const mapRows = map.length;
  const mapCols = map[0].length;
  canvas.width = mapCols * config.TILE_SIZE;
  canvas.height = mapRows * config.TILE_SIZE;

  // Disable image smoothing for pixel art
  ctx.imageSmoothingEnabled = false;
}

// Render the game
function render(map, player, gameState) {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the map
  drawMap(map);

  // Draw the player
  drawPlayer(player);
}

// Draw the map
function drawMap(map) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];
      drawTile(tile, row, col);
    }
  }
}

// Draw a single tile
function drawTile(tile, row, col) {
  const tileRow = Math.floor(tile / config.TILESET_COLS);
  const tileCol = tile % config.TILESET_COLS;

  ctx.drawImage(
    tilesetImage,
    tileCol * config.TILE_SIZE,
    tileRow * config.TILE_SIZE,
    config.TILE_SIZE,
    config.TILE_SIZE,
    col * config.TILE_SIZE,
    row * config.TILE_SIZE,
    config.TILE_SIZE,
    config.TILE_SIZE,
  );
}

// Draw the player
function drawPlayer(player) {
  const FRAME_SIZE = 32; // real sprite frame size (32x32)
  const TILE_SIZE = config.TILE_SIZE; // 16x16 on map

  const frameX = player.frame * FRAME_SIZE;
  const frameY = 1 * FRAME_SIZE; // second row

  ctx.drawImage(
    characterImage,
    frameX,
    frameY,
    FRAME_SIZE,
    FRAME_SIZE, // source (sprite sheet)
    player.col * TILE_SIZE,
    player.row * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE, // destination (scaled down)
  );
}

// Export functions
export { initRenderer, render };
