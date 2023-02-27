/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 460;
  canvas.height = 823;
  

  const linesArray = [];
  let numberOfLines = 250;

//  canvas pattern
  const patternImage = this.document.getElementById("patternImage");
  const erinPat = ctx.createPattern(patternImage, "no-repeat");
  ctx.strokeStyle = erinPat

  class Line {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.history = [{ x: this.x, y: this.y }];
      this.lineWidth = Math.floor(Math.random() * 20 + 5);
      this.hue = Math.floor(Math.random() * 360);
      this.maxLength = Math.floor(Math.random() * 150 + 10);
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = 7;
      this.lifeSpan = this.maxLength * 3;
      this.timer = 0;
    }
    draw(context) {
      //context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
      context.lineWidth = this.lineWidth;
      context.beginPath();
      context.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 0; i < this.history.length; i++) {
        context.lineTo(this.history[i].x, this.history[i].y);
      }
      context.stroke();
    }
    update() {
      this.timer++;
      if (this.timer < this.lifeSpan) {
        this.x += this.speedX + Math.random() * 20 - 10;
        this.y += this.speedY + Math.random() * 20 - 10;
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) {
          this.history.shift();
        }
      } else if (this.history.length <= 1) {
        this.reset();
      } else {
        this.history.shift();
      }
    }
    reset() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.history = [{ x: this.x, y: this.y }];
      this.timer = 0;
    }
  }
  for (let i = 0; i < numberOfLines; i++) {
    linesArray.push(new Line(canvas));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linesArray.forEach((lineObject) => {
      lineObject.draw(ctx);
      lineObject.update();
    });

    requestAnimationFrame(animate);
  }
  animate();

  
  

  

  //load function end
});
