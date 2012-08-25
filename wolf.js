
var MAP = [
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X       XXXX                                               X",
"X          X                                               X",
"X         XXXXXXXXXX                                       X",
"X         X     X                                          X",
"X         XXXXX X                                          X",
"X               X                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"X                                                          X",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
];

var VIEW_ANGLE = 70;
var SLICE_W = 1;
var VIEW_STEP = VIEW_ANGLE/(W/SLICE_W);
var RAY_STEP = 0.1;
var MAX_RAY_LENGTH = 10;
var WALL_HEIGHT = 100;
var wolf_pl;

function wolf_init() {
    TARGET_FRAME_TIME = 1000 / 30;
    wolf_pl = {
        pos: [8.8, 9.8],
        height: 0.5,
        yaw: 35.3
    };
}

function wolf_map_at(x, y) {
    var ix = Math.round(x);
    var iy = Math.round(y);
    if (iy < 0 || iy > MAP.length || ix < 0 || ix > MAP[iy].length) {
        return " ";
    }
    return MAP[iy][ix];
}

function wolf_move(start, dir, amt) {
    var a = deg2rad(dir)
    var x = Math.sin(a)*amt + start[0];
    var y = Math.cos(a)*amt + start[1];
    return [x, y];
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
    return {dist: i, type: c};
}

function wolf_gradient(x) {
    var i = Math.round(x*(255/MAX_RAY_LENGTH));
    return "rgb(" + i + "," + i + "," + i + ")";
}

function wolf_draw_slice(i, wall) {
    var h = WALL_HEIGHT / wall.dist
    CTX.fillStyle = wolf_gradient(wall.dist);
    CTX.fillRect(i*SLICE_W, (H-h)/2, SLICE_W, h);
}

function wolf_frame(dt) {
    var wall;
    clear("#00ff00");
    wolf_ctrl_pl(dt);
    for (var x = wolf_pl.yaw-VIEW_ANGLE/2, i = 0;
         x < wolf_pl.yaw+VIEW_ANGLE/2;
         x+=VIEW_STEP, i++
    ) {
        wall = wolf_cast_ray(wolf_pl.pos, x);
        wolf_draw_slice(i, wall);
    }
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

