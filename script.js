// CANVAS SELECTION

const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");

// GAME VARIABLES AND CONSTANTS

const scale = 1.5;
let frames = 0;
const period = 8;

// CHANGES

cvs.width = scale * cvs.width;
cvs.height = scale * cvs.height;
// console.log(cvsWidth);
// console.log(cvsHeight);

// SPRITE IMAGE

const sprite = new Image();
sprite.src = "spritesheet.png";


// GAME STATES

const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2
}


// GAME CONTROLS

// SPACE CONTROL
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    if (state.current == state.getReady) state.current = state.game;
    else if (state.current == state.game) state.current = state.over;
    else state.current = state.getReady;
  }
}

// MOUSE CONTROL
cvs.addEventListener("click", function (event) {
  if (state.current == state.getReady) state.current = state.game;
  else if (state.current == state.game) state.current = state.over;
  else state.current = state.getReady;
});


// BACKGROUND

const bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 226,
  x: 0,
  y: cvs.height - 226 * scale,

  draw: function () {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);

    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * scale, this.y, this.w * scale, this.h * scale);
  }
}

// ROAD FOREGROUND

const fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cvs.height - 112 * scale,

  draw: function () {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);

    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * scale, this.y, this.w * scale, this.h * scale);
  }
}

// BIRD OBJECT

const bird = {
  animation: [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 }
  ],
  x: 50 * scale,
  y: 150 * scale,
  w: 34,
  h: 26,

  frame: 0,

  draw: function () {
    let bird = this.animation[this.frame];
    ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w * scale / 2, this.y - this.h * scale / 2, this.w * scale, this.h * scale);
  },

  update: function () {
    if (frames % period == 0) this.frame = this.frame + 1;
    this.frame %= this.animation.length;
  },
}

// GET READY TEMPLATE

const getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cvs.width / 2 - (173 / 2 * scale),
  y: 80 * scale,

  draw: function () {
    if (state.current == state.getReady) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);
    }
  }
}


// GAME OVER TEMPLATE

const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cvs.width / 2 - (225 / 2 * scale),
  y: 90 * scale,
  draw: function () {
    if (state.current == state.over) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);
    }
  }
}


// DRAW FUNCTION

function draw() {
  ctx.fillStyle = "#42bff5";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
}

// UPDATE FUNCTION
function update() {
  bird.update();
}

// LOOP FUNCTION

function loop() {
  frames++;
  draw();
  update();
  requestAnimationFrame(loop);
}

loop();