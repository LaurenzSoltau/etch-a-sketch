// TODO generate grid

// TODO color black on hover

// TODO clear with button:

// TODO change gridsize with slider

// TODO toogle gridLines

// TODO Toggle Rainbow

// TODO toggle shading

// TODO toggle eraser

let drawState = {
    toggleRainbow: false,
    toggleShading: false,
    toggleEraser: false,
}

const gridContainer = document.querySelector(".grid");
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearGrid);


function clearGrid() {
    const gridItems = Array.from(gridContainer.children);
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = gridContainer.style.backgroundColor;
    })
} 

function drawGridItem(e) {
    e.target.style.backgroundColor = "black";
}


function generateGrid(gridSize) {
    const containerSize = parseInt(window.getComputedStyle(gridContainer).width);
    const gridItemSize = containerSize / gridSize;
    console.log(gridItemSize)
    
    let grid = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement("div");
        gridItem.style.height = gridItemSize + "px";
        gridItem.style.width = gridItemSize + "px";
        gridItem.style.backgroundColor = gridContainer.style.backgroundColor;
        gridItem.addEventListener("mouseover", drawGridItem);
        grid.push(gridItem);
    }
    return grid;
}


function toggleGridLines(grid) {
    for (gridItem of grid) {
        if (gridItem.classList.contains("grid-border")) {
            gridItem.classList.remove("grid-border");
        } else {
            gridItem.classList.add("grid-border");
        }
    }
}

function drawGrid(grid) {
    gridContainer.append(...grid);
}

const grid = generateGrid(16);
toggleGridLines(grid);
drawGrid(grid);