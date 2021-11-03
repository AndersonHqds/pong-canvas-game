class Scenario {
  player1Points = 0;
  player2Points = 0;

  constructor(width, height, background) {
    this.height = height;
    this.width = width;
    this.background = background;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  getBackground() {
    return this.background;
  }

  setHeight(height) {
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setBackground(background) {
    this.background = background;
  }

  addPlayer1Points() {
    this.player1Points += 1;
  }

  addPlayer2Points() {
    this.player2Points += 1;
  }

  render(game) {
    const canvas = document.getElementById('scenario');
    const ctx = canvas.getContext('2d');

    const SCENARIO_CENTER = this.width / 2;

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.width, this.height);

    if (game?.isFinished) {
      ctx.font = '50px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(this.player1Points, SCENARIO_CENTER - 100, 80);

      ctx.font = '50px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(this.player2Points, SCENARIO_CENTER + 80, 80);
    }

    const ctxSeparator = canvas.getContext('2d');
    ctxSeparator.strokeStyle = '#FFF';
    ctxSeparator.setLineDash([5, 3]);
    ctxSeparator.beginPath();
    ctxSeparator.moveTo(SCENARIO_CENTER,0);
    ctxSeparator.lineTo(SCENARIO_CENTER, this.height);
    ctxSeparator.stroke();
    ctxSeparator.closePath();
  }
}

export default Scenario;