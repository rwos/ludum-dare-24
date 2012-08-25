var C = document.getElementById("c");
var CTX = C.getContext("2d");
var W = C.width;
var H = C.height;
var XS = 0;
var YS = 0;

function rand(start, end) {
    return Math.floor(Math.random()*(end - start + 1)) + start;
}

function clear(col) {
    CTX.fillStyle = col;
    CTX.fillRect(XS, YS, W, H);
}

var KEY = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
}

function key_change(code, down) {
    var k;
    switch (code) {
    case 38:
    case 87:
        k = "up";
        break;
    case 40:
    case 83:
        k = "down";
        break;
    case 65:
    case 37:
        k = "left";
        break
    case 68:
    case 39:
        k = "right";
        break;
    case 32:
        k = "space";
        break;
    }
    if (down) {
        KEY[k] = true;
    } else {
        KEY[k] = false;
    }
}

document.body.onkeydown = function(event) {
    event = event || window.event;
    var code = event.keyCode;
    key_change(code, true);
}

document.body.onkeyup = function(event) {
    event = event || window.event;
    var code = event.keyCode;
    key_change(code, false);
}

