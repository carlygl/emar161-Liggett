const cols = 7;
const rows = 6;
const w = 100;
const dw = 80;
const board = Array(6).fill().map(() => Array(7).fill(0));

let player = 1;
let playerPos;
let win = 0;
let bg;

function setup() {
  createCanvas(cols * w, rows * w + w);
  textFont("Bebas Neue");
  bg = loadImage('gradient.png');
}

function hasWon() {
  //Horizontal Plane
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i <= cols - 4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j][i + k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  //Vertical Plane
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 0; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j + k][i] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  //Diagonal Plane
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 0; i <= cols - 4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j + k][i + k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  //Antidiagonal Plane
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 4; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j + k][i - k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  return false;
}

function draw() {
  background(bg);
  print(mouseX, mouseY);

  playerPos = floor(mouseX / w)

  stroke(0);
  fill(255);
  rect(-1, -1, width + 2, w);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      fill(255);
      if (board[j][i] == 1) {
        fill(255, 94, 156);
      } else if (board[j][i] == 2) {
        fill(255, 221, 3);
      }
      ellipse(i * w + w / 2, j * w + 3 * w / 2, dw);
    }
  }

  stroke(102, 102, 0);
  for (let x = w; x < width; x += w) {
    line(x, w, x, height);
  }

  stroke(0);
  if (player == 1) {
    fill(255, 94, 156);
  } else if (player == 2) {
    fill(255, 221, 3);
  }
  ellipse((playerPos + 0.5) * w, w / 2, dw);

  if (win != 0) {
    noStroke();
    fill(0);
    if (win == 1) {
      fill(255, 94, 156);
    } else if (win == 2) {
      fill(255, 221, 3);
    }
    textAlign(CENTER, CENTER);
    textSize(164);
    if (win == 4) {
      ending();
      fill(255);
      text("GAME OVER!", width / 2, height / 2);
    } else if (win == 3) {
      ending();
      fill(255);
      text("IT WAS A TIE.", width / 2, height / 2);
    } else {
      ending();
      stroke(255);
      text(`${win > 1 ? 'YELLOW' : 'PINK'} WON!`, width / 2, height / 2);
    }
    noLoop();

  }
}

function ending() {
  push();
  background(bg);
  textSize(40);
  fill(255);
  pop();
}

function mousePressed() {
  if (board[0][playerPos] != 0) {
    win = 4;
  }

  board[0][playerPos] = player;
  let i = 0;
  while (true) {
    if (i >= rows - 1) {
      break;
    }
    if (board[i + 1][playerPos] != 0) {
      break;
    }
    [board[i + 1][playerPos], board[i][playerPos]] = [board[i][playerPos], board[i + 1][playerPos]];
    i++;
  }

  if (hasWon()) {
    //console.log(`${player > 1 ? 'RED' : 'BLUE'} WON!`);
    win = player;
  }

  let tie = true;
  for (let j = 0; j < rows; j++) outer: {
    for (let i = 0; i < cols; i++) {
      if (board[j][i] == 0) {
        tie = false;
      }
    }
  }
  
//specifies 3 different outcomes
  if (tie) {
    win = 3;
  }

  player = 3 - player;

}