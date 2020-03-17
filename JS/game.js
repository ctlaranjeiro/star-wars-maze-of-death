class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        //linking the Game inside the Maze
        this.maze = new Maze(this);

        //animation
        this.animationId;
        this.frame = 0;
    }

    start(){
        document.getElementById("intro-screen").style.visibility = "hidden";
        this.animation();
    }

    draw(){
        this.maze.draw();
    }
    
    update(){
        this.frame++;
    }

    animation(){
        this.animationId = window.requestAnimationFrame(() => {
            this.animation();
        });
        
        this.draw();
        this.update();
    }

    
}