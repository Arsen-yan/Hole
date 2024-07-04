window.onload = () => {
  const game = new Game();
  document
    .getElementById("startBtn")
    .addEventListener("click", () => game.start());
};

// function audio(url) {
//   const audio = document.createElement("audio");
//   audio.src = url;
//   audio.play();
// }
// audio(""); //
