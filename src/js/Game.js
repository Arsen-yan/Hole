class Game {
  constructor() {
    this.startScreen = document.getElementById("startScreen");
    this.gameScreen = document.getElementById("gameScreen");
    this.testImg = document.getElementById("testImg");
    this.resetScreen = document.getElementById("resetScreen");
    this.gameSummary = document.getElementById("gameSummary");
    this.gameAudio = new Audio("src/assets/sounds/audio2.mp3");

    this.player = new Player();
    this.randomPlayer = new RandomPlayer();
  }

  start() {
    this.player.figuresEaten = 0;
    this.randomPlayer.figuresEaten = 0;
    this.resetScreen.classList.add("hidden");
    this.startScreen.classList.add("hidden");
    this.gameScreen.classList.remove("hidden");
    this.update();
    this.startGeneratingFigures();
    this.gameAudio.play();
    // this.startAudio.play();
    //audio("src/assets/sounds/audio2.mp3");
  }

  update() {
    if (this.player.figuresEaten >= 5 || this.randomPlayer.figuresEaten >= 5) {
      this.resetGame();
    }
    this.player.move();
    // this.randomPlayer.moveRandomly();
    requestAnimationFrame(() => this.update());
  }

  startGeneratingFigures() {
    let int;
    this.generateFigure(); //Generate an initial figure
    int = setInterval(() => {
      if (
        this.player.figuresEaten >= 5 ||
        this.randomPlayer.figuresEaten >= 5
      ) {
        clearInterval(int);
      }
      this.generateFigure();
    }, 2500); // Generate a figure every 2.5 seconds
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
    this.gameScreen.classList.add("hidden");
    this.resetScreen.classList.remove("hidden");
    if (this.randomPlayer.figuresEaten > this.player.figuresEaten) {
      this.gameSummary.innerHTML = "YoU LoSe";
    } else {
      this.gameSummary.innerHTML = "YoU WiN";
    }
    audio("src/assets/sounds/audio2.mp3");
  }
}
