var pong_py = H/2;
var pong_ey = H/2;
var pong_bx = W/2;
var pong_by = H/2;
var pong_speed = 0.3;
var pong_bdx = pong_speed;
var pong_bdy = pong_speed;

var pong_ppoints = 0;
var pong_epoints = 0;

var PONG_PADDLE_H = 70;
var PONG_PADDLE_X = 15;

var PONG_BSZ = 2;

function pong_advance_ball(dt) {
    pong_bx += pong_bdx * dt;
    pong_by += pong_bdy * dt;
    if (pong_bx > W-PONG_PADDLE_X-PONG_BSZ) {
        if (pong_by < pong_ey || pong_by > pong_ey+PONG_PADDLE_H) {
            pong_ppoints += 1;
            PONG_BSZ += 2;
        }
        pong_bdx *= -1;
        pong_bx = W-PONG_PADDLE_X-PONG_BSZ;
    }
    if (pong_by > H-PONG_BSZ) {
        pong_bdy *= -1;
        pong_by = H-PONG_BSZ;
    }
    if (pong_bx < PONG_PADDLE_X+PONG_BSZ) {
        if (pong_by < pong_py || pong_by > pong_py+PONG_PADDLE_H) {
            pong_epoints += 1;
        }
        pong_bdx *= -1;
        pong_bx = PONG_PADDLE_X+PONG_BSZ;
    }
    if (pong_by < PONG_BSZ) {
        pong_bdy *= -1;
        pong_by = PONG_BSZ;
    }
}

function pong_draw_paddle(x, y) {
    CTX.fillStyle = "#33dd33";
    CTX.fillRect(x, y, 5, PONG_PADDLE_H);
}

function pong_draw_ball() {
    CTX.strokeStyle = "#33dd33";
    var lw = 10 - PONG_BSZ;
    if (lw < 2) {
        lw = 2;
    }
    CTX.lineWidth = lw;

    CTX.beginPath();
    CTX.arc(pong_bx, pong_by, PONG_BSZ*2, 0, 2 * Math.PI, false);
    CTX.stroke();
}

function pong_draw_points() {
    CTX.fillStyle = "#33dd33";
    CTX.font = "25px sans-serif";
    CTX.textAlign = "center";
    CTX.fillText(pong_ppoints + " : " + pong_epoints, W/2, 30);;
}

function pong_player_ctrl(dt) {
    var spd = 0.2;
    if (KEY.up) {
        pong_py -= spd*dt;
    }
    if (KEY.down) {
        pong_py += spd*dt;
    }
}

function pong_enemy_ctrl(dt) {
    var spd = 0.1;
    var dir = 1;
    if (pong_ey > pong_by) {
        dir = -1;
    }
    if (rand(0, 1) == 0) {
        pong_ey += spd*dt*dir;
    }
}

function pong_frame(dt) {
    pong_advance_ball(dt);
    clear("#000000");
    pong_draw_ball();
    pong_player_ctrl(dt);
    pong_enemy_ctrl(dt);
    pong_draw_paddle(PONG_PADDLE_X, pong_py);
    pong_draw_paddle(W-PONG_PADDLE_X, pong_ey);
    pong_draw_points();
    if (pong_epoints >= 10) {
        return false; // lost
    }
    if (pong_ppoints >= 10) {
        return "next"; // won
    }
    return true; // go on
}

