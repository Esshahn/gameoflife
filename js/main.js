const generate_playfield = (size) => {
  let playfield = document.getElementById("playfield");
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let div = document.createElement("div");
      div.id = y + "-" + x;
      div.className = "cell dead";
      div.style.left = x * (100 / size) + "%";
      div.style.top = y * (100 / size) + "%";
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

const fill_random = (m, amount) => {
  for (let i = 0; i < amount; i++) {
    m = set_random(m);
  }
  return m;
};

const set_random = (m) => {
  let x = Math.floor(Math.random() * m.length);
  let y = Math.floor(Math.random() * m.length);
  m[y][x] = 1;
  return m;
};

const get_neighbours = (m, x, y) => {
  let top = y - 1;
  let bottom = y + 1;
  let left = x - 1;
  let right = x + 1;
  let size = m.length - 1;

  if (top < 0) top = size;
  if (bottom > size) bottom = 0;
  if (left < 0) left = size;
  if (right > size) right = 0;

  let n = 0;
  n += m[top][left];
  n += m[top][x];
  n += m[top][right];
  n += m[y][left];
  n += m[y][right];
  n += m[bottom][left];
  n += m[bottom][x];
  n += m[bottom][right];
  return n;
};

const loop = () => {
  console.log(count);
  count++;
  if (count % 10 == 0) {
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
    display(matrix);
  }
  window.requestAnimationFrame(loop);
};

const reset = () => {
  generate_playfield(size);
  matrix = init_matrix(size);
  matrix = fill_random(matrix, size * 4);
  loop();
};

var count = 0;
var size = 50;
var matrix;
