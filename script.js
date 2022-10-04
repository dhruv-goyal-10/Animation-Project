// CANVAS SELECTION

const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");

// GAME VARIABLES AND CONSTANTS

const scale = 1.5;
let frames = 0;
const period = 5;    // Bird flapping speed inversely
const gravity = 0.25 * scale;
const jump = 4.5 * scale;
let speed = 0;
const speedb = 1.5 * scale;
const speedf = 4 * scale;
const pipeFrequency = 50; // inversely proportional
const pipeGap = 85; // directly proportional

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

// SPACE BAR CONTROL
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    control();
  }
}

// MOUSE CONTROL
cvs.addEventListener("click", function (event) {
  control();
});

// CONTROL FUNCTION
function control() {
  if (state.current == state.getReady) state.current = state.game;
  else if (state.current == state.game) bird.flap();
  else state.current = state.getReady;
}


// BACKGROUND

const bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 226,
  x: 0,
  y: cvs.height - 226 * scale,

  // draw: function () {
  //   ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);

  //   ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * scale, this.y, this.w * scale, this.h * scale);
  // },

  draw: function () {
    for (let i = 0; i < 100; i++) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * scale * i, this.y, this.w * scale, this.h * scale);
    }
  },

  update: function () {
    if (state.current == state.game) {
      this.x -= speedb;
    }
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

  // draw: function () {
  //   ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);

  //   ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * scale, this.y, this.w * scale, this.h * scale);
  // },

  draw: function () {
    for (let i = 0; i < 200; i++) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * scale * i, this.y, this.w * scale, this.h * scale);
    }
  },

  update: function () {
    if (state.current == state.game) {
      this.x -= speedf;
    }
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

  flap: function () {
    speed = -jump;
  },

  update: function () {
    if (frames % period == 0) this.frame = this.frame + 1;
    this.frame %= this.animation.length;

    if (state.current == state.getReady) {
      this.y = 150;
    }
    else {
      speed += gravity;
      this.y += speed;
    }
  },
}

// PIPES

const pipes = {
  position: [],

  top: {
    sX: 553,
    sY: 0
  },
  bottom: {
    sX: 502,
    sY: 0
  },

  w: 53,
  h: 400,
  maxYPos: -150,

  draw: function () {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let topYPos = p.y * scale;
      let bottomYPos = (p.y + this.h + pipeGap) * scale;

      ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w * scale, this.h * scale);

      ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w * scale, this.h * scale);
    }
  },

  update: function () {
    if (state.current !== state.game) return;

    if (frames % pipeFrequency == 0) {
      this.position.push({
        x: cvs.width,
        y: this.maxYPos * (Math.random() + 1)
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let bottomPipeYPos = p.y + this.h + pipeGap;

      p.x -= speedf;
      if (p.x + this.w * scale <= 0) {
        this.position.shift();
      }
    }
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
  getReady.draw();
  gameOver.draw();
  bg.draw();
  pipes.draw();
  bird.draw();
  fg.draw();
}

// UPDATE FUNCTION

function update() {
  bg.update();
  pipes.update();
  bird.update();
  fg.update();
}

// LOOP FUNCTION

function loop() {
  frames++;
  draw();
  update();
  requestAnimationFrame(loop);
}

loop();