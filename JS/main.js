window.onload = () => {
    const $canvas = document.querySelector("canvas");
    const game = new Game($canvas);
    const maze = new Maze(game);
    const mainPageButtons = document.querySelectorAll(".main-page");
    
    const lightsaber = new Audio("/sound effect/light-saber.mp3");
    lightsaber.volume = 0.2;
    //lightsaber.src = "/sound effect/light-saber.mp3";
    
    // document.getElementById("start-game").onclick = () => {
    //     game.start();
    // };


    //LIGHTSABER SOUND EFFECT LEVELS
    document.querySelector(".easy").onmouseover = () => {
        lightsaber.play();
    };
    document.querySelector(".easy").onmouseout = () => {
        lightsaber.pause();
        lightsaber.currentTime = 0;
    };

    document.querySelector(".medium").onmouseover = () => {
        lightsaber.play();
    };
    document.querySelector(".medium").onmouseout = () => {
        lightsaber.pause();
        lightsaber.currentTime = 0;
    };

    document.querySelector(".hard").onmouseover = () => {
        lightsaber.play();
    };
    document.querySelector(".hard").onmouseout = () => {
        lightsaber.pause();
        lightsaber.currentTime = 0;
    };




    //GAME START ON CLICK

    document.querySelector(".easy").onclick = () => {
        game.start(10,5);
    };

    document.querySelector(".medium").onclick = () => {
        game.start(15,10);
    };

    document.querySelector(".hard").onclick = () => {
        game.start(20,15);
    };


    //MAIN PAGE LIGHTSABER SOUND EFFECTS
    mainPageButtons.forEach(button => {
        button.addEventListener("mouseover", () => {
            lightsaber.play();
        });
    });

    mainPageButtons.forEach(button => {
        button.addEventListener("mouseout", () => {
            lightsaber.pause();
            lightsaber.currentTime = 0;
        });
    });

    //MAIN PAGE BUTTONS
    mainPageButtons.forEach(button => {
        button.addEventListener("click", () => {
            //game.reset();
            location.reload();
        });
    });
};