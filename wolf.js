
var WOLF_MAP = [
["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
["X"," "," "," "," "," "," "," "," ","O"," "," "," "," ","E"," "," "," "," "," ","O"," "," "," ","X"," "," "," "," ","X"," "," ","O","E"," "," "," "," "," "," "," "," "," "," "," "," "," "," ","O","*","*","*","*","*","*","*","*","*","*","X"],
["X","#","#","#","#","#","#","#"," ","O","O","O","O","O","O","O"," "," ","O","O","O"," "," "," ","X"," "," "," "," ","X"," "," ","O"," "," "," "," "," ","X","X","X","X","X"," "," "," "," "," ","O","*","*","*","*","*","*","*","*","*","*","X"],
["X"," "," "," "," "," "," ","#","E"," "," "," "," "," ","E"," "," "," "," "," ","X"," "," "," ","X"," "," "," "," ","X"," "," "," "," "," "," "," "," ","X","E"," "," ","X"," "," ","E"," "," ","O"," "," ","*","*","*","*","*","*"," "," ","X"],
["X"," ","E"," "," "," "," "," "," "," ","X","X","X","#","#","X","X","X","X","X","X"," ","X","X","X"," "," "," "," ","X"," "," ","O","E"," "," "," "," ","X","#"," ","#","X"," "," "," "," "," ","O"," "," "," "," ","#"," "," "," "," "," ","X"],
["X"," "," "," "," "," "," ","#"," "," ","X"," "," "," "," ","E"," "," "," "," "," "," "," "," ","X"," "," "," "," ","X"," "," ","O"," "," "," "," "," "," "," "," "," "," ","E"," "," "," "," ","O"," "," "," ","X","O","X"," "," "," "," ","X"],
["X","X","X","X","X","X","X","X"," "," ","X","E"," ","#","#","#","X","#"," ","#","X","#","#","#","#","E"," "," "," ","X"," "," ","O","O","O","O","O","X","X","X","O","O","O","O","O"," "," ","O","O"," "," ","X"," ","O"," ","X"," "," "," ","X"],
["O"," ","E"," ","O"," "," "," "," "," ","X"," "," ","#"," "," "," "," "," ","#"," "," "," "," ","#","O","O","O"," ","X","E"," "," "," "," "," "," "," ","#","E"," "," "," "," "," "," "," "," ","X"," "," "," "," ","O"," "," "," "," "," ","X"],
["O"," "," "," "," "," "," "," ","E"," "," "," "," ","#"," ","E"," "," "," "," "," "," "," "," ","#","E"," "," "," ","X","#","#","#","#","#","#"," "," ","#"," "," ","X","X","X","X","X","X","X","X"," ","E"," "," "," "," "," "," "," "," ","X"],
["O","O","O","O","O","O","O","O","O","O","O"," "," ","X"," "," ","O","O","O","O","O","O","O","O","#"," ","X","X","X","X"," "," "," "," "," ","E"," "," ","#"," "," "," "," "," "," "," "," "," ","X"," ","O","O","O","O","O","O","O","O"," ","X"],
["X"," "," "," "," "," "," ","E"," "," ","O"," "," ","X"," "," ","O"," "," "," "," "," "," "," ","#"," "," "," ","X"," "," "," ","X","X","X","X","X","X","X","X","X"," "," ","E"," "," "," "," ","X"," "," ","E"," "," ","#"," "," "," "," ","X"],
["X","E","X","X","#","#"," "," "," "," "," "," "," ","#"," "," ","O"," "," "," ","#"," ","#","#","#","#","#"," ","X"," "," "," ","E","X"," "," "," ","X","X"," "," "," "," "," "," "," "," "," ","X"," "," "," ","E"," "," ","E"," "," "," ","X"],
["X"," "," "," "," "," "," "," "," "," ","O"," "," ","#"," "," ","X"," "," "," ","#"," "," ","E"," "," "," "," ","O"," "," "," "," ","X"," "," "," ","X","X"," "," "," ","#","#","#","#","#","#","#","#","#","#"," ","O","O","O","#","#","#","X"],
["O","O","O","O","O","O","O","O","O","O","O"," "," ","#"," "," ","O"," "," "," ","#"," "," "," ","#","#","#"," ","X"," "," "," "," "," "," "," "," ","X"," "," "," "," ","#"," "," "," "," "," "," "," "," ","#"," "," "," "," "," "," "," ","X"],
["X"," "," "," "," "," "," ","X"," "," "," "," "," ","#"," "," ","O","#","#","#","#"," "," "," ","#","E"," "," ","O"," "," ","X","X","X","X","O"," ","O"," "," "," "," ","#"," "," ","E"," "," "," "," "," ","#"," ","E"," ","#"," "," "," ","X"],
["X"," "," ","O"," ","E"," ","X"," "," "," "," "," ","#"," "," "," ","E"," "," "," "," "," "," ","#"," "," "," ","X"," "," ","X","E"," ","X","O"," ","O"," ","E"," "," ","O"," "," "," "," ","X","X","X","X","X","X","X","X","X","X"," "," ","X"],
["X"," "," ","O","O","O","O","X"," "," ","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"," ","O","O","O"," "," ","X"," "," ","X","O"," ","O"," "," "," "," "," "," "," "," "," ","X"," "," ","E","X"," "," ","O"," "," "," "," ","X"],
["X"," "," "," ","E"," "," ","X"," "," ","#"," "," "," "," "," "," "," "," ","E"," "," "," ","X"," "," ","E"," ","X"," "," ","X"," "," ","X","O"," ","O"," ","E"," "," ","O"," "," "," "," ","X","X"," "," ","X"," "," ","O"," "," "," "," ","X"],
["X"," "," ","O","O","O","O","X","E"," ","#"," ","#","#","#","#","#"," "," ","O","O"," "," ","X"," "," "," "," ","O"," "," ","X"," "," ","X","O"," ","O"," "," "," "," ","#"," "," "," "," "," "," "," "," ","#"," ","E","O","#","#"," "," ","X"],
["X","E"," "," "," "," "," ","X"," "," ","#"," ","#"," "," "," ","E"," "," ","O","O"," "," ","X"," "," ","X","X","X"," "," ","X","X"," ","X","O"," ","O","X","X"," "," ","#","#","#","#","#","#","#","#","#","#"," "," ","O"," "," "," "," ","X"],
["X"," "," ","O","O","O","O","X"," "," "," "," ","#"," ","O","O","X","X","O","O","O"," "," ","X"," "," ","X"," "," ","E"," "," ","X"," ","O","O"," ","O"," "," "," ","E"," "," "," ","X"," "," "," "," "," "," "," "," "," "," "," "," "," ","X"],
["X"," "," "," "," "," "," ","X"," "," ","#"," ","#"," "," "," "," "," "," ","E","O"," "," ","X"," "," ","X"," "," "," "," "," ","X"," ","O","O"," ","O"," "," "," "," ","X"," "," ","X"," "," "," "," ","X","X","X","X"," ","O","O"," "," ","X"],
["X"," "," "," "," "," "," "," "," "," ","#","E","#"," "," "," "," "," "," "," ","O"," "," ","X"," "," "," "," "," "," "," "," ","X"," "," ","E"," ","O"," ","E"," "," ","X"," "," "," "," "," "," "," ","X"," ","E"," "," ","O","E"," "," ","X"],
["X","X","X","X","X","X","X","X","X","X","#","#","#","#","#","#","#","#","#","#","#","O","O","X","O","O","O","O","O","O","O","O","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
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

var wolf_cur_ens;
var wolf_old_ens;

var wolf_won;

var WOLF_I_W_1 = new Image();
WOLF_I_W_1.src = "wolf_w_1.png";
var WOLF_I_W_2 = new Image();
WOLF_I_W_2.src = "wolf_w_2.png";
var WOLF_I_F = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
]
WOLF_I_F[0].src = "wolf_f_1.png";
WOLF_I_F[1].src = "wolf_f_2.png";
WOLF_I_F[2].src = "wolf_f_3.png";
WOLF_I_F[3].src = "wolf_f_4.png";
WOLF_I_F[4].src = "wolf_f_5.png";
WOLF_I_F[5].src = "wolf_f_6.png";

function wolf_init() {
    TARGET_FRAME_TIME = 1000 / 30;
    wolf_cur_ens = [];
    wolf_old_ens = [];
    wolf_won = false;
    wolf_pl = {
        pos: [1, 1],
        height: 0.5,
        yaw: 85.3,
        ammo: 1000,
        health: 100,
        points: 0
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
    if (c == " " || c == "E") {
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
    if (KEY.space) {
        wolf_shoot(wolf_pl.yaw);
    }
}

function wolf_shoot(yaw) {
    wolf_pl.ammo -= 1;
    if (wolf_pl.ammo < 0) {
        wolf_pl.ammo = 0;
        return;
    }
    for (var i = 0; i < wolf_cur_ens.length; i++) {
        wolf_cur_ens[i].health -= 1;
        if (wolf_cur_ens[i].health <= 0) {
            WOLF_MAP[Math.round(wolf_cur_ens[i].mapy)][Math.round(wolf_cur_ens[i].mapx)] = " ";
        }
        wolf_pl.points += 10;
    }
}

function wolf_get_shot() {
    wolf_pl.health -= wolf_cur_ens.length/200;
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
            return {dist: i*correction, type: c, mapx: endx, mapy: endy};
        }
    }
    return {dist: i, type: "0", mapx: endx, mapy: endy};
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
        r = Math.round(128-i/2);
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
    if (wall.type == "E") {
        var already_there = false;
        var health = 10;
        // enemy visible last frame?
        for (var x = 0; x < wolf_old_ens.length; x++) {
            if (wolf_old_ens[x].mapx == wall.mapx
            &&  wolf_old_ens[x].mapy == wall.mapy) {
                health = wolf_old_ens[x].health;
                break;
            }
        }
        // enemy already added in this frame?
        for (var x = 0; x < wolf_cur_ens.length; x++) {
            if (wolf_cur_ens[x].mapx == wall.mapx
            &&  wolf_cur_ens[x].mapy == wall.mapy) {
                wolf_cur_ens[x].dist = (wolf_cur_ens[x].dist + wall.dist) / 2;
                already_there = true;
                break;
            }
        }
        if (! already_there) {
            wolf_cur_ens.push({
                mapx: wall.mapx,
                mapy: wall.mapy,
                health: health,
                dist: wall.dist
            });
        }
        CTX.fillStyle = "#f00";
        CTX.fillRect(WOLF_XS+i*SLICE_W, WOLF_YS+(WOLF_H-h)/2, SLICE_W, h);
    } else {
        CTX.fillStyle = wolf_gradient(wall);
        CTX.fillRect(WOLF_XS+i*SLICE_W, WOLF_YS+(WOLF_H-h)/2, SLICE_W, h);
    }
}

function wolf_draw_hud() {
    CTX.fillStyle = "#dddddd";
    CTX.font = "25px sans-serif";
    CTX.textAlign = "left";
    CTX.fillText("ammo: " + Math.round(wolf_pl.ammo), 20, H-20);
    CTX.fillText(Math.round(wolf_pl.points), 20, H-45);
    CTX.textAlign = "right";
    CTX.fillText(Math.round(wolf_pl.health) + "%", W-20, H-45);
    var img;
    var h = wolf_pl.health;
    if (h > 80) {
        img = 0;
    } else if (h > 60) {
        img = 1;
    } else if (h > 40) {
        img = 2;
    } else if (h > 20) {
        img = 3;
    } else if (h > 10) {
        img = 4;
    } else {
        img = 5;
    }
    CTX.fillStyle = "#002020";
    CTX.fillRect(W/2 - 45, H-95, 90, 90);
    CTX.drawImage(WOLF_I_F[img], W/2 - 80/2, H-90);
}

function wolf_frame(dt) {
    var wall;
    // ceiling
    CTX.fillStyle = "#a8a8a8";
    CTX.fillRect(WOLF_XS, WOLF_YS, WOLF_W, WOLF_H/2);
    // floor
    CTX.fillStyle = "#0a0a0a";
    CTX.fillRect(WOLF_XS, WOLF_H/2+20, WOLF_W, WOLF_H/2);
    for (var x = wolf_pl.yaw-VIEW_ANGLE/2, i = 0;
         x < wolf_pl.yaw+VIEW_ANGLE/2;
         x+=VIEW_STEP, i++
    ) {
        wall = wolf_cast_ray(wolf_pl.pos, x);
        wolf_draw_slice(i, wall);
    }
    wolf_ctrl_pl(dt);
    wolf_get_shot();
    wolf_old_ens = wolf_cur_ens.splice(0);
    wolf_cur_ens = [];
    // border
    if (KEY.space) {
        CTX.drawImage(WOLF_I_W_2, W/2-100, H-WOLF_HS-100+rand(0,20));
    } else {
        if (KEY.up || KEY.down || KEY.sleft || KEY.sright) {
            if (rand(0, 1) == 0) {
                var dy = 5;
            } else {
                var dy = 0;
            }
            CTX.drawImage(WOLF_I_W_1, W/2-100, H-WOLF_HS-100+dy);
        } else {
            CTX.drawImage(WOLF_I_W_1, W/2-100, H-WOLF_HS-100);
        }
    }
    CTX.fillStyle = "#005050";
    CTX.fillRect(0, 0, W, WOLF_YS);
    CTX.fillRect(0, 0, WOLF_XS, H);
    CTX.fillRect(W-WOLF_XS, 0, WOLF_XS, H);
    CTX.fillRect(0, H-WOLF_HS, W, WOLF_HS);
    wolf_draw_hud();
    if (wolf_won) {
        return "next";
    }
    if (wolf_pl.health <= 0) {
        return false;
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

