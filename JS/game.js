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
        this.collectables = [];

        //random enemies
        this.enemies = [];

        //animation
        this.animationId;
        this.frame = 0;
    }

    start() {

        document.getElementById("intro-screen").style.visibility = "hidden";
        //document.querySelector(".win").style.visibility = "visible";
        //document.querySelector(".game-over").style.visibility = "visible";

        this.maze.setup();
        this.boss.endCell();
        this.player.currentPlayerCell();

        while (this.collectables.length < 10) {
            this.collectables.push(new Collect(this.maze));

            for (let i = 0; i < this.collectables.length; i++) {
                this.collectables[i].setRandomPosition();
            }
        }
        //console.log(this.collectables);

        while (this.enemies.length < 20) {
            this.enemies.push(new Enemy(this.maze));

            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].setRandomPosition();
                // for (let j = 0; j < this.enemies.length; j++){
                //     if (this.enemies[i].x === this.enemies[j+1].x){
                //         console.log("equal x coordinate")
                //         this.enemies[j].i += 1;
                //     }
                // }
                //console.log(`Enemy ${i} - i: ${this.enemies[i].i}, j: ${this.enemies[i].j}`);
            }
        }

        //enemies movement
        for (let i = 0; i < this.enemies.length; i++) {
            if (i % 2 === 0){
                setInterval(() => {
                        this.enemies[i].addMovement("left");
                    setTimeout(() => {
                        this.enemies[i].addMovement("right");
                    }, 1000);  
                }, 2000);
            } else{
                setInterval(() => {
                    this.enemies[i].addMovement("up");
                setTimeout(() => {
                    this.enemies[i].addMovement("down");
                }, 1000);  
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
            }
        }

        //Crash with enemies
        for (let i = 0; i < this.enemies.length; i++) {
            if(this.player.x === this.enemies[i].x && this.player.y === this.enemies[i].y){
                this.gameOver();
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
            } else {
                console.log("GAME OVER!");
                document.querySelector(".game-over").style.visibility = "visible";
            }
            window.cancelAnimationFrame(this.animationId);
        }
    }

    gameOver() {
        console.log("GAME OVER!");
        document.querySelector(".game-over").style.visibility = "visible";
        window.cancelAnimationFrame(this.animationId);
    }

    reset() {
        // this.maze = new Maze(this);
        // this.player = new Player(this.maze);
        // this.player.setControls();
        // this.boss = new Boss(this.maze);
        // this.collectables = [];
        // this.frame = 0;
    }

}