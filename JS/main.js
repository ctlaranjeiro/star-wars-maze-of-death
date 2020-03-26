window.onload = () => {
    const $canvas = document.querySelector("canvas");
    const game = new Game($canvas);
    const maze = new Maze(game);
    const mainPagenButtons = document.querySelectorAll(".main-page");

    // document.getElementById("start-game").onclick = () => {
    //     game.start();
    // };

    document.querySelector(".easy").onclick = () => {
        game.start(10,5);
    };

    document.querySelector(".medium").onclick = () => {
        game.start(15,10);
    };

    document.querySelector(".hard").onclick = () => {
        game.start(20,15);
    };

    mainPagenButtons.forEach(button => {
        button.addEventListener("click", () => {
            //game.reset();
            location.reload();
        });
    });
};