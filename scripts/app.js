let isDrawing = false;
let selectedColor = "black";

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

function initSizeBtnEventHandlers(){
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


initSizeBtnEventHandlers();
initGridEventHandlers();
initColorOptionEventHandlers();