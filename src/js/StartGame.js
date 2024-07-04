const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const gameScreen = document.getElementById("gameScreen");

class StartGame {
  constructor(startScreen, startBtn, gameScreen) {
    this.startScreen = startScreen;
    this.startBtn = startBtn;
    this.gameScreen = gameScreen;

    this.startBtn.addEventListener("click", () => {
      this.start();
    });
  }

  start() {
    console.log("Game Runing...");

    this.startScreen.classList.add("hidden");
    this.gameScreen.classList.remove("hidden");
  }
}

const gameInstance = new StartGame(startScreen, startBtn, gameScreen);
