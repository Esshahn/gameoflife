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
      div.style.left = x * 10 + "px";
      div.style.top = y * 10 + "px";
      playfield.appendChild(div);
    }
  }
};

const display = (m) => {
  let size = m.length;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let cell = document.getElementById(y + "-" + x);
      let element = m[y][x];
      if (element == 0) {
        cell.className = "cell dead";
      } else {
        cell.className = "cell alive";
      }
    }
  }
};

const init_matrix = (size) => {
  return new Array(size).fill(0).map(() => new Array(size).fill(0));
};

const fill_random = (matrix, amount) => {
  for (let i = 0; i < amount; i++) {
    matrix = set_random(matrix);
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

const fill_shape = (matrix) => {
  let mid = matrix.length / 2;
  for (let y = 0 + mid; y < 3 + mid; y++) {
    for (let x = 0 + mid; x < 3 + mid; x++) {
      matrix[y][x] = 1;
    }
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
  //console.log("x:" + x + " y:" + y + " n:" + n);
  return n;
};

const loop = () => {
  count++;
  display(matrix);
  if (count % 1 == 0) {
    let cell;

    let new_matrix = JSON.parse(JSON.stringify(matrix));
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        let cell = matrix[y][x];
        let n = get_neighbours(matrix, x, y);
        if (cell == 0) {
          if (n == 3) new_matrix[y][x] = 1;
        }
        if (cell == 1) {
          if (n < 2 || n > 3) new_matrix[y][x] = 0;
        }
      }
    }
    matrix = JSON.parse(JSON.stringify(new_matrix));
  }

  window.requestAnimationFrame(loop);
};

var count = 0;
var size = 80;

var matrix = init_matrix(size);
generate_playfield(size);
matrix = fill_random(matrix, 400);
loop();
