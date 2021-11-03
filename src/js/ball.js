class Ball {
  position = 'right';
  positionY = 'positive';
  alreadyColide = false;
  speed = 1;
  increaseY = 0;
  restore = null;

  constructor(x, y, scenario) {
    this.x = x;
    this.y = y;
    this.scenario = scenario;

    this.restore = this.keepInitialValues(x, y, scenario, this.speed, this.increaseY, this.alreadyColide);
    this.render();
  }

  keepInitialValues(x, y, scenario, speed, increaseY, alreadyColide) {
    return () => {
      this.x = x;
      this.y = y;
      this.scenario = scenario;
      this.speed = speed;
      this.increaseY = increaseY;
      this.alreadyColide = alreadyColide;
    }
  }

  reset() {
    this.restore();
  }

  getXPosition() {
    return this.position;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getSpeed() {
    return this.speed;
  }

  _checkYPosition(playerY) {
    const PLAYER_HEIGHT = 80;
    const playerMiddle = playerY + (PLAYER_HEIGHT / 2);

    if (this.y > playerMiddle) {
      this.positionY = 'positive';
    }
    else {
      this.positionY = 'negative';
    }

    if (this.y < playerMiddle - 20 || this.y > playerMiddle + 20) {
      this.increaseY = 1;
    }
  }

  checkCollision(playerX, playerY, isPlayerOne) {
    const nextMoviment = this.x + this.speed;
    const PLAYER_HEIGHT = 80;
    const playerLocation = playerY + PLAYER_HEIGHT

    if (this.y >= playerY && this.y <= playerLocation) {
      if (nextMoviment >= playerX && !isPlayerOne) {
        this.position = 'left';
        this.speed += 0.1;
      
        if (!this.alreadyColide) {
          this.alreadyColide = true;
        }
        this._checkYPosition(playerY);
      }
      else if (this.x - this.speed <= playerX && isPlayerOne) {
        this.position = 'right';
        this.speed += 0.1;
        this._checkYPosition(playerY);
      }
    }
  }

  _checkCollisionWithWall() {
    if (this.y <= 0) {
      this.positionY = 'positive';
    }
    if (this.y >= this.scenario.y) {
      this.positionY = 'negative';
    }
  }

  calculatePosition() {

    this._checkCollisionWithWall();

    if (this.position === 'left') {
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }

    if (this.alreadyColide) {
      this.y = this.positionY === 'positive' ? this.y + this.speed + this.increaseY : this.y - this.speed - this.increaseY;
    }
  }

  render() {
    this.calculatePosition();
    const canvas = document.getElementById('scenario');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFF'
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }
}

export default Ball;