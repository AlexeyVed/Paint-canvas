function PaintView() {
    
    this.isMouseDown = false;
    this.canvas = settings.layer;
    this.ctx = this.canvas.getContext('2d');
    this.figure = settings.tool;
    this.beginX;
    this.beginY;
    let self = this;
}

/* ------------------------- view ---------------------------*/

PaintView.prototype.renderLine = function(x, y) {
    
    this.ctx.lineWidth = settings.size * 2;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(x, y, settings.size, 0, Math.PI * 2);
    this.ctx.shadowBlur = 3;
    this.ctx.fillStyle = settings.color;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.strokeStyle = settings.color;
    return true;
};

PaintView.prototype.startFigure = function(x, y) {
    self.beginX = x;
    self.beginY = y;
};

PaintView.prototype.mouseUpCircus = function(x, y) {
    
    radius = Math.sqrt(Math.pow((x - self.beginX), 2) + Math.pow((y - self.beginY), 2));
    this.ctx.beginPath();
    this.ctx.arc(self.beginX, self.beginY, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = settings.color;
    this.ctx.fill();
    this.ctx.beginPath();
    return true;
};

PaintView.prototype.mouseUpRect = function(x, y) {
    this.ctx.beginPath();
    let width = x - self.beginX;
    let height = y - self.beginY;
    this.ctx.fillStyle = settings.color;
    this.ctx.fillRect(self.beginX, self.beginY, width, height);
    this.ctx.beginPath();
    return true;
};

PaintView.prototype.mouseUpPolygon = function(x, y) {
    
    var numberOfSides = settings.numberOfSides,
        size = Math.sqrt(Math.pow(x - self.beginX, 2) + Math.pow(y - self.beginY, 2)),
        Xcenter = self.beginX,
        Ycenter = self.beginY,
        step = 2 * Math.PI / numberOfSides,
        shift = (Math.PI / 180.0) * -18,
        angle = (x - self.beginX) / (y - self.beginY);
    if (angle < -4) {
        angle = -4;
    }
    if (angle > 4) {
        angle = 4;
    }
    this.ctx.beginPath();
    
    for (var i = 0; i <= numberOfSides; i++) {
        var curStep = i * step + shift * angle;
        this.renderLine(Xcenter + size * Math.cos(curStep), Ycenter + size * Math.sin(curStep));
    }
    
    this.ctx.strokeStyle = settings.color;
    this.ctx.lineWidth = settings.size * 2;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    return true;
};

PaintView.prototype.clear = function() {
    this.ctx.clearRect(0, 0, 800, 600);
    return true;
};

/* ------------------------- end view ---------------------------*/




