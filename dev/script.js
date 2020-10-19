"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stars = [{
  positionX: 75,
  positionY: 100,
  color: "red"
}, {
  positionX: 175,
  positionY: 100,
  color: "blue"
}, {
  positionX: 75,
  positionY: 200,
  color: "green"
}, {
  positionX: 175,
  positionY: 200,
  color: "yellow"
}, {
  positionX: 75,
  positionY: 300,
  color: "black"
}];

var StarsApp = function StarsApp(main, second, stars) {
  var _this = this;

  _classCallCheck(this, StarsApp);

  _defineProperty(this, "renderStars", function () {
    return _this.stars.map(function (item) {
      return _this.drawStar(item.positionX, item.positionY, 5, 30, 15, item.color);
    });
  });

  _defineProperty(this, "drawStar", function (cx, cy, spikes, outerRadius, innerRadius, color) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;
    _this.ctxMain.strokeSyle = "#000";

    _this.ctxMain.beginPath();

    _this.ctxMain.moveTo(cx, cy - outerRadius);

    for (var i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;

      _this.ctxMain.lineTo(x, y);

      rot += step;
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;

      _this.ctxMain.lineTo(x, y);

      rot += step;
    }

    _this.ctxMain.lineTo(cx, cy - outerRadius);

    _this.ctxMain.closePath();

    _this.ctxMain.fillStyle = color;

    _this.ctxMain.fill();
  });

  _defineProperty(this, "changeColor", function (event) {
    var x = event.offsetX;
    var y = event.offsetY;

    var img_data = _this.ctxMain.getImageData(x, y, 1, 1);

    var pix = img_data.data;

    var _pix = _slicedToArray(pix, 3),
        red = _pix[0],
        green = _pix[1],
        blue = _pix[2];

    _this.ctxSecond.fillStyle = "rgba(".concat(red, ",").concat(green, ",").concat(blue, ")");

    _this.ctxSecond.fillRect(0, 0, _this.secondCanvas.width, _this.secondCanvas.height);
  });

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
  this.renderStars();
};

var app = new StarsApp(document.getElementById("main_canvas"), document.getElementById("second_canvas"), stars);
document.getElementById("main_canvas").addEventListener("click", function () {
  return app.changeColor(event);
});