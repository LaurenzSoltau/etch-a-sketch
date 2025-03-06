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
};

let gridLines = false;

const gridContainer = document.querySelector(".grid");

const gridSizeSlider = document.querySelector("#grid-slider");
gridSizeSlider.addEventListener("input", (e) => {
    grid = generateGrid(e.target.value);
    document.querySelector(
        "label"
    ).textContent = `Grid: ${e.target.value}x${e.target.value}`;
    drawGrid(grid);
    if (gridLines) {
        grid.forEach((gridItem) => gridItem.classList.add("grid-border"));
    }
});

document.querySelector("#grid-lines").addEventListener("click", (e) => {
    e.target.classList.toggle("button-toggle");
    toggleGridLines(grid);
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearGrid);

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", toggleDrawMode);

const shadingButton = document.querySelector("#shading");
shadingButton.addEventListener("click", toggleDrawMode);

const eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", toggleDrawMode);

function getColor() {
    if (drawState.toggleRainbow) {
        //generates random Hex Color
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    } else if (drawState.toggleEraser) {
        return gridContainer.style.backgroundColor;
    } else {
        return "rgba(0, 0, 0, 1)";
    }
}

function toggleDrawMode(e) {
    const id = e.target.id;

    if (id == "rainbow") {
        drawState.toggleRainbow = !drawState.toggleRainbow;
        drawState.toggleEraser = false;
        drawState.toggleShading = false;
        rainbowButton.classList.toggle("button-toggle");
        shadingButton.classList.remove("button-toggle");
        eraserButton.classList.remove("button-toggle");
    } else if (id == "shading") {
        drawState.toggleShading = !drawState.toggleShading;
        drawState.toggleRainbow = false;
        drawState.toggleEraser = false;
        shadingButton.classList.toggle("button-toggle");
        rainbowButton.classList.remove("button-toggle");
        eraserButton.classList.remove("button-toggle");
    } else {
        drawState.toggleEraser = !drawState.toggleEraser;
        drawState.toggleShading = false;
        drawState.toggleRainbow = false;
        eraserButton.classList.toggle("button-toggle");
        rainbowButton.classList.remove("button-toggle");
        shadingButton.classList.remove("button-toggle");
    }
}

function clearGrid() {
    const gridItems = Array.from(gridContainer.children);
    gridItems.forEach((gridItem) => {
        gridItem.style.backgroundColor = gridContainer.style.backgroundColor;
    });
}

function getShadedBlack(rgbaColor) {
    if (rgbaColor.split(",").length == 3) {
        return;
    } 
    const alpha = parseFloat(rgbaColor.slice(5, -1).split(",")[3]);
    return `rgba(0, 0, 0, ${alpha + 0.1})`;
}

function drawGridItem(e) {
    if (drawState.toggleShading) {
        if (e.target.style.backgroundColor == gridContainer.style.backgroundColor) {
            color = getShadedBlack("rgba(0, 0, 0, 0.1)");
        } else {
            color = getShadedBlack(e.target.style.backgroundColor);
        }
    } else {
        color = getColor();
    }
    e.target.style.backgroundColor = color;
}

function generateGrid(gridSize) {
    const containerSize = parseInt(
        window.getComputedStyle(gridContainer).width
    );
    const gridItemSize = (containerSize - 8) / gridSize;

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
    gridLines = !gridLines;
    for (gridItem of grid) {
        if (gridItem.classList.contains("grid-border")) {
            gridItem.classList.remove("grid-border");
        } else {
            gridItem.classList.add("grid-border");
        }
    }
}

function drawGrid(grid) {
    gridContainer.innerHTML = "";
    gridContainer.append(...grid);
}

let grid = generateGrid(16);
toggleGridLines(grid);
drawGrid(grid);
