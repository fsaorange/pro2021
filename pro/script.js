



function Renderboard(numRows,numCols){
    let boardEl = document.querySelector("#board")

    for (let i=0;i<numRows;i++) {
        let trEl =document.createElement("tr")

        for (let j=0;j<numCols;j++) {
            let cellEl =document.createElement("div")
            cellEl.className="cell"

            let tdEl =document.createElement("td")
            tdEl.append(cellEl)

            trEl.append(tdEl)
        }

        boardEl.append(trEl)
    }
}

Renderboard(15,20);