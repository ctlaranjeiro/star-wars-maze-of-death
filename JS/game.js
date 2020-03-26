class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        //linking the Game inside other classes
        this.maze = new Maze(this);
        this.player = new Player(this.maze);
        this.player.setControls();
        this.boss = new Boss(this.maze);
        //this.enemy = new Enemy(this.maze);
        //this.collect = new Collect(this.maze);

        //random collectables
        this.maxNumCollect = 0;
        this.collectables = [];
        this.saved = 0;

        //random enemies
        this.maxNumEnemies = 0;
        this.enemies = [];

        //animation
        this.animationId;
        this.frame = 0;

        this.intervalID;
    }

    start(numCollectables, numEnemies) {

        this.maxNumCollect = numCollectables;
        this.maxNumEnemies = numEnemies;

        document.getElementById("intro-screen").style.visibility = "hidden";
        document.getElementById("score").style.visibility = "visible";
        document.getElementById("saved").innerHTML = `WOOKIEES SAVED: ${this.saved}/${this.maxNumCollect}`;
        //document.querySelector(".win").style.visibility = "visible";
        //document.querySelector(".game-over").style.visibility = "visible";


        this.maze.setup();
        this.boss.endCell();
        this.player.currentPlayerCell();

        while (this.collectables.length < this.maxNumCollect) {
            this.collectables.push(new Collect(this.maze));
            for (let i = 0; i < this.collectables.length; i++) {
                this.collectables[i].setRandomPosition();
                if (i % 2 === 0) {
                    //console.log("2");
                    this.collectables[i].x += this.collectables[i].width;
                } else if (i % 3 === 0) {
                    this.collectables[i].y += this.collectables[i].height;
                }
            }
        }
        //console.log(this.collectables);
        while (this.enemies.length < this.maxNumEnemies) {
            this.enemies.push(new Enemy(this.maze));
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].setRandomPosition();
                //   if (i % 2 === 0) {
                //     this.collectables[i].x += this.collectables[i].width;
                //   } else if (i % 3 === 0) {
                //     this.collectables[i].y += this.collectables[i].height;
                //   }
            }
        }

        //enemies movement
        for (let i = 0; i < this.enemies.length; i++) {

            if (i % 2 === 0) {
                setInterval(() => {
                    this.enemies[i].addMovement("left");
                    setTimeout(() => {
                        this.enemies[i].addMovement("up");
                    }, 500);
                    setTimeout(() => {
                        this.enemies[i].addMovement("right");
                    }, 1000);
                    setTimeout(() => {
                        this.enemies[i].addMovement("down");
                    }, 1500);
                }, 2000);
            } else {
                setInterval(() => {
                    this.enemies[i].addMovement("up");
                    setTimeout(() => {
                        this.enemies[i].addMovement("left");
                    }, 500);
                    setTimeout(() => {
                        this.enemies[i].addMovement("down");
                    }, 1000);
                    setTimeout(() => {
                        this.enemies[i].addMovement("right");
                    }, 1500);
                }, 2000);
            }

        }

        //console.log(this.enemies);

        this.animation();
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.boss.draw();
        this.player.draw();

        //this.collect.draw();

        //collectables
        for (let i = 0; i < this.collectables.length; i++) {
            //console.log(this.collectables[i]);
            this.collectables[i].draw();
        }

        //enemies
        for (let i = 0; i < this.enemies.length; i++) {
            //console.log(this.enemies[i]);
            this.enemies[i].draw();
        }


        this.maze.draw();
    }

    update() {
        this.frame++;

        //console.log(this.collectables);

        //Catch collectables
        for (let i = 0; i < this.collectables.length; i++) {
            if (this.player.x === this.collectables[i].x && this.player.y === this.collectables[i].y) {
                //console.log("Collected!");
                this.collectables.splice(i, 1);
                this.saved += 1;
                document.getElementById("saved").innerHTML = `WOOKIEES SAVED: ${this.saved}/${this.maxNumCollect}`;

                //console.log(this.saved);
            }
        }

        //Crash with enemies
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.player.x === this.enemies[i].x && this.player.y === this.enemies[i].y) {
                this.gameOver();
                document.querySelector("#kill").innerHTML = "You got killed by a Stormtrooper!";
            }
        }

        this.gameResult();
    }

    animation() {
        this.animationId = window.requestAnimationFrame(() => {
            this.animation();
        });

        this.draw();
        this.update();
    }

    gameResult() {
        if (this.player.i === this.boss.i && this.player.j === this.boss.j) {
            if (this.collectables.length <= 0) {
                console.log("You won!");
                document.querySelector(".win").style.visibility = "visible";
                window.cancelAnimationFrame(this.animationId);
            } else {
                this.gameOver();
                document.querySelector("#kill").innerHTML = "Chewbacca didn't agreed to this. </br> You have to save every Wookiee.";
            }
        }
    }

    gameOver() {
        console.log("GAME OVER!");
        document.querySelector(".game-over").style.visibility = "visible";
        window.cancelAnimationFrame(this.animationId);
    }

    // reset() {
    //     console.log("Play Again Clicked!");
    //     this.maze = new Maze(this);
    //     this.player = new Player(this.maze);
    //     this.player.setControls();
    //     this.boss = new Boss(this.maze);
    //     //random collectables
    //     this.maxNumCollect = 10;
    //     this.collectables = [];
    //     this.saved = 0;
    //     //random enemies
    //     this.maxNumEnemies = 8;
    //     this.enemies = [];
    //     //animation
    //     this.frame = 0;

    //     document.querySelectorAll(".end-game").forEach(div => {
    //         div.style.visibility = "hidden";
    //     });

    //     this.start();
    // }

}