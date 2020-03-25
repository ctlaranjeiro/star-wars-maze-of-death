window.onload = () => {
    const $canvas = document.querySelector("canvas");
    const game = new Game($canvas);
    const maze = new Maze(game);
    const playAgainButtons = document.querySelectorAll(".play-again");
    document.getElementById("start-game").onclick = () => {
      game.start();
    };
    
    playAgainButtons.forEach(button => {
      button.addEventListener("click", () => {
        game.reset();
      });
    });
  };
  