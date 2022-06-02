const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird1.png";
bg.src = "./images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

let gap = 85;
let birdX = 10;
let birdY = 150;
let gravity = 1.25;
let score = 0;
let constant;

let jump = (event) => {
  if (event.keyCode === 32 || event.keyCode === 38) {
    birdY -= 27;
  }
  // console.log(birdY);
};
document.addEventListener("keydown", jump);

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    if (
      (birdX + bird.width >= pipe[i].x &&
        birdX <= pipe[i].x + pipeNorth.width &&
        (birdY <= pipe[i].y + pipeNorth.height ||
          birdY + bird.height >= pipe[i].y + constant)) ||
      birdY + bird.height >= canvas.height - fg.height
    ) {
      location.reload(); //it reloads the page
    }
    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, birdX, birdY);
  birdY += gravity;
  ctx.fillText(`Score:${score}`, 10, cvs.height - 20);
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";

  requestAnimationFrame(draw);
}
window.onclick = () => (birdY -= 27);
draw();
