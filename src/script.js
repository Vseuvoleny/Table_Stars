const stars = [
  { positionX: 75, positionY: 100, color: "red" },
  { positionX: 175, positionY: 100, color: "blue" },
  { positionX: 75, positionY: 200, color: "green" },
  { positionX: 175, positionY: 200, color: "yellow" },
  { positionX: 75, positionY: 300, color: "black" }
];

class StarsApp {
  constructor(main, second, stars) {
    this.mainCanvas = main;
    this.secondCanvas = second;
    this.stars = stars;
    this.ctxMain = this.mainCanvas.getContext("2d");
    this.ctxSecond = this.secondCanvas.getContext("2d");
    this.mainCanvas.width = 600;
    this.mainCanvas.height = 600;
    this.secondCanvas.width = 600;
    this.secondCanvas.height = 50;
    this.ctxMain.fillStyle = "white";
    this.ctxMain.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.renderStars()
  }

  renderStars = () =>
    this.stars.map(item =>
      this.drawStar(item.positionX, item.positionY, 5, 30, 15, item.color)
    );

  drawStar = (cx, cy, spikes, outerRadius, innerRadius, color) => {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    this.ctxMain.strokeSyle = "#000";
    this.ctxMain.beginPath();
    this.ctxMain.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctxMain.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctxMain.lineTo(x, y);
      rot += step;
    }
    this.ctxMain.lineTo(cx, cy - outerRadius);
    this.ctxMain.closePath();
    this.ctxMain.fillStyle = color;
    this.ctxMain.fill();
  };

  changeColor = event => {
    const x = event.offsetX;
    const y = event.offsetY;
    const img_data = this.ctxMain.getImageData(x, y, 1, 1);
    const pix = img_data.data;
    const [red, green, blue] = pix;
    this.ctxSecond.fillStyle = `rgba(${red},${green},${blue})`;
    this.ctxSecond.fillRect(
      0,
      0,
      this.secondCanvas.width,
      this.secondCanvas.height
    );
  };
}

const app = new StarsApp(
  document.getElementById("main_canvas"),
  document.getElementById("second_canvas"),
  stars
);
document
  .getElementById("main_canvas")
  .addEventListener("click", () => app.changeColor(event));
