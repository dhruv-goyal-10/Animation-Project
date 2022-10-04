// CANVAS SELECTION

const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");

// GAME VARIABLES AND CONSTANTS
const scale = 1.5;
let frames = 0;


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

  dx: 2,

  draw: function () {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * scale, this.h * scale);

    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w * scale, this.y, this.w * scale, this.h * scale);
  }
}

// DRAW FUNCTION

function draw() {
  ctx.fillStyle = "#6ad6bf";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  bg.draw();
  fg.draw();
}


// LOOP FUNCTION

function loop() {
  draw();
  requestAnimationFrame(loop);
}
loop();
// draw();