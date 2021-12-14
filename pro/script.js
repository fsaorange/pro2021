



function Renderboard(numRows,numCols){
    let boardEl = document.querySelector("#board")

    for(let i=0;i<numRows;i++){
        let trEl =document.createElement("tr")
        let cellEl =document.createElement("div")
        cellEl.className="cell"

        for(let j=0;j<numCols;j++){
            let tdEl =document.createElement("td")
            tdEl.append(cellEl)

            trEl.appeend(tdEl)
        }

        boardEl.append(trEl)
    }
}

Renderboard(20,15);