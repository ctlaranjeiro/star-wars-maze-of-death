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
        //this.collect = new Collect(this.maze);

        //random collectables
        this.collectables = [];

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


        this.maze.draw();
    }

    update() {
        this.frame++;

        //console.log(this.collectables);

        //Catch collectables
        for (let i = 0; i < this.collectables.length; i++) {
            if (this.player.x === this.collectables[i].x && this.player.y === this.collectables[i].y){
                //console.log("Collected!");
                this.collectables.splice(i, 1);
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
            if(this.collectables.length <= 0){
                console.log("You won!");
                document.querySelector(".win").style.visibility = "visible";
            } else{
                console.log("GAME OVER!");
                document.querySelector(".game-over").style.visibility = "visible";
            }
            window.cancelAnimationFrame(this.animationId);
        }
    }

    reset(){
        // this.maze = new Maze(this);
        // this.player = new Player(this.maze);
        // this.player.setControls();
        // this.boss = new Boss(this.maze);
        // this.collectables = [];
        // this.frame = 0;
    }

}