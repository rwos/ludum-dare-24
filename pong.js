var pong_py = H/2;
var pong_ey = H/2;
var pong_bx = W/2;
var pong_by = H/2;
var pong_speed = 0.3;
var pong_bdx = pong_speed;
var pong_bdy = pong_speed;

function advance_ball(dt) {
    pong_bx += pong_bdx * dt;
    pong_by += pong_bdy * dt;
    if (pong_bx > W) {
        pong_bdx *= -1;
        pong_bx = W;
    }
    if (pong_by > H) {
        pong_bdy *= -1;
        pong_by = H;
    }
    if (pong_bx < 0) {
        pong_bdx *= -1;
        pong_bx = 0;
    }
    if (pong_by < 0) {
        pong_bdy *= -1;
        pong_by = 0;
    }
}

function draw_ball() {
    CTX.fillStyle = "#33dd33";
    CTX.beginPath();
    CTX.arc(pong_bx, pong_by, 10, 0, 2 * Math.PI, false);
    CTX.fill();
}

function pong_frame(dt) {
    advance_ball(dt);
    clear("#000000");
    draw_ball();
}
