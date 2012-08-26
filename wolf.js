
var WOLF_MAP = [
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"X        O          O   X    X  O               O**********X",
"X####### OOOOOOO  OOO   X    X  O     XXXXX     O**********X",
"X      #            X   X    X        X   X     O  ******  X",
"X         XXX##XXXXXX XXX    X  O     X# #X     O    #     X",
"X      #  X             X    X  O               O   XOX    X",
"XXXXXXXX  X  ###X# #X####    X  OOOOOXXXOOOOO  OO  X O X   X",
"O   O     X  #     #    #OOO X        #         X    O     X",
"O            #          #    X######  #  XXXXXXXX          X",
"OOOOOOOOOOO  X  OOOOOOOO# XXXX        #         X OOOOOOOO X",
"X         O  X  O       #   X   XXXXXXXXX       X     #    X",
"XXXX##       #  O   # ##### X    X   XX         X          X",
"X         O  #  X   #       O    X   XX   ########## OOO###X",
"OOOOOOOOOOO  #  O   #   ### X        X    #        #       X",
"X      X     #  O####   #   O  XXXXO O    #        #   #   X",
"X      X     #          #   X  X  XO O    O    XXXXXXXXXX  X",
"X  OOOOX  ############### OOO  X  XO O         X   X  O    X",
"X      X  #            X    X  X  XO O    O    XX  X  O    X",
"X  OOOOX  # #####  OO  X    O  X  XO O    #        #  O##  X",
"X      X  # #      OO  X  XXX  XX XO OXX  ##########  O    X",
"X  OOOOX    # OOXXOOO  X  X     X OO O       X             X",
"X      X  # #       O  X  X     X OO O    X  X    XXXX OO  X",
"X         # #       O  X        X    O    X       X    O   X",
"XXXXXXXXXX###########OOXOOOOOOOOXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
];

var WOLF_XS = 20;
var WOLF_YS = 20;
var WOLF_HS = 100;
var WOLF_W = W-WOLF_XS
var WOLF_H = H-WOLF_HS;

var VIEW_ANGLE = 70;
var SLICE_W = 5;
var VIEW_STEP = VIEW_ANGLE/(WOLF_W/SLICE_W);
var RAY_STEP = 0.01;
var MAX_RAY_LENGTH = 10;
var WALL_HEIGHT = 200;
var wolf_pl;

function wolf_init() {
    TARGET_FRAME_TIME = 1000 / 30;
    wolf_pl = {
        pos: [1, 1],
        height: 0.5,
        yaw: 85.3
    };
}

function wolf_map_at(x, y) {
    var ix = Math.round(x);
    var iy = Math.round(y);
    if (iy < 0 || iy >= WOLF_MAP.length || ix < 0 || ix > WOLF_MAP[iy].length) {
        return " ";
    }
    return WOLF_MAP[iy][ix];
}

function wolf_move(start, dir, amt) {
    var a = deg2rad(dir)
    var x = Math.sin(a)*amt + start[0];
    var y = Math.cos(a)*amt + start[1];
    var c = wolf_map_at(x, y);
    if (c == " ") {
        return [x, y];
    } else if (c == "*") {
        wolf_won = true;
    }
    // no movement into walls
    return start;
}

function wolf_ctrl_pl(dt) {
    var mv_amt = dt * 0.001;
    var rot_amt = dt * 0.1;
    document.getElementById("d").innerHTML = wolf_pl.pos[0] + " - " + wolf_pl.pos[1] + " - " + wolf_pl.yaw;
    if (KEY.up) {
        wolf_pl.pos = wolf_move(wolf_pl.pos, wolf_pl.yaw, mv_amt);
    }
    if (KEY.down) {
        wolf_pl.pos = wolf_move(wolf_pl.pos, wolf_pl.yaw, -mv_amt);
    }
    if (KEY.sleft) {
        wolf_pl.pos = wolf_move(wolf_pl.pos, wolf_pl.yaw - 90, mv_amt);
    }
    if (KEY.sright) {
        wolf_pl.pos = wolf_move(wolf_pl.pos, wolf_pl.yaw + 90, mv_amt);
    }
    if (KEY.left) {
        wolf_pl.yaw -= rot_amt;
    }
    if (KEY.right) {
        wolf_pl.yaw += rot_amt;
    }
}

function wolf_cast_ray(start, dir) {
    var endx, endy, c;
    var a = deg2rad(dir);
    var correction = Math.cos(deg2rad(dir - wolf_pl.yaw));
    for (var i = RAY_STEP; i<MAX_RAY_LENGTH; i+=RAY_STEP) {
        endx = Math.sin(a)*i + start[0];
        endy = Math.cos(a)*i + start[1];
        c = wolf_map_at(endx, endy);
        if (c != " ") {
            return {dist: i*correction, type: c};
        }
    }
    return {dist: i, type: "0"};
}

var grad_range = 170;
function wolf_gradient(wall) {
    var x = wall.dist;
    var i = Math.round(x*(255/MAX_RAY_LENGTH));
    var r, g, b;
    switch (wall.type) {
    // normal wall
    case "X":
        r = 50;
        g = 50;
        b = Math.round(150-i/2);
        break;
    // brown wall
    case "#":
        r = Math.round(128-i/4);
        g = 30;
        b = 30;
        break;
    // grey wall
    case "O":
        r = Math.round(128-i/2);
        g = Math.round(128-i/2);
        b = Math.round(128-i/2);
        break;
    // void
    case "0":
        r = 0;
        g = 0;
        b = 0;
        break;
    }
    return "rgb(" + r + "," + g + "," + b + ")";
}

function wolf_draw_slice(i, wall) {
    var h = WALL_HEIGHT / wall.dist
    CTX.fillStyle = wolf_gradient(wall);
    CTX.fillRect(WOLF_XS+i*SLICE_W, WOLF_YS+(WOLF_H-h)/2, SLICE_W, h);
}

function wolf_frame(dt) {
    var wall;
    // ceiling
    CTX.fillStyle = "#a8a8a8";
    CTX.fillRect(WOLF_XS, WOLF_YS, WOLF_W, WOLF_H/2);
    // floor
    CTX.fillStyle = "#0a0a0a";
    CTX.fillRect(WOLF_XS, WOLF_H/2+20, WOLF_W, WOLF_H/2);
    wolf_ctrl_pl(dt);
    for (var x = wolf_pl.yaw-VIEW_ANGLE/2, i = 0;
         x < wolf_pl.yaw+VIEW_ANGLE/2;
         x+=VIEW_STEP, i++
    ) {
        wall = wolf_cast_ray(wolf_pl.pos, x);
        wolf_draw_slice(i, wall);
    }
    // border
    CTX.fillStyle = "#005050";
    CTX.fillRect(0, 0, W, WOLF_YS);
    CTX.fillRect(0, 0, WOLF_XS, H);
    CTX.fillRect(W-WOLF_XS, 0, WOLF_XS, H);
    CTX.fillRect(0, H-WOLF_HS, W, WOLF_HS);
    return true;
}

function wolf_ctrl_hint() {
    return {"w or up-arrow   ": "forwards",
            "s or down-arrow ": "backwards",
            "a or left-arrow ": "turn left",
            "d or right-arrow": "turn right",
            "space           ": "shoot",
            "q               ": "strafe left",
            "e               ": "strafe right",
    };
}

