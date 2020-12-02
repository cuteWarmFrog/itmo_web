function drawBase() {
    let canvas = document.getElementById('graphicCanvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let centerX = width / 2;
    let centerY = height / 2;
    let r = height / 3;

    //CLEAR
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.rect(0,0, 800, 400);
    ctx.fill()

    ctx.fillStyle = 'orange';

    //TRIANGLE
    ctx.beginPath()
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - r / 2);
    ctx.lineTo(centerX + r / 2, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    //rect
    ctx.beginPath();
    ctx.fillRect(centerX, centerY, r, r);

    //circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, Math.PI/180 * 90, Math.PI);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();

    //AXIS
    ctx.fillStyle = 'black';

    //X
    ctx.beginPath();
    ctx.moveTo(centerX - centerY * 1.5, centerY);
    ctx.lineTo(centerX + centerY * 1.5, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + centerY * 1.5, centerY);
    ctx.lineTo(centerX + centerY * 1.5 - 10, centerY - 10);
    ctx.lineTo(centerX + centerY * 1.5 - 10, centerY + 10);
    ctx.closePath();
    ctx.fill();

    //Y
    ctx.moveTo(centerX, height);
    ctx.lineTo(centerX, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX - 10, 10);
    ctx.lineTo(centerX + 10, 10);
    ctx.closePath();
    ctx.fill();

}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#submit').addEventListener('click', submit);
    document.getElementById('graphicCanvas').addEventListener('click', (e) => {
        processClickInput(e);
    })
    drawBase();
})

function processClickInput(e) {
    if(checkR()) {
        drawBase();
        putADot(e.clientX, e.clientY);
        sendThisShit(e)
    }
}


function putADot(x, y) {
    const canvas = document.getElementById('graphicCanvas');
    const rect = canvas.getBoundingClientRect();
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x - rect.left, y - rect.top);
    ctx.arc(x - rect.left, y - rect.top, 7, 0, Math.PI*2, true);
    ctx.fill();
}
function sendThisShit(e) {
    let canvas = document.getElementById('graphicCanvas');
    let rect = canvas.getBoundingClientRect();
    let r = getNumberFromRadioInput('r');
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    let x = r * (e.clientX - rect.left - width / 2) / (height / 3);
    let y = -r * (e.clientY - rect.top - height / 2) / (height / 3);
    let result = sendForm(x, y, r, false);
    result
        .then(data => data.text())
        .then(data => document.getElementById('table').innerHTML = data);
}

function submit() {
    if(checkX() && checkY() && checkR()) {
        const x = getNumberFromTextInput('#x');
        const y = getNumberFromRadioInput('y');
        const r = getNumberFromRadioInput('r');
        drawBase();
        let result = sendForm(x, y, r, true);
        result
            .then(data => data.text())
            .then(data => document.getElementById('table').innerHTML = data);
        }

}

function checkX() {
    const x = getNumberFromTextInput('#x');
    const isSuited = !(isNaN(x) || x < -5 || x > 3);
    if(!isSuited)
        alert('X might be between -5 and 3');
    return isSuited;
}

function getNumberFromTextInput(selector) {
    return parseFloat(document.querySelector(selector).value.replace(',', '.'));
}

function checkY() {
    const chosen = getNumberFromRadioInput('y');
    if(!chosen)
        alert('Please, choose Y');
    return !!chosen;

}

function getNumberFromRadioInput(selector) {
    let el = [...document.getElementsByName(selector)].filter(el => el.checked);
    if(el.length > 0) {
        return el[0].value;
    } else {
        return false;
    }
}

function checkR() {
    const chosen = getNumberFromRadioInput('r');
    if(!chosen)
        alert('Please, choose R');
    return !!chosen;
}

function sendForm(x, y ,r, isLimited) {
    const localUrl = 'http://localhost:8080/lab2-1.0-SNAPSHOT/Hello';
    const heliosUrl = 'http://0.0.0.0:12000/lab2-1.0-SNAPSHOT/Hello';
    return fetch(localUrl, {
        method: 'POST',
        body: createFormData(x, y, r, isLimited)
    })
}
function createFormData(x, y, r, isLimited) {

    const formData = new FormData();
    formData.append('x', x);
    formData.append('y', y);
    formData.append('r', r);
    formData.append('limited', isLimited)
    return formData;
}