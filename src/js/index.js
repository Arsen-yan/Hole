window.onload = () => {
  const game = new Game();
  document
    .getElementById("startBtn")
    .addEventListener("click", () => game.start());
};
