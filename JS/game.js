class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
    }

    start(){
        document.getElementById("intro-screen").style.visibility = "hidden";
    }

    
}