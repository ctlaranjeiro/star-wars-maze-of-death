class Maze{
    constructor (game){
        this.context = game.context;
        this.width = game.width;
        this.height = game.height;

        this.cols = 0;
        this.rows = 0;

        //linking the Cell inside the Maze
        this.cell = new Cell(this);

        this.cellWidth = this.cell.width;
        this.cellHeight = this.cell.height;

        this.grid = [];
    }

    setup(){
        this.cols = Math.floor(this.width / this.cellWidth);
        this.rows = Math.floor(this.height / this.cellHeight);

        for (let j = 0; j < this.rows; j++){
            for (let i = 0; i < this.cols; i++){
                let cell = new Cell (i,j);
                this.grid.push(cell);
            }
        }
    }

    draw(){
        // console.log("Maze and Game are linked");
        // this.cell.show();
        this.setup();
        console.log(this.grid);
    }

    index(){

    }

    removeWalls(a,b){

    }
}