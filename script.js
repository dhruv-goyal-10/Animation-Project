// CANVAS SELECTION

const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");

// GAME VARIABLES AND CONSTANTS

const scale = 1.5;

// CHANGES

cvs.width = scale * cvs.width;
cvs.height = scale * cvs.height;
// console.log(cvsWidth);
// console.log(cvsHeight);

// SPRITE IMAGE

const sprite = new Image();
sprite.src = "spritesheet.png";

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


// GET READY TEMPLATE
const getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cvs.width / 2 - (173 / 2 * scale),
  y: 80 * scale,

  draw: function () {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);
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
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);
  }
}


// DRAW FUNCTION

function draw() {
  ctx.fillStyle = "#42bff5";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  fg.draw();
  // getReady.draw();
  // gameOver.draw();
}


// LOOP FUNCTION

function loop() {
  draw();
  requestAnimationFrame(loop);
}
loop();