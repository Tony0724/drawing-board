const saveBtn = document.getElementById("save");
const downloadApp = document.getElementById("Appdownload")
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 550;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
    isPainting = true;
}
function cancelPainting() {
    isPainting = false;
  // ctx.fill();
    ctx.beginPath();
}
function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick() {
    if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🩸 Fill";
    } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
    }
}
function onCanvasClick() {
    if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick() {
    if(!confirm("Are you sure to destory this?")) {
        return false
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}
function onDoubleClick(event) {
    let number = document.querySelector("#number");
    let sizeSelect = document.querySelector("#sizeSelect")
    let textValue = sizeSelect.options[sizeSelect.selectedIndex].text
    const text = textInput.value;
    if(number.value > 500) {
        alert("we can only support not more than 500px")
    } else if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `${number.value}${textValue} sans-serif`;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}
function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}
function save() {
    var htmlContent = [`<!DOCTYPE html> 
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>쉬운 그림 - easy picture</title>
        <link rel="icon" sizes="180x180" href="./assets/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicon-16x16.png">
        <link rel="manifest" href="./assets/site.webmanifest">
        <link rel="mask-icon" href="./assets/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
        <style>
        @import "reset.css";

        body {
            margin: 0 230px;
            display: flex;
            gap:20px;
            justify-content: flex-start;
            align-items: center;
            background-color: #f6f9fc;
            padding:20px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        canvas {
            width:800px;
            height:550px;
            border:5px solid black;
            background-color: white;
            border-radius:10px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .btns {
            position: absolute;
            right: 250px;
            display: flex;
            flex-direction: column;
            gap:20px;
        }
        
        .color-options {
            display: flex;
            flex-direction: row;
            gap:20px;
            align-items: center;
            position: absolute;
            bottom: 45px;
        }
        .color-option {
            width:50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            border:2px solid white;
            transition:transform ease-in-out .1s;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        
        }
        .color-option:hover {
            transform: scale(1.2);
        }
        input#color {
            background-color: white;
        }
        
        button,
        label {
            all:unset;
            padding:10px 0px;
            text-align: center;
            background-color:royalblue;
            color:white;
            font-weight: 500;
            cursor: pointer;
            border-radius: 10px;
            transition: opacity linear .1s;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        button:hover {
            opacity: 0.85;
        }
        
        input#file {
            display: none;
        }
        
        input#text {
            all:unset;
            padding:10px 0px;
            border-radius: 10px;
            font-weight: 500;
            text-align: center;
            background-color:white;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        input#number {
            width: 100px;
        }
        
        select#sizeSelect {
            position: absolute;
            right: 20px;
            top: 350px;
        }
        
        @media only screen and (min-width:700px) and (max-width:1000px) {
            body {
                margin: 0px;
            }
            .color-options {
                display: flex;
                flex-direction: row;
                gap:20px;
                align-items: center;
                position: absolute;
                bottom: 500px;
            }
            .btns {
                position: absolute;
                bottom: 30px;
                left: 20px;
                width: 200px;
                display: flex;
                flex-direction: column;
                gap:20px;
            }
        }
        
        @media only screen and (min-width:1010px) and (max-width:1200px) {
            body {
                margin: 0px;
            }
            .color-options {
                position: absolute;
                bottom: 150px;
            }
            .btns {
                position: absolute;
                right: 100px;
            }
        }
        </style>
    </head>
    <body>
        <canvas></canvas>
        <div class="color-options">
            <input type="color" id="color">
            <div class="color-option" style="background-color: #1abc9c;" data-color="#1abc9c"></div>
            <div class="color-option" style="background-color: #3498db;" data-color="#3498db"></div>
            <div class="color-option" style="background-color: #34495e;" data-color="#34495e"></div>
            <div class="color-option" style="background-color: #27ae60;" data-color="#27ae60"></div>
            <div class="color-option" style="background-color: #8e44ad;" data-color="#8e44ad"></div>
            <div class="color-option" style="background-color: #f1c40f;" data-color="#f1c40f"></div>
            <div class="color-option" style="background-color: #e74c3c;" data-color="#e74c3c"></div>
            <div class="color-option" style="background-color: #2ecc71;" data-color="#2ecc71"></div>
            <div class="color-option" style="background-color: #e67e22;" data-color="#e67e22"></div>
            <div class="color-option" style="background-color: rgb(255, 143, 162);" data-color="rgb(255, 143, 162)"></div>
        </div>
        <div class="btns">
            <input id="line-width" type="range" min="1" max="10" value="5" step="0.2">
            <button id="mode-btn">🩸 Fill</button>
            <button id="destroy-btn">💣 Destroy</button>
            <button id="eraser-btn">❌ Erase</button>
            <label for="file">
                💅🏻 Add Photo
                <input type="file" accept="image/*" id="file"
            /></label>
            <input type="text" id="text" placeholder="Add text here... :)" />
            <input type="number" id="number" value="1" min="1" max="500">
            <select id="sizeSelect">
                <option selected>px</option>
                <option>em</option>
                <option>rem</option>
                <option>%</option>
            </select>
            <button id="save">🖼 Save image</button>
        </div>
        <script>
        const saveBtn = document.getElementById("save");
        const textInput = document.getElementById("text");
        const fileInput = document.getElementById("file");
        const eraserBtn = document.getElementById("eraser-btn");
        const destroyBtn = document.getElementById("destroy-btn");
        const modeBtn = document.getElementById("mode-btn");
        const colorOptions = Array.from(
            document.getElementsByClassName("color-option")
        );
        const color = document.getElementById("color");
        const lineWidth = document.getElementById("line-width");
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        const CANVAS_WIDTH = 800;
        const CANVAS_HEIGHT = 550;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        ctx.lineWidth = lineWidth.value;
        ctx.lineCap = "round";
        let isPainting = false;
        let isFilling = false;
        function onMove(event) {
            if (isPainting) {
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                return;
            }
            ctx.moveTo(event.offsetX, event.offsetY);
        }
        function startPainting() {
            isPainting = true;
        }
        function cancelPainting() {
            isPainting = false;
          // ctx.fill();
            ctx.beginPath();
        }
        function onLineWidthChange(event) {
            ctx.lineWidth = event.target.value;
        }
        function onColorChange(event) {
            ctx.strokeStyle = event.target.value;
            ctx.fillStyle = event.target.value;
        }
        function onColorClick(event) {
            const colorValue = event.target.dataset.color;
            ctx.strokeStyle = colorValue;
            ctx.fillStyle = colorValue;
            color.value = colorValue;
        }
        function onModeClick() {
            if (isFilling) {
            isFilling = false;
            modeBtn.innerText = "🩸 Fill";
            } else {
            isFilling = true;
            modeBtn.innerText = "Draw";
            }
        }
        function onCanvasClick() {
            if (isFilling) {
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
        }
        function onDestroyClick() {
            if(!confirm("Are you sure to destory this?")) {
                return false
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
        }
        function onEraserClick() {
            ctx.strokeStyle = "white";
            isFilling = false;
            modeBtn.innerText = "Fill";
        }
        function onFileChange(event) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            const image = new Image();
            image.src = url;
            image.onload = function () {
                ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                fileInput.value = null;
            };
        }
        function onDoubleClick(event) {
            let number = document.querySelector("#number");
            let sizeSelect = document.querySelector("#sizeSelect")
            let textValue = sizeSelect.options[sizeSelect.selectedIndex].text
            const text = textInput.value;
            if(number.value > 500) {
                alert("we can only support not more than 500px")
            } else if (text !== "") {
                ctx.save();
                ctx.lineWidth = 1;
                ctx.font = number.value + textValue + 'sans-serif';
                ctx.fillText(text, event.offsetX, event.offsetY);
                ctx.restore();
            }
        }
        function onSaveClick() {
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.href = url;
            a.download = "myDrawing.png";
            a.click();
        }
        canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
        </script>
    </body>
    </html>`];
    var bl = new Blob(htmlContent, {type: "text/html"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "drawingApp.html";
    a.hidden = true;
    document.body.appendChild(a);
    a.click();
}
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
downloadApp.addEventListener("click", save)