let grid = [];
let next = [];
const dA = 1;
const dB = 0.5;
const feed = 0.055;
const k = 0.062;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);

  background(0);

  for (x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (y = 0; y < height; y++) {
      grid[x][y] = {a: 0, b: 1};
      next[x][y] = {a: 0, b: 0};
    }
  }
}

function draw() {
  for (x = 1; x < width - 1; x++) {
    for (y = 1; y < height - 1; y++) {
      const {a, b} = grid[x][y];
      next[x][y].a = a + (dA + laplaceA(x, y)) - a * b * b + feed * (a - 1);
      next[x][y].b = b + (dB + laplaceB(x, y)) - a * b * b - (k + feed) * b;
      next[x][y].b = b * random(0.5, 1.5);
    }
  }

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let pix = (x + y * width) * 4;
      let c = color(255, 0, 100);
      pixels[pix + 0] = Math.floor(next[x][y].a * 255);
      pixels[pix + 1] = 0;
      pixels[pix + 2] = Math.floor(next[x][y].b * 255);
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  swap();
}

function swap() {
  const temp = grid;
  grid = next;
  next = grid;
}

function laplaceA(x, y) {
  let sumA = 0;

  sumA += grid[(x, y)].a * -1;
  sumA += grid[(x - 1, y)].a * 0.2;
  sumA += grid[(x + 1, y)].a * 0.2;
  sumA += grid[(x, y - 1)].a * 0.2;
  sumA += grid[(x, y + 1)].a * 0.2;
  sumA += grid[(x - 1, y - 1)].a * 0.05;
  sumA += grid[(x + 1, y - 1)].a * 0.05;
  sumA += grid[(x - 1, y + 1)].a * 0.05;
  sumA += grid[(x + 1, y + 1)].a * 0.05;

  return sumA;
}

function laplaceB(x, y) {
  let sumB = 0;

  sumB += grid[(x, y)].b * -1;
  sumB += grid[(x - 1, y)].b * 0.2;
  sumB += grid[(x + 1, y)].b * 0.2;
  sumB += grid[(x, y - 1)].b * 0.2;
  sumB += grid[(x, y + 1)].b * 0.2;
  sumB += grid[(x - 1, y - 1)].b * 0.05;
  sumB += grid[(x + 1, y - 1)].b * 0.05;
  sumB += grid[(x - 1, y + 1)].b * 0.05;
  sumB += grid[(x + 1, y + 1)].b * 0.05;

  return sumB;
}
