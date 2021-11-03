import Scenario from './scenario.js';
import Player from './player.js';
import Ball from './ball.js';

const SCENARIO_HEIGHT = 500;
const SCENARIO_WIDTH = 800;
const PLAYER_HEIGHT = 80;
const BALL_WIDTH = 20;

let timeOutLoop = null;

let scenario = null;
let player = null;
let player2 = null;
let ball = null;
let isFinished = false;

function gameLoop() {
  scenario.render();
  player.render();
  player2.renderIAPlayer(ball.getY(), ball.getSpeed(), ball.getXPosition());
  ball.checkCollision(player2.getX(), player2.getY(), player2.getIsPlayerOne());
  ball.checkCollision(player.getX() + 10, player.getY(), player.getIsPlayerOne());
  ball.render();
  
  if (ball.getX() + BALL_WIDTH < player.getX()) {
    clearInterval(timeOutLoop);
    isFinished = true;
    scenario.addPlayer2Points();
    scenario.render({ isFinished });
  }
  else if (ball.getX() > player2.getX() + 10 + BALL_WIDTH) {
    clearInterval(timeOutLoop);
    isFinished = true;
    scenario.addPlayer1Points();
    scenario.render({ isFinished });
  }
}

const onKeyDown = (e) => {
  if (e.keyCode === 32 && isFinished) {
    ball.reset();
    player.reset();
    player2.reset();
    isFinished = false;
    startTimeout();
  }
}

const startTimeout = () => {
  timeOutLoop = setInterval(() => {
    gameLoop()
  }, 1000 / 600);
}

window.onload = () => {
  document.addEventListener('keydown', onKeyDown );
  scenario = new Scenario(SCENARIO_WIDTH, SCENARIO_HEIGHT, "#000");
  scenario.render();
  const scenarioSize = { x: scenario.getWidth(), y: scenario.getHeight() };
  player = new Player(10, (SCENARIO_HEIGHT / 2) - PLAYER_HEIGHT / 2, PLAYER_HEIGHT, true, scenarioSize);
  player2 = new Player(SCENARIO_WIDTH - 20, (SCENARIO_HEIGHT / 2) - PLAYER_HEIGHT / 2, PLAYER_HEIGHT, false, scenarioSize);
  console.log({ scenarioWidth: scenario.getWidth()})
  ball = new Ball(SCENARIO_WIDTH / 2, SCENARIO_HEIGHT / 2, scenarioSize);

  startTimeout();
}