class Game {
  constructor() {
    this.startScreen = document.getElementById("startScreen");
    this.gameScreen = document.getElementById("gameScreen");
    this.player = new Player();
    this.gameIsOver = false;
  }

  start() {
    this.startScreen.classList.add("hidden");
    this.gameScreen.classList.remove("hidden");
    this.update();
  }

  update() {
    if (this.gameIsOver) return;
    this.player.move();
    requestAnimationFrame(() => this.update());
  }
}
