var as_x;
var as_y;
var as_dir;
var as_engine;
var as_velx;
var as_vely;

var as_teroids;
var as_bullets;

var AS_SHIP_W = 30;
var AS_SHIP_H = 40;

var AS_SIZE = 20;

function asteroids_init() {
    as_x = W/2;
    as_y = H/2;
    as_dir = rand(0, 359);
    as_engine = false;
    as_velx = 0;
    as_vely = 0;
    as_bullets = [];
    as_teroids = [];
    var posx, posy;
    var dpos = H/4;
    for (var i = 0; i < 5; i++) {
        switch (rand(0, 4)) {
            case 0:
                posx = rand(-dpos, dpos);
                posy = rand(-dpos, dpos);
                break;
            case 1:
                posx = rand(W-dpos, W+dpos);
                posy = rand(-dpos, dpos);
                break;
            case 2:
                posx = rand(W-dpos, W+dpos);
                posy = rand(H-dpos, H+dpos);
                break;
            default:
                posx = rand(dpos, dpos);
                posy = rand(H-dpos, H+dpos);
                break;
        }
        as_teroids.push({
            pos: [posx, posy],
            vel: [rand(-1, 1)/500, rand(-1, 1)/50],
            sz: rand(2, 3)
        });
    }
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

function as_draw_teroids() {
    var a;
    for (var i=0; i<as_teroids.length; i++) {
        a = as_teroids[i];
        CTX.lineWidth = 2;
        CTX.strokeStyle = "#FFF";
        CTX.beginPath();
        CTX.arc(a.pos[0], a.pos[1], a.sz*AS_SIZE, 0, 2 * Math.PI, false);
        CTX.stroke();
    }
}

function asteroids_frame(dt) {
    as_ctrl(dt);
    as_ctrl_teroids(dt);
    as_ctrl_bullets(dt);
    as_draw_teroids();
    as_draw_ship();
    return true;
}

function as_ctrl_teroids(dt) {
    var a;
    for (var i=0; i<as_teroids.length; i++) {
        a = as_teroids[i];
        a.pos[0] += a.vel[0] * dt;
        a.pos[1] += a.vel[1] * dt;
        if (a.pos[0] > W+20) {
            a.vel[0] *= -1;
            a.pos[0] = W+20;
        }
        if (a.pos[0] < -20) {
            a.vel[0] *= -1;
            a.pos[0] = -20;
        }
        if (a.pos[1] > H+20) {
            a.vel[1] *= -1;
            a.pos[1] = H+20;
        }
        if (a.pos[1] < -20) {
            a.vel[1] *= -1;
            a.pos[1] = -20;
        }
    }
}

function as_ctrl_bullets(dt) {
    var b;
    var new_bullets = []
    for (var i=0; i<as_bullets.length; i++) {
        b = as_bullets[i];
        if (b.live) {
            b.pos[0] += b.vel[0] * dt;
            b.pos[1] += b.vel[1] * dt;
            if ((b.pos[0] > W+20)
            || (b.pos[0] < -20)
            || (b.pos[1] > H+20)
            || (b.pos[1] < -20)) {
                b.live = false;
            }
            new_bullets.push(b);
        }
    }
    as_bullets = new_bullets;
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
    if (KEY.space) {
        var ang = deg2rad(as_dir) + Math.PI;
        bvelx -= Math.sin(ang)*dt;
        bvely += Math.cos(ang)*dt;
        as_bullets.push({
            pos: [as_x, as_y],
            vel: [bvelx, bvely],
            live: true
       }
    }
}

function asteroids_ctrl_hint() {
    return {"w or up-arrow   ": "fire engines",
            "a or left-arrow ": "rotate left",
            "d or right-arrow": "rotate right",
            "space key       ": "fire weapons"
    };
}

