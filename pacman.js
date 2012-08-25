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
["X",".","X","X","X","X","X",".","X","X","X","X","X","X","X",".","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X"],
["X",".","X","X","X","X","X",".","X","X","X","X","X","X","X",".","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X"],
["X",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","X"],
["X",".","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X",".","X"],
["X","O",".",".",".",".",".",".","X","X",".",".",".",".",".",".","X",".","O",".",".",".",".","X","X",".",".",".",".",".","X"],
["X",".","X","X","X","X","X",".","X","X","X","X","X","X","X",".","X",".","X","X","X","X","X","X","X",".","X","X","X",".","X"],
["X",".","X"," "," "," ","X",".","X","X",".",".",".",".",".",".",".",".",".",".",".",".",".","X","X",".","X", " ", "X", ".", "X"],
["X",".","X","X","X","X","X",".","X","X",".","X","X","X","X","X","-","X","X","X","X","X",".","X","X",".","X","X","X",".","X"],
["X",".",".",".",".",".",".",".",".",".",".","X"," ","a"," ","b"," ","c"," ","d"," ","X",".",".",".",".",".",".",".",".","X"],
["X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X"],
[" "," "," "," "," "," ","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X"],
["X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X"],
["X","O",".",".",".",".",".",".",".",".",".",".",".",".",".","X","X",".",".",".",".",".",".",".",".",".",".",".",".","O","X"],
["X",".","X","X","X",".","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X"],
["X",".",".",".",".","p",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","X"],
["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
];

var PM_TILE_SZ = Math.round((W-40)/map[0].length);

var pm_x;
var pm_y;
var pm_dir;
var pm_next_dir;
var pm_eat;
var pm_anim;
var pm_door_open;

var pm_apos;
var pm_bpos;
var pm_cpos;
var pm_dpos;
var pm_alast;
var pm_blast;
var pm_clast;
var pm_dlast;

function pm_pos(c) {
    for (var y=0; y<map.length; y++) {
        for (var x=0; x<map[y].length; x++) {
            if (map[y][x] == c)
                return [x, y];
        }
    }
}

function pacman_init() {
    var pos = pm_pos("p");
    pm_x = pos[0];
    pm_y = pos[1];
    pm_dir = "right";
    pm_next_dir = "right";
    pm_eat = false;
    pm_anim = 0;
    pm_door_open = false;
    // ghosts
    pm_apos = pm_pos("a");
    pm_bpos = pm_pos("b");
    pm_cpos = pm_pos("c");
    pm_dpos = pm_pos("d");
    pm_alast = " ";
    pm_blast = " ";
    pm_clast = " ";
    pm_dlast = " ";
}

function pm_draw_map(blink) {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    clear("#000000"); // XXX ?????????????????????????????????
    for (var y=0; y<map.length; y++) {
        for (var x=0; x<map[y].length; x++) {
            if (map[y][x] == "X") {
                CTX.fillStyle = "#3333ff";
                CTX.fillRect(x*PM_TILE_SZ+dx, y*PM_TILE_SZ+dy, PM_TILE_SZ, PM_TILE_SZ);
            } else if (map[y][x] == ".") {
                CTX.fillStyle = "#ffff33";
                CTX.beginPath();
                var off = PM_TILE_SZ/2;
                CTX.arc(x*PM_TILE_SZ+dx+off, y*PM_TILE_SZ+dy+off, PM_TILE_SZ/6, 0, 2 * Math.PI, false);
                CTX.fill();
            } else if (map[y][x] == "O" && blink) {
                CTX.fillStyle = "#ffffff";
                CTX.beginPath();
                var off = PM_TILE_SZ/2;
                CTX.arc(x*PM_TILE_SZ+dx+off, y*PM_TILE_SZ+dy+off, PM_TILE_SZ/3, 0, 2 * Math.PI, false);
                CTX.fill();
            } else if (map[y][x] == "-" && (! pm_door_open)) {
                CTX.fillStyle = "#774400";
                CTX.fillRect(x*PM_TILE_SZ+dx, y*PM_TILE_SZ+dy, PM_TILE_SZ, PM_TILE_SZ);
            } else if (map[y][x] == "a" || map[y][x] == "b" || map[y][x] == "c" || map[y][x] == "d") {
                if (pm_eat) {
                    CTX.fillStyle = "#5555ff";
                } else if (map[y][x] == "a") {
                    CTX.fillStyle = "#00ffff";
                } else if (map[y][x] == "b") {
                    CTX.fillStyle = "#ff00ff";
                } else if (map[y][x] == "c") {
                    CTX.fillStyle = "#dddd00";
                } else if (map[y][x] == "d") {
                    CTX.fillStyle = "#ff0000";
                }
                CTX.beginPath();
                var off = PM_TILE_SZ/2;
                CTX.arc(x*PM_TILE_SZ+dx+off, y*PM_TILE_SZ+dy+off, PM_TILE_SZ/3, Math.PI, 0, false);
                CTX.fillRect(x*PM_TILE_SZ+dx+off/4, y*PM_TILE_SZ+dy+PM_TILE_SZ/2, PM_TILE_SZ/1.3, PM_TILE_SZ/2);
                CTX.fill();
            }
        }
    }
}

function pm_collision() {
    var c = map[pm_y][pm_x];
    if (c == " " || c == ".")
        return false;
    if (c == "O") {
        pm_eat = true;
        return false;
    }
    if (c == "a" || c == "b" || c == "c" || c == "d") {
        alert("MONSTER HIT by player!");
        return true;
    }
    return true;
}

function pm_ghost_collision(x, y) {
    var c = map[y][x];
    if (c == " " || c == "." || c == "-" || c == "a" || c == "b" || c == "c" || c == "d")
        return false;
    if (x == pm_x && y == pm_y) {
        alert("MONSTER HIT by ghost!");
        return true;
    }
    return true;
}

function move_into_dir(dir) {
    switch (dir) {
    case "right":
        pm_x +=1;
        break;
    case "left":
        pm_x -=1;
        break;
    case "up":
        pm_y -=1;
        break;
    case "down":
        pm_y +=1;
        break;
    }
}

function move_reverse_dir(dir) {
    switch (dir) {
    case "right":
        pm_x -=1;
        break;
    case "left":
        pm_x +=1;
        break;
    case "up":
        pm_y +=1;
        break;
    case "down":
        pm_y -=1;
        break;
    }
}

function pm_ctrl() {
    map[pm_y][pm_x] = " ";
    if (KEY.up) {
        pm_next_dir = "up";
    } else if (KEY.down) {
        pm_next_dir = "down";
    } else if (KEY.left) {
        pm_next_dir = "left";
    } else if (KEY.right) {
        pm_next_dir = "right";
    }
}
function pm_move(dt) {
    // check if next_dir is possible
    if ((pm_next_dir != pm_dir)
    && (   (!(pm_next_dir == "up"    && pm_dir == "down"))
        && (!(pm_next_dir == "down"  && pm_dir == "up"))
        && (!(pm_next_dir == "left"  && pm_dir == "right"))
        && (!(pm_next_dir == "right" && pm_dir == "left")))) {
        move_into_dir(pm_next_dir);
        if (pm_collision()) {
            move_reverse_dir(pm_next_dir);
            // next_dir was not possible, trying dir
            move_into_dir(pm_dir);
            if (pm_collision()) {
                // dir also not possible -> stop
                move_reverse_dir(pm_dir);
            }
        } else {
            // next_dir was possible
            pm_dir = pm_next_dir;
        }
    } else {
        // next_dir was not possible, trying dir
        move_into_dir(pm_dir);
        if (pm_collision()) {
            // dir also not possible -> stop
            move_reverse_dir(pm_dir);
        }
    }
}

function pm_ctrl_ghosts() {
    var oldpos;
    var ghosts = ["a", "b", "c", "d"];
    for (var i = 0; i < ghosts.length; i++) {
        pos = eval("pm_" + ghosts[i] + "pos");
        last = eval("pm_" + ghosts[i] + "last");
        oldpos = pos;
        switch (rand(0, 4)) {
            case 0:
                pos[0] += 1;
                if (pm_ghost_collision(pos[0], pos[1]))
                    pos[0] -= 1;
                break;
            case 1:
                pos[1] += 1;
                if (pm_ghost_collision(pos[0], pos[1]))
                    pos[1] -= 1;
                break;
            case 2:
                pos[0] -= 1;
                if (pm_ghost_collision(pos[0], pos[1]))
                    pos[0] += 1;
                break;
            case 3:
                pos[1] -= 1;
                if (pm_ghost_collision(pos[0], pos[1]))
                    pos[1] += 1;
                break;
        }
        map[oldpos[1]][oldpos[0]] = last;
        last = map[pos[1]][pos[0]];
        map[pos[1]][pos[0]] = ghosts[i];
        eval("pm_" + ghosts[i] + "pos[0] = " + pos[0]);
        eval("pm_" + ghosts[i] + "pos[1] = " + pos[1]);
        eval("pm_" + ghosts[i] + "last = '" + last + "'");
    }
}


function pm_draw() {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    CTX.fillStyle = "#ffff33";
    CTX.beginPath();
    var off = PM_TILE_SZ/2;
    CTX.arc(pm_x*PM_TILE_SZ+dx+off, pm_y*PM_TILE_SZ+dy+off, PM_TILE_SZ/2, 0, 2 * Math.PI, false);
    CTX.fill();

}

var cnt = 0;
var cnt2 = 0;
var cnt3 = 0;
function pacman_frame(dt) {
    pm_draw_map((cnt++ > 2));
    pm_ctrl(dt);
    if (cnt > 10) {
        cnt = 0;
        pm_move(dt);
        if (pm_door_open)
            pm_ctrl_ghosts();
    }
    if (cnt2++ > 150) {
        pm_door_open = true;
    }
    if (pm_eat) {
        if (cnt3++ > 350) {
            pm_eat = false;
            cnt3 = 0;
        }
    }
    pm_draw();

    return true; // go on
}

function pacman_ctrl_hint() {
    return {"w or up-arrow   ": "up",
            "s or down-arrow ": "down",
            "a or left-arrow ": "left",
            "d or right-arrow": "right",
            "you've got to mash the keys a bit, here": "there are quite a few bugs...",
    };
}
