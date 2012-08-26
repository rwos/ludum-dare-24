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
["X",".","X","X","X","X","X",".","X","X",".","X","X","X","-","-","-","-","-","X","X","X",".","X","X",".","X","X","X",".","X"],
["X",".",".",".",".",".",".",".",".",".",".","X","K","a"," ","b"," ","c"," ","d","K","X",".",".",".",".",".",".",".",".","X"],
["X","X","X","X","X","X","X",".","X","X",".","X","K","K","K","K","K","K","K","K","K","X",".","X","X",".","X","X","X","X","X"],
[" "," "," "," "," "," ","X",".","X","X",".","X","K","K","K","K","K","K","K","K","K","X",".","X","X",".","X"],
["X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X"],
["X","O",".",".",".",".",".",".",".",".",".",".",".",".",".","X","X",".",".",".",".",".",".",".",".",".",".",".",".","O","X"],
["X",".","X","X","X",".","X","X","X","X","X","X","X","X",".","X","X",".","X","X","X","X","X","X","X","X","X","X","X",".","X"],
["X",".",".",".",".","p",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","X"],
["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
];

var PM_TILE_SZ = Math.round((W-40)/map[0].length);

var pm_pos;
var pm_dir;
var pm_next_dir;
var pm_eat;
var pm_anim;
var pm_door_open;

var pm_apos;
var pm_bpos;
var pm_cpos;
var pm_dpos;

function pm_get_pos(c) {
    for (var y=0; y<map.length; y++) {
        for (var x=0; x<map[y].length; x++) {
            if (map[y][x] == c) {
                map[y][x] = " ";
                return [x, y];
            }
        }
    }
}

function pacman_init() {
    pm_pos = pm_get_pos("p");
    pm_dir = "right";
    pm_next_dir = "right";
    pm_eat = false;
    pm_anim = 0;
    pm_door_open = false;
    // ghosts
    pm_apos = pm_get_pos("a");
    pm_bpos = pm_get_pos("b");
    pm_cpos = pm_get_pos("c");
    pm_dpos = pm_get_pos("d");
    // graphics
    clear("#000");
    pm_draw_map();
}

function pm_draw_points(blink) {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    for (var y=0; y<map.length; y++) {
        for (var x=0; x<map[y].length; x++) {
            if (map[y][x] == "." || map[y][x] == "O" || map[y][x] == " " || map[y][x] == "-") {
                CTX.fillStyle = "#000";
                CTX.fillRect(x*PM_TILE_SZ+dx,
                             y*PM_TILE_SZ+dy,
                             PM_TILE_SZ, PM_TILE_SZ);
            }
            if (map[y][x] == ".") {
                CTX.fillStyle = "#ffff33";
                CTX.beginPath();
                var off = PM_TILE_SZ/2;
                CTX.arc(x*PM_TILE_SZ+dx+off,
                        y*PM_TILE_SZ+dy+off,
                        PM_TILE_SZ/6, 0, 2 * Math.PI, false);
                CTX.fill();
            } else if (map[y][x] == "O" && blink) {
                var off = PM_TILE_SZ/2;
                CTX.fillStyle = "#ffffff";
                CTX.beginPath();
                CTX.arc(x*PM_TILE_SZ+dx+off,
                        y*PM_TILE_SZ+dy+off,
                        PM_TILE_SZ/3, 0, 2 * Math.PI, false);
                CTX.fill();
            } else if (map[y][x] == "-" && (! pm_door_open)) {
                var off = PM_TILE_SZ/4;
                CTX.fillStyle = "#774400";
                CTX.fillRect(x*PM_TILE_SZ+dx, y*PM_TILE_SZ+dy+off, PM_TILE_SZ, PM_TILE_SZ-2*off);
            }
        }
    }
}

function pm_draw_ghost(x, y, c) {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    if (pm_eat) {
        CTX.fillStyle = "#5555ff";
    } else if (c == "a") {
        CTX.fillStyle = "#00ffff";
    } else if (c == "b") {
        CTX.fillStyle = "#ff00ff";
    } else if (c == "c") {
        CTX.fillStyle = "#dddd00";
    } else if (c == "d") {
        CTX.fillStyle = "#ff0000";
    }
    CTX.beginPath();
    var off = PM_TILE_SZ/2;
    CTX.arc(x*PM_TILE_SZ+dx+off,
            y*PM_TILE_SZ+dy+off,
            PM_TILE_SZ/3, Math.PI, 0, false);
    CTX.fillRect(x*PM_TILE_SZ+dx+off/4,
                 y*PM_TILE_SZ+dy+PM_TILE_SZ/2,
                 PM_TILE_SZ/1.3, PM_TILE_SZ/2);
    CTX.fill();
}

function pm_draw_ghosts() {
    pm_draw_ghost(pm_apos[0], pm_apos[1], "a");
    pm_draw_ghost(pm_bpos[0], pm_bpos[1], "b");
    pm_draw_ghost(pm_cpos[0], pm_cpos[1], "c");
    pm_draw_ghost(pm_dpos[0], pm_dpos[1], "d");
}

function pm_draw_map() {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    for (var y=0; y<map.length; y++) {
        for (var x=0; x<map[y].length; x++) {
            if (map[y][x] == "X") {
                CTX.fillStyle = "#3333ff";
                CTX.fillRect(x*PM_TILE_SZ+dx, y*PM_TILE_SZ+dy, PM_TILE_SZ, PM_TILE_SZ);
            }
        }
    }
}

function pm_collision(x, y) {
    var c = map[y][x];
    if (c == " " || c == ".")
        return false;
    if (c == "O") {
        pm_eat = true;
        return false;
    }
    return true;
}

function pm_ghost_collision(x, y) {
    var c = map[y][x];
    if (c == " " || c == "." || c == "O" || c == "-")
        return false;
    return true;
}

function move_into_dir(dir, pos) {
    switch (dir) {
    case "right":
        return [pos[0] + 1, pos[1]];
    case "left":
        return [pos[0] - 1, pos[1]];
    case "up":
        return [pos[0], pos[1] - 1];
    case "down":
        return [pos[0], pos[1] + 1];
    default:
        return pos;
    }
}

function move_reverse_dir(dir, pos) {
    switch (dir) {
    case "right":
        return [pos[0] - 1, pos[1]];
    case "left":
        return [pos[0] + 1, pos[1]];
    case "up":
        return [pos[0], pos[1] + 1];
    case "down":
        return [pos[0], pos[1] - 1];
    default:
        return pos;
    }
}

function pm_ctrl() {
    map[pm_pos[1]][pm_pos[0]] = " ";
    if (KEY.up) {
        pm_next_dir = "up";
    } else if (KEY.down) {
        pm_next_dir = "down";
    } else if (KEY.left) {
        pm_next_dir = "left";
    } else if (KEY.right) {
        pm_next_dir = "right";
    }
    pm_anim += 1;
}
function pm_move(dir, next_dir, pos, collision_check) {
    // check if next_dir is possible
    if ((next_dir != dir)
    && (   (!(next_dir == "up"    && dir == "down"))
        && (!(next_dir == "down"  && dir == "up"))
        && (!(next_dir == "left"  && dir == "right"))
        && (!(next_dir == "right" && dir == "left")))) {
        pos = move_into_dir(next_dir, pos);
        if (collision_check(pos[0], pos[1])) {
            pos = move_reverse_dir(next_dir, pos);
            // next_dir was not possible, trying dir
            pos = move_into_dir(dir, pos);
            if (collision_check(pos[0], pos[1])) {
                // dir also not possible -> stop
                return [false, move_reverse_dir(dir, pos)];
            }
        } else {
            // next_dir was possible
            return [true, pos];
        }
    } else {
        // next_dir was not event tried, trying dir
        pos = move_into_dir(dir, pos);
        if (collision_check(pos[0], pos[1])) {
            // dir also not possible -> stop
            return [false, move_reverse_dir(dir, pos)];
        }
    }
    return [false, pos];
}

function pm_ctrl_ghosts() {
    var ghosts = ["a", "b", "c", "d"];
    for (var i = 0; i < ghosts.length; i++) {
        pos = eval("pm_" + ghosts[i] + "pos");
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
        eval("pm_" + ghosts[i] + "pos[0] = " + pos[0]);
        eval("pm_" + ghosts[i] + "pos[1] = " + pos[1]);
    }
}


function pm_draw() {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    CTX.fillStyle = "#ffff33";
    CTX.beginPath();
    var off = PM_TILE_SZ/2;
    CTX.arc(pm_pos[0]*PM_TILE_SZ+dx+off,
            pm_pos[1]*PM_TILE_SZ+dy+off,
            PM_TILE_SZ/2,
            0, Math.PI*1.5 + Math.sin(pm_anim/20)*2, false);
    CTX.fill();
}

var cnt = 0;
var cnt2 = 0;
var cnt3 = 0;
function pacman_frame(dt) {
    pm_draw_points((cnt++ > 2));
    pm_ctrl(dt);
    var tmp;
    if (cnt > 10) {
        cnt = 0;
        // player move
        tmp = pm_move(pm_dir, pm_next_dir, pm_pos, pm_collision);
        if (tmp[0]) {
            pm_dir = pm_next_dir;
        }
        pm_pos = tmp[1];
        // ghosts move
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
    pm_draw_ghosts();

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
