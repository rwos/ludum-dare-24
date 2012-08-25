var C = document.getElementById("c");
var CTX = C.getContext("2d");
var W = C.width;
var H = C.height;
var XS = 0;
var YS = 0;

function clear(col) {
    CTX.fillStyle = col;
    CTX.fillRect(XS, YS, W, H);
}

function main() {
    clear("#000000");
}
main();

