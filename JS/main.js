window.onload = () => {
    const $canvas = document.querySelector("canvas");
    const game = new Game($canvas);
    const maze = new Maze(game);
    
    document.getElementById('start-game').onclick = () => {
        game.start();
    };
}