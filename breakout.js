var breakout_px;
var breakout_bx;
var breakout_by;
var breakout_speed;
var breakout_bdx;
var breakout_bdy;

var BREAKOUT_PADDLE_W;
var BREAKOUT_PADDLE_Y;
var BREAKOUT_BSZ;

function breakout_init() {
    breakout_px = W/2;
    breakout_bx = W/2;
    breakout_by = H/2;
    breakout_speed = 0.3;
    breakout_bdx = breakout_speed;
    breakout_bdy = breakout_speed;


    BREAKOUT_PADDLE_W = 70;
    BREAKOUT_PADDLE_Y = H-25;

    BREAKOUT_BSZ = 2;
}

function breakout_advance_ball(dt) {
    breakout_bx += breakout_bdx * dt;
    breakout_by += breakout_bdy * dt;
    if (breakout_bx < BREAKOUT_BSZ) {
        breakout_bdx *= -1;
        breakout_bx = BREAKOUT_BSZ;
    }
    if (breakout_bx > W-BREAKOUT_BSZ) {
        breakout_bdx *= -1;
        breakout_bx = W-BREAKOUT_BSZ;
    }
    if (breakout_by < BREAKOUT_BSZ) {
        breakout_bdy *= -1;
        breakout_by = BREAKOUT_BSZ;
    }
    // XXX TODO: BRICK HIT
    // --> like formaly in pong - lineWidth-- + radius++
    if (breakout_by > BREAKOUT_PADDLE_Y+BREAKOUT_BSZ) {
        breakout_bdy *= -1;
        breakout_by = BREAKOUT_PADDLE_Y+BREAKOUT_BSZ;
        if (breakout_bx < breakout_px || breakout_bx > breakout_px + BREAKOUT_PADDLE_W) {
            // XXX HIT
            alert("life--");
        }
        // ELSE: X-DRIFT from player paddle
    }
}

function breakout_draw_paddle(x, y) {
    CTX.fillStyle = "#33dd33";
    CTX.fillRect(x, y, BREAKOUT_PADDLE_W, 5);
}

function breakout_draw_ball() {
    CTX.strokeStyle = "#33dd33";
    var lw = 10 - BREAKOUT_BSZ;
    if (lw < 2) {
        lw = 2;
    }
    CTX.lineWidth = lw;

    CTX.beginPath();
    CTX.arc(breakout_bx, breakout_by, BREAKOUT_BSZ*2, 0, 2 * Math.PI, false);
    CTX.stroke();
}

function breakout_player_ctrl(dt) {
    var spd = 0.4;
    if (KEY.right) {
        breakout_px += spd*dt;
    }
    if (KEY.left) {
        breakout_px -= spd*dt;
    }
}

function breakout_frame(dt) {
    breakout_advance_ball(dt);
    clear("#000000");
    breakout_draw_ball();
    breakout_player_ctrl(dt);
    breakout_draw_paddle(breakout_px, BREAKOUT_PADDLE_Y);
    return true; // go on
}

function breakout_ctrl_hint() {
    return {"a or left-arrow ": "left",
            "d or right-arrow": "right"};
}

