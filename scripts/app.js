let isDrawing = false;
let selectedColor = "black";
let selectedCanvasSize = 16;

function initClearButtonEventHandler(){
  let clearButton = document.querySelector(".clear-button");
  clearButton.addEventListener("click", (e) => {
    console.log(clearButton);
    clearGrid();
  });
}

function initColorOptionEventHandlers(){
  let buttons = document.querySelectorAll(".colorBtn");
  let curSelectedBtn = document.querySelector(".selected");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if(button.classList.contains("selected")){
        return;
      }
      selectedColor = button.id;
      button.classList.add("selected");
      curSelectedBtn.classList.remove("selected");
      curSelectedBtn = button;
    }); 
  });
}

function clearGrid(){
  let cells = document.querySelectorAll(".column");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
}

function deleteGrid(){
  let gridContainer = document.querySelector(".grid-container");
  while(gridContainer.hasChildNodes()){
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

function initSizeBtnEventHandlers(){
  let buttons = document.querySelectorAll(".sizeBtn");
  let gridContainer = document.querySelector(".grid-container");
  let defaultBoxSize = 40;
  generateGrid(selectedCanvasSize, selectedCanvasSize, defaultBoxSize);
  buttons.forEach((button) => {
    button.addEventListener("click", (e) =>{
      let curSelectedSizeButton = document.querySelector("button.select-size");
      curSelectedSizeButton.classList.remove("select-size");
      button.classList.add("select-size");
      selectedCanvasSize = button.textContent.split("x")[0];
      let boxSize = 0;
      switch (selectedCanvasSize) {
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
      deleteGrid();
      generateGrid(selectedCanvasSize, selectedCanvasSize, boxSize);
    });
  });
}

function initGridEventHandlers(){
  let gridContainer = document.querySelector(".grid-container");
  gridContainer.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const gridItem = e.target;
    gridItem.style.backgroundColor = selectedColor;
  });
  gridContainer.addEventListener("mouseup", () => {
    isDrawing = false;
  });
  gridContainer.addEventListener("mouseleave", () => {
    isDrawing = false;
  });
  gridContainer.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        const gridItem = e.target;
        if (gridItem.classList.contains("column")) {
            gridItem.style.backgroundColor = selectedColor;
        }
    }
  });
  gridContainer.addEventListener("dragstart", (e) => {
    e.preventDefault();
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

initClearButtonEventHandler();
initSizeBtnEventHandlers();
initGridEventHandlers();
initColorOptionEventHandlers();