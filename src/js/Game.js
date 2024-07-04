class Game {
  constructor() {
    this.startScreen = document.getElementById("startScreen");
    this.gameScreen = document.getElementById("gameScreen");
    this.player = new Player();
    this.randomPlayer = new RandomPlayer();
    this.gameIsOver = false;
  }

  start() {
    this.startScreen.classList.add("hidden");
    this.gameScreen.classList.remove("hidden");
    this.update();
    this.startGeneratingFigures();
  }

  update() {
    if (this.gameIsOver || this.player.figuresEaten >= 3) return;
    this.player.move();
    this.randomPlayer.moveRandomly();
    requestAnimationFrame(() => this.update());
  }

  startGeneratingFigures() {
    this.generateFigure(); //Generate an initial figure
    setInterval(() => this.generateFigure(), 3000); // Generate a figure every 3 seconds
  }

  generateFigure() {
    const figure = document.createElement("div");
    figure.classList.add("figure");
    figure.style.left = `${
      Math.random() * (this.gameScreen.clientWidth - 50)
    }px`;
    figure.style.top = `${
      Math.random() * (this.gameScreen.clientHeight - 50)
    }px`;
    this.gameScreen.appendChild(figure);
  }

  resetGame() {
    // Reset game state here if needed.
  }
}

window.onload = () => {
  const game = new Game();
  document
    .getElementById("startBtn")
    .addEventListener("click", () => game.start());
};
