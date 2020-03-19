class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        //linking the Game inside other classes
        this.maze = new Maze(this);
        this.player = new Player (this);

        //animation
        this.animationId;
        this.frame = 0;
    }

    start(){
        document.getElementById("intro-screen").style.visibility = "hidden";
        
        this.maze.draw();
        this.animation();
    }

    draw(){
        this.player.draw();        
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