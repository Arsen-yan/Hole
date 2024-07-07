window.onload = () => {
  const game = new Game();
  document
    .getElementById("startBtn")
    .addEventListener("click", () => game.start());
  document
    .getElementById("resetBtn")
    .addEventListener("click", () => game.start());
};
