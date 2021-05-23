/*

  game of life without checking how game of life works

*/

const generate_playfield = (size) => {
  let playfield = document.getElementById("playfield");

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let div = document.createElement("div");
      div.id = y + "-" + x;
      div.className = "cell dead";
      div.style.left = x * 11 + "px";
      div.style.top = y * 11 + "px";
      playfield.appendChild(div);
    }
  }
};

const display = (matrix) => {
  let size = matrix.length;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let cell = document.getElementById(y + "-" + x);
      let element = matrix[y][x];
      if (element == 0) {
        cell.className = "cell dead";
      } else {
        cell.className = "cell alive";
      }
    }
  }
};

const init_matrix = (size) => {
  const matrix = new Array(size).fill(0).map(() => new Array(size).fill(0));
  return matrix;
};

const setpos = (matrix, x, y, value) => {
  matrix[y][x] = value;
  return matrix;
};

const flip = (matrix, x, y) => {
  if (matrix[y][x] == 0) {
    matrix[y][x] = 1;
  } else {
    matrix[y][x] = 0;
  }
  return matrix;
};

const set_random = (matrix) => {
  let size = matrix.length;
  let x = Math.floor(Math.random() * size);
  let y = Math.floor(Math.random() * size);
  matrix[y][x] = 1;
  return matrix;
};

const fill_random = (matrix, amount) => {
  for (let i = 0; i < amount; i++) {
    matrix = set_random(matrix);
  }
  return matrix;
};

const get_neighbours = (matrix, x, y) => {
  let top = y - 1;
  let bottom = y + 1;
  let left = x - 1;
  let right = x + 1;
  let size = matrix.length - 1;

  if (top < 0) top = size;
  if (bottom > size) bottom = 0;
  if (left < 0) left = size;
  if (right > size) right = 0;

  let n = 0;
  n += matrix[top][left];
  n += matrix[top][x];
  n += matrix[top][right];
  n += matrix[y][left];
  n += matrix[y][right];
  n += matrix[bottom][left];
  n += matrix[bottom][x];
  n += matrix[bottom][right];
  return n;
};

const loop = () => {
  count++;
  if (count % 10 == 0) {
    let cell;

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        let cell = matrix[y][x];
        let n = get_neighbours(matrix, x, y);
        if (cell == 0) {
          if (n == 3) matrix = flip(matrix, x, y);
        } else {
          if (n < 2 || n > 3) matrix = flip(matrix, x, y);
        }
      }
    }
  }
  display(matrix);
  window.requestAnimationFrame(loop);
};

var count = 0;
var size = 30;

var matrix = init_matrix(size);
generate_playfield(size);
matrix = fill_random(matrix, 60);
loop();
