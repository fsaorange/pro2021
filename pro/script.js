



function Renderboard(numRows,numCols,grid){
    let boardEl = document.querySelector("#board")

    for (let i=0;i<numRows;i++) {
        let trEl =document.createElement("tr")

        for (let j=0;j<numCols;j++) {
            let cellEl =document.createElement("div")
            cellEl.className="cell"
            cellEl.innerText=grid[i][j];

            let tdEl =document.createElement("td")
            tdEl.append(cellEl);

            trEl.append(tdEl);
        }

        boardEl.append(trEl);
    }
}

function Initialize(numRows,numCols,numMines){
    let grid = new Array(numRows)
    for (let i=0;i<numRows;i++){
        grid[i] = new Array(numCols);
        for (let j=0;j<numCols;j++){
            grid[i][j]=0;
        }
    }

    let mines = [];
    for (let k=0;k<numMines;k++){
        let cellMl = Math.trunc(Math.random() * numCols * numRows);
        let row = Math.trunc(cellMl / numCols);
        let col = cellMl % numCols
        console.log(cellMl,row,col);

        grid[row][col]=-1
        mines.push([row,col]);


    }
    console.log(grid);

    return grid;
}

let grid = Initialize(15,20,20);
Renderboard(15,20,grid);