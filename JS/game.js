class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        //linking the Game inside other classes
        this.maze = new Maze(this);
        this.player = new Player (this.maze);
        this.player.setControls();

        //animation
        this.animationId;
        this.frame = 0;
    }

    start(){
        document.getElementById("intro-screen").style.visibility = "hidden";
        
        this.maze.setup();
        this.animation();
    }

    draw(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.player.draw();  
        this.maze.draw();
    }
    
    update(){
        this.frame++;
        this.player.update();
    }

    animation(){
        this.animationId = window.requestAnimationFrame(() => {
            this.animation();
        });
        
        this.draw();
        this.update();
    }

    
}