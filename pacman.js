/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
X...............X............OX
X.XXXXX.XXXXXXXXX.XXXXXXXXXXX.X
X.XXXXX.XXXXXXXXX.XXXXXXXXXXX.X
X.............................X
X.XXXXX.XX.XXXXXXXXXXX.XX.XXX.X
XO......XX......X.O....XX.....X
XXXXXXX.XXXXXXX.X.XXXXXXX.XXXXX
      X.XX.............XX.X
XXXXXXX.XX.XXXXX-XXXXX.XX.XXXXX
X..........X a b c d X........X
XXXXXXX.XX.XXXXXXXXXXX.XX.XXXXX
      X.XX.XXXXXXXXXXX.XX.X
XXXXXXX.XX.XXXXXXXXXXX.XX.XXXXX
XO.............XX............OX
X.XXX.XXXXXXXX.XX.XXXXXXXXXX .X
X....p........................X
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/
var map = [
["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
["X",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","X",".",".",".",".",".",".",".",".",".",".",".",".","O","X"],
["X",".","X","X","X","X","X",".","X","X","X","X","X","X","X","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X"],
["X",".","X","X","X","X","X",".","X","X","X","X","X","X","X","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X"],
["X",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","X"],
["X",".","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X",".","X"],
["X","O",".",".",".",".",".",".","X","X",".",".",".",".",".",".","X",".","O",".",".",".",".","X","X",".",".",".",".",".","X"],
["X","X","X","X","X","X","X",".","X","X","X","X","X","X","X",".","X",".","X","X","X","X","X","X","X",".","X","X","X","X","X"],
[" "," "," "," "," "," ","X",".","X","X",".",".",".",".",".",".",".",".",".",".",".",".",".","X","X",".","X"],
["X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","-","X","X","X","X","X",".","X","X",".","X","X","X","X","X"],
["X",".",".",".",".",".",".",".",".",".",".","X"," ","a"," ","b"," ","c"," ","d"," ","X",".",".",".",".",".",".",".",".","X"],
["X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X"],
[" "," "," "," "," "," ","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X"],
["X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X"],
["X","O",".",".",".",".",".",".",".",".",".",".",".",".",".","X","X",".",".",".",".",".",".",".",".",".",".",".",".","O","X"],
["X",".","X","X","X",".","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X"," ",".","X"],
["X",".",".",".",".","p",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","X"],
["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
];

var PM_TILE_SZ = Math.round((W-40)/map[0].length);

function pacman_init() {

}

function pm_draw_map(blink) {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    for (var y=0; y<map.length; y++) {
        for (var x=0; x<map[y].length; x++) {
            if (map[y][x] == "X") {
                CTX.fillStyle = "#3333ff";
                CTX.fillRect(x*PM_TILE_SZ+dx, y*PM_TILE_SZ+dy, PM_TILE_SZ, PM_TILE_SZ);
            } else if (map[y][x] == ".") {
                CTX.fillStyle = "#ffff33";
                CTX.beginPath();
                var off = PM_TILE_SZ/2;
                CTX.arc(x*PM_TILE_SZ+dx+off, y*PM_TILE_SZ+dy+off, PM_TILE_SZ/5, 0, 2 * Math.PI, false);
                CTX.fill();
            } else if (map[y][x] == "O" && blink) {
                CTX.fillStyle = "#ffffff";
                CTX.beginPath();
                var off = PM_TILE_SZ/2;
                CTX.arc(x*PM_TILE_SZ+dx+off, y*PM_TILE_SZ+dy+off, PM_TILE_SZ/3, 0, 2 * Math.PI, false);
                CTX.fill();
            }
        }
    }
}

var cnt = 0;
function pacman_frame(dt) {
    pm_draw_map((cnt++ > 10));
    if (cnt > 30) {
        cnt = 0;
    }

    return true; // go on
}

function pacman_ctrl_hint() {
    return {"w or up-arrow   ": "up",
            "s or down-arrow ": "down",
            "a or left-arrow ": "left",
            "d or right-arrow": "right",
    };
}
