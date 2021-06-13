const generate_playfield = (size) => {
  let playfield = document.getElementById("playfield");
  playfield.innerHTML = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let div = document.createElement("div");
      div.id = y + "-" + x;
      div.className = "cell dead";
      div.style.left = x * (100 / size) + "%";
      div.style.top = y * (100 / size) + "%";
      div.style.height = 100 / size + "%";
      div.style.width = 100 / size + "%";
      div.onclick = function () {
        toggle(x, y);
      };
      playfield.appendChild(div);
    }
  }
};

const display = (m) => {
  let size = m.length;
  let population = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let cell = document.getElementById(y + "-" + x);
      let element = m[y][x];
      if (element == 0) {
        cell.className = "cell dead";
      } else {
        cell.className = "cell alive";
        population++;
      }
    }
  }
  return population;
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

const update_ui = (elem_id, value) => {
  e = document.getElementById(elem_id);
  e.value = value;
};

const get_from_ui = (elem_id, min = 1, max = 50) => {
  let val = parseInt(document.getElementById(elem_id).value, 10);

  if (isNaN(val)) val = max / 10;
  if (val > max) val = max;
  if (val < min) val = min;
  return val;
};

const loop = () => {
  count++;
  if (count % (100 - speed - 1) == 0) {
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
    let population = display(matrix);
    document.getElementById("population").innerHTML = population;
  }
  request = window.requestAnimationFrame(loop);
};

const run = () => {
  let state = document.getElementById("run").innerHTML;

  if (state == "Stop") {
    cancelAnimationFrame(request);
    document.getElementById("run").innerHTML = "Start";
  }
  if (state == "Start") {
    loop();
    document.getElementById("run").innerHTML = "Stop";
  }
};

const reset = () => {
  clean();
  generate_playfield(size);
  matrix = init_matrix(size);
  matrix = fill_random(matrix, seed);
};

const clean = () => {
  count = 0;
  size = get_from_ui("size", 4, 50);
  seed = get_from_ui("seed", 0, 500);
  speed = document.getElementById("speed").innerHTML;
  update_ui("size", size);
  update_ui("seed", seed);
  update_ui("speed", speed);
  matrix = init_matrix(size);
};

const toggle = (x, y) => {
  if (matrix[y][x] == 0) {
    matrix[y][x] = 1;
  } else {
    matrix[y][x] = 0;
  }
  let population = display(matrix);
  document.getElementById("population").innerHTML = population;
};

var slider = document.getElementById("myRange");
var count = 0;
var size = 20;
var seed = size * 4;
var speed = slider.value;
var matrix;
var request;
update_ui("size", size);
update_ui("seed", seed);
update_ui("speed", speed);

document.getElementById("speed").innerHTML = speed;

slider.oninput = function () {
  document.getElementById("speed").innerHTML = this.value;
  speed = this.value;
};
