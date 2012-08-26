var C = document.getElementById("c");
var CTX = C.getContext("2d");
var W = C.width;
var H = C.height;
var XS = 0;
var YS = 0;

var global_mouse_areas = [];
var global_cur_mouse_area = false;

function voidfn() {;}

function rand(start, end) {
    return Math.floor(Math.random()*(end - start + 1)) + start;
}

function deg2rad(x) {
    return x*(Math.PI/180);
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
    sleft: false,
    sright: false,
    space: false
}

function set_mouse_areas(list) {
    global_mouse_areas = list;
}

function rm_mouse_areas() {
    global_mouse_areas = [];
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
    case 81:
        k = "sleft";
        break;
    case 69:
        k = "sright";
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

C.onmousemove = function(event) {
    var x, y;
    global_cur_mouse_area = false;
    if (event.offsetX) {
        x = event.offsetX;
        y = event.offsetY;
    } else if (event.layerX) {
        x = event.layerX;
        y = event.layerY;
    }
    var a;
    for (var i = 0; i < global_mouse_areas.length; i++) {
        a = global_mouse_areas[i];
        if (x > a.pos[0] && x < a.pos[0]+a.sz[0]
        &&  y > a.pos[1] && y < a.pos[1]+a.sz[1]) {
            global_cur_mouse_area = a;
            a.hover();
            return;
        }
    }
}

C.onclick = function() {
    if (global_cur_mouse_area !== false) {
        global_cur_mouse_area.click();
    }
}

