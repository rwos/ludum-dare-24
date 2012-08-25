var as_x;
var as_y;
var as_dir;
var as_engine;
var as_velx;
var as_vely;

var as_teroids;

var AS_SHIP_W = 30;
var AS_SHIP_H = 40;

function asteroids_init() {
    as_x = W/2;
    as_y = H/2;
    as_dir = rand(0, 359);
    as_engine = false;
    as_velx = 0;
    as_vely = 0;
}

function as_draw_ship() {
    var rot = deg2rad(as_dir);
    CTX.translate(as_x, as_y);
    CTX.rotate(rot);
    CTX.lineWidth = 2;
    CTX.strokeStyle = "#FFF";
    CTX.beginPath();
    CTX.moveTo(0, -AS_SHIP_H/2);
    CTX.lineTo(AS_SHIP_W/2, AS_SHIP_H/2);
    CTX.lineTo(-AS_SHIP_W/2, AS_SHIP_H/2);
    CTX.lineTo(0, -AS_SHIP_H/2);
    CTX.stroke();
    if (as_engine) {
        CTX.beginPath();
        CTX.moveTo(-(AS_SHIP_W/2)+AS_SHIP_W/5, AS_SHIP_H/2);
        CTX.lineTo(0, AS_SHIP_H/2+AS_SHIP_H/3);
        CTX.lineTo(AS_SHIP_W/2 - AS_SHIP_W/5, AS_SHIP_H/2);
        CTX.stroke();
        CTX.beginPath();
        CTX.moveTo(-(AS_SHIP_W/2)+AS_SHIP_W/3, AS_SHIP_H/2);
        CTX.lineTo(0, AS_SHIP_H/2+AS_SHIP_H/7);
        CTX.lineTo(AS_SHIP_W/2 - AS_SHIP_W/3, AS_SHIP_H/2);
        CTX.stroke();
    }
    CTX.rotate(-rot);
    CTX.translate(-as_x, -as_y);
}

function asteroids_frame(dt) {


    as_ctrl(dt);
    as_draw_ship();
    return true;
}

function as_ctrl(dt) {
    as_engine = KEY.up;
    var thrust = 0.005;
    var ang = deg2rad(as_dir) + Math.PI;
    document.getElementById("d").innerHTML = ang + " - " + as_dir;
    if (as_engine) {
        as_velx -= Math.sin(ang)*thrust*dt;
        as_vely += Math.cos(ang)*thrust*dt;
    } else {
        as_velx *= 0.99;
        as_vely *= 0.99;
    }
    var spd = 0.01;
    as_x += as_velx;
    as_y += as_vely;
    var rot_spd = 0.5;
    if (KEY.left) {
        as_dir -= rot_spd * dt;
    }
    if (KEY.right) {
        as_dir += rot_spd * dt;
    }
    while (as_dir > 360) as_dir -= 360;
    while (as_dir < 0) as_dir += 360;
}

function asteroids_ctrl_hint() {
    return {"w or up-arrow   ": "fire engines",
            "a or left-arrow ": "rotate left",
            "d or right-arrow": "rotate right",
            "space key       ": "fire weapons"
    };
}

