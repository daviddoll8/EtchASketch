
function generateGrid(height, width){
  let gridContainer = document.querySelector(".grid-container");
  console.log(gridContainer);
  for(let i = 0; i < height; i++){
    let curRow = i;
    let newRow = gridContainer.appendChild(
      Object.assign(
        document.createElement('div'),
        {
          className: 'row',
          id: curRow
        },
      )
    );
    for(let j = 0; j < width; j++){
      let curColumn = j;
      let curLocation = i.toString() + j.toString();
      let newColumn = newRow.appendChild(
       Object.assign(
        document.createElement('div'),
        { 
          className: "column",
          id: curLocation,          
        }
       )
      )
    }
  }
}

generateGrid(32, 32);