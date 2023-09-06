function initEventHandlers(){
  let buttons = document.querySelectorAll(".sizeBtn");
  let gridContainer = document.querySelector(".grid-container");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) =>{
      let selectedSize = button.textContent.split("x")[0];
      let boxSize = 0;
      while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.lastChild);
      }
      switch (selectedSize) {
        case "16":
          boxSize = 40;
          break;
        case "32":
          boxSize = 20;
          break;
        case "64":
          boxSize = 10;
          break;
        case "128":
          boxSize = 5;
          break;
        default:
          boxSize = 25;
      }
      generateGrid(selectedSize, selectedSize, boxSize);
    });
  }); 
}


function generateGrid(height, width, boxSize){
  let gridContainer = document.querySelector(".grid-container");
  let boxSizeHeight = "height: " + boxSize + "px;";
  let boxSizeWidth = "width: " + boxSize + "px;";
  console.log(gridContainer);
  for(let i = 0; i < height; i++){
    let curRow = i;
    let newRow = gridContainer.appendChild(
      Object.assign(
        document.createElement('div'),
        {
          className: 'row',
          id: curRow,
          style: boxSizeHeight
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
          style: boxSizeHeight + boxSizeWidth       
        }
       )
      )
    }
  }
}

initEventHandlers();
//generateGrid(32, 32, 20);