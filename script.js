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

// START BUTTON LOCATION

const startBtn = {
  x: 120 * scale,
  y: 263 * scale,
  w: 83 * scale,
  h: 29 * scale
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
  else if (state.current == state.game) {
    if (bird.y - bird.radius <= 0) return;
    bird.flap();
  }
  else {
    let rect = cvs.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;

    if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
      pipes.reset();
      bird.speedReset();
      score.reset();
      state.current = state.getReady;
    }
  }
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
  radius: 12 * scale,

  draw: function () {
    let bird = this.animation[this.frame];
    ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w * scale / 2, this.y - this.h * scale / 2, this.w * scale, this.h * scale);
  },

  flap: function () {
    speed = -jump;
  },

  update: function () {
    if (frames % period == 0) this.frame += 1;
    this.frame %= this.animation.length;

    if (state.current == state.getReady) {
      this.y = 150 * scale;
    }
    else {
      speed += gravity;
      this.y += speed;
    }
    if (this.y + this.h * scale / 2 >= cvs.height - fg.h * scale) {
      this.y = cvs.height - fg.h * scale - this.h * scale / 2;
      if (state.current == state.game) {
        state.current = state.over;
      }
    }
  },
  speedReset: function () {
    speed = 0;
  }
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

      let bottomPipeYPos = (p.y + this.h + pipeGap) * scale;

      // COLLISION DETECTION

      // TOP PIPE
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w * scale && bird.y + bird.radius > p.y * scale && bird.y - bird.radius < p.y * scale + this.h * scale) {
        state.current = state.over;
      }

      // BOTTOM PIPE
      if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w * scale && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h * scale) {
        state.current = state.over;
      }

      p.x -= speedf;
      if (p.x + this.w * scale <= 0) {
        this.position.shift();
        score.value += 1;
        score.best = Math.max(score.value, score.best);
        sessionStorage.setItem("best", score.best);
      }
    }
  },
  reset: function () {
    this.position = [];
  }
}

// SCORE
const score = {
  best: parseInt(sessionStorage.getItem("best")) || 0,
  value: 0,

  draw: function () {
    ctx.fillStyle = "#000";

    if (state.current == state.game) {
      ctx.lineWidth = 2;
      ctx.font = "40px Comic Sans Ms";
      ctx.fillText(this.value, cvs.width / 2, 50 * scale);

    } else if (state.current == state.over) {
      // SCORE VALUE
      ctx.font = "25px Comic Sans Ms";
      ctx.fillText(this.value, 225 * scale, 186 * scale);

      // BEST SCORE
      ctx.fillText(this.best, 225 * scale, 228 * scale);
    }
  },
  reset: function () {
    this.value = 0;
  }
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
  bg.draw();
  pipes.draw();
  bird.draw();
  fg.draw();
  gameOver.draw();
  score.draw();
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