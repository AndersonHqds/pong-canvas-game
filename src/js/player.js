class Player {
  
  restore = null;

  constructor(x = 0, y = 0, height = 60, isPlayerOne, scenario) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.isPlayerOne = isPlayerOne;
    this.scenario = scenario;

    this.restore = this.keepInitialValues(x, y, height, isPlayerOne, scenario);

    this.render();

    if (isPlayerOne)
      document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  keepInitialValues(x, y, height, isPlayerOne, scenario) {
    return () => {
      this.x = x;
      this.y = y;
      this.height = height;
      this.isPlayerOne = isPlayerOne;
      this.scenario = scenario;
    }
  }

  reset() {
    this.restore();
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getIsPlayerOne() {
    return this.isPlayerOne;
  }


  onKeyDown(e) {
    if (e.keyCode === 38) {
      if (this.y - 80 < 0) {
        this.y = 0;
      }
      else {
        this.y -= 80;
      }
    } else if (e.keyCode === 40) {
      if (this.y + this.height + 80 > this.scenario.y) {
        this.y = this.scenario.y - this.height;
      }
      else {
        this.y += 80;
      }
    }
  }

  renderIAPlayer(ballY, speed, positionX) {
    if (positionX === 'right') {
      if (this.y > ballY) {
        this.y -= (speed + 30);
      }
      else if (this.y < ballY) {
        this.y += (speed + 30);
      }
    } 
    
    this.render();
  }

  render() {
    const canvas = document.getElementById('scenario');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFF';
    ctx.fillRect(this.x, this.y, 10, this.height);
  }
}

export default Player;