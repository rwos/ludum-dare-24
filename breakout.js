var breakout_px;
var breakout_bx;
var breakout_by;
var breakout_speed;
var breakout_bdx;
var breakout_bdy;
var breakout_lives;
var breakout_points;

var BREAKOUT_PADDLE_W;
var BREAKOUT_PADDLE_Y;
var BREAKOUT_BSZ;

var BREAKOUT_BRICK_W;
var BREAKOUT_BRICK_H;

var BREAKOUT_MAX_SPD = 0.7;

var breakout_bricks;

function breakout_init() {
    breakout_px = W/2;
    breakout_bx = W/2;
    breakout_by = H/2;
    breakout_speed = 0.1;
    breakout_bdx = breakout_speed;
    breakout_bdy = breakout_speed;

    breakout_lives = 20;
    breakout_points = 0;

    BREAKOUT_PADDLE_W = 70;
    BREAKOUT_PADDLE_Y = H-40;

    BREAKOUT_BRICK_W = W/10;
    BREAKOUT_BRICK_H = 20;

    breakout_bricks = [];
    var color;
    for (var y=0; y <5; y++) {
        if (y<1) {
            color = "#dd3333";
        } else if (y<2) {
            color = "#dddd33";
        } else if (y<3) {
            color = "#33dd33";
        } else if (y<4) {
            color = "#33dddd";
        } else {
            color = "#cc33cc";
        }
        for (var x=0; x<W/BREAKOUT_BRICK_W; x++) {
            breakout_bricks.push({
                pos: [x, y],
                col: color,
                there: true
            });
        }
    }
    BREAKOUT_BSZ = PONG_BSZ;
    if (! (BREAKOUT_BSZ > 5)) {
        BREAKOUT_BSZ = 5;
    }
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
    if (breakout_by > BREAKOUT_PADDLE_Y+BREAKOUT_BSZ) {
        breakout_bdy *= -1;
        breakout_by = BREAKOUT_PADDLE_Y+BREAKOUT_BSZ;
        if (breakout_bx < breakout_px || breakout_bx > breakout_px + BREAKOUT_PADDLE_W) {
            // HIT
            breakout_lives -= 1;
        } else {
            // player paddle x-drift
            if (KEY.left) {
                breakout_bdx -= 0.1;
            }
            if (KEY.right) {
                breakout_bdx += 0.1;
            }
        }
    }
    breakout_handle_brick_hit();
}

function breakout_handle_brick_hit() {
    var b;
    for (var i = 0; i < breakout_bricks.length; i++) {
        b = breakout_bricks[i];
        if (! b.there) continue;
        if (breakout_by < b.pos[1]*BREAKOUT_BRICK_H + BREAKOUT_BRICK_H // bottom
        &&  breakout_by > b.pos[1]*BREAKOUT_BRICK_H // top
        &&  breakout_bx > b.pos[0]*BREAKOUT_BRICK_W // left
        &&  breakout_bx < b.pos[0]*BREAKOUT_BRICK_W + BREAKOUT_BRICK_W) { // right
            b.there = false;
            if (breakout_speed < BREAKOUT_MAX_SPD) {
                breakout_speed *= 1.25;
            }
            if (breakout_bdy < 0) {
                breakout_bdy = breakout_speed;
            } else {
                breakout_bdy = -breakout_speed;
            }
            breakout_points = Math.ceil((breakout_points+100)*1.25);
            return;
        }
    }
}

function breakout_draw_paddle(x, y) {
    CTX.fillStyle = "#ddd";
    CTX.fillRect(x, y, BREAKOUT_PADDLE_W, 5);
}

function breakout_draw_ball() {
    CTX.fillStyle = "#ddd";
    CTX.beginPath();
    CTX.arc(breakout_bx, breakout_by, BREAKOUT_BSZ, 0, 2 * Math.PI, false);
    CTX.fill();
}

function breakout_draw_hud() {
    CTX.fillStyle = "#ddd";
    CTX.font = "15px sans-serif";
    CTX.textAlign = "right";
    CTX.fillText(breakout_lives + " LIVES LEFT", W-20, H-15);;
    CTX.textAlign = "left";
    CTX.fillText(breakout_points + "", 20, H-15);;
}

function breakout_draw_bricks() {
    var b;
    var brd = 4;
    var bricks_there = false;
    for (var i = 0; i < breakout_bricks.length; i++) {
        b = breakout_bricks[i];
        if (! b.there) continue;
        bricks_there = true;
        CTX.fillStyle = b.col;
        CTX.fillRect(b.pos[0]*BREAKOUT_BRICK_W+brd, b.pos[1]*BREAKOUT_BRICK_H+brd,
                    BREAKOUT_BRICK_W-brd*2, BREAKOUT_BRICK_H-brd*2);
    }
    return (! bricks_there);
}

function breakout_player_ctrl(dt) {
    var spd = 0.7;
    if (KEY.right) {
        breakout_px += spd*dt;
    }
    if (KEY.left) {
        breakout_px -= spd*dt;
    }
}

function breakout_frame(dt) {
    var wining_cond = false;
    breakout_advance_ball(dt);
    clear("#000000");
    breakout_draw_ball();
    breakout_player_ctrl(dt);
    breakout_draw_paddle(breakout_px, BREAKOUT_PADDLE_Y);
    breakout_draw_hud();
    if (breakout_lives <= 0) {
        return false; // lost
    }
    wining_cond = breakout_draw_bricks();
    if (wining_cond) {
        return "next"; // won
    }
    return true; // go on
}

function breakout_ctrl_hint() {
    return {"a or left-arrow ": "left",
            "d or right-arrow": "right"};
}

