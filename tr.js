var title_fade;
var title_dir = 1;
var title_len = 1;
function title_init() {
    title_fade = 100;
}
function title_frame(dt) {
    clear("#000");
    CTX.font = "40px monospace";
    CTX.fillStyle = "#dddddd";
    CTX.textAlign = "center";
    CTX.fillText("Moore's Game", W/2, 160);
    CTX.font = "20px monospace";
    CTX.textAlign = "right";
    CTX.fillText("press space to play", W-40, H-60);
    var dy = H-40;
    var sz;
    for (var x = 0; x < title_len; x++) {
        CTX.fillStyle = "#33aa33";
        sz = 40 - x/10.0;
        if (sz < 1) {
            sz = 1;
        }
        CTX.fillRect(x, dy-(x*x)/640, sz, sz);
    }
    title_len += 1*title_dir;
    if (title_len >= W) {
        title_dir = -1;
    }
    if (title_len <= 0) {
        title_dir = 1;
    }
    if (KEY.space) {
        title_fade -= 1;
        return "next";
    }
    if (title_fade < 100) {

    }
    return true;
}
function title_ctrl_hint() {
    return {
        "Hi!  ": "look here for a quick key reference",
        "space": "start game"
    };
}


//////////////////////////////////////////////////////////////////

var tic2pong_paper_y;
var tic2pong_zoom;
function tic2pong_init() {
    tic2pong_paper_y = 30;
    tic2pong_zoom = false;
}
function tic2pong_print() {
    CTX.font = "20px monospace";
    CTX.fillStyle = "#333355";
    CTX.textAlign = "left";
    var y;
    for (var i = 0; i < tic_txt.length; i++) {
        y = i*20+60+tic2pong_paper_y;
        CTX.fillText(tic_txt[i], 40, y);
    }
    // printer head shadow
    CTX.fillStyle = "#1f172f";
    CTX.fillRect(15, 30, TIC_PRT_W-25, 5);
}
function tic2pong_frame(dt) {
    if (tic2pong_zoom) {
        tic2pong_paper_y -= dt;
        // bg
        CTX.fillStyle = "rgba(0, 0, 0, 0.1)";
        CTX.fillRect(0, 0, W, H);
    } else {
        tic2pong_paper_y += dt/5;
        // bg
        CTX.fillStyle = "#bbaaaa";
        CTX.fillRect(10, 30, TIC_PRT_W-15, H);
        // draw_paper
        CTX.fillStyle = "#ddddff";
        CTX.fillRect(10, tic2pong_paper_y, TIC_PRT_W-15, H-30);
        // print
        tic2pong_print();
    }
    if (tic2pong_paper_y > H) {
        tic2pong_zoom = true;
    }
    if (tic2pong_paper_y <= 0) {
        if (KEY.space) {
            return "next";
        } else {
            CTX.fillStyle = "#aaa";
            CTX.fillRect(100, 100, W-200, H-200);
            CTX.lineWidth = 5;
            CTX.stokeStyle = "#333";
            CTX.strokeRect(100, 100, W-200, H-200);
            CTX.font = "40px monospace";
            CTX.fillStyle = "#111";
            CTX.textAlign = "center";
            CTX.fillText("You've won!", W/2, 200);
            CTX.font = "20px monospace";
            CTX.fillText("press space to continue", W/2, 300);
        }
    }
    return true;
}
function tic2pong_ctrl_hint() {return {};}

//////////////////////////////////////////////////////////////////

var pong2ba_ang;
var pong2ba_scaled;
var PONG2BA_SC = 0.88;
function pong2ba_init() {
    pong2ba_ang = 0;
    CTX.scale(PONG2BA_SC, PONG2BA_SC);
    pong2ba_scaled = false;
    clear("#000");
}
function pong2ba_frame(dt) {
    if (pong2ba_ang < 90) {
        CTX.scale(1/PONG2BA_SC, 1/PONG2BA_SC);
        clear("#000");
        CTX.scale(PONG2BA_SC, PONG2BA_SC);
        pong2ba_ang += dt/50;
        var ang = deg2rad(pong2ba_ang);
        CTX.translate(W/2, H/2);
        CTX.rotate(-ang);
        CTX.translate(-W/2, -H/2);
        pong_draw_points();
        pong_draw_ball();
        pong_draw_paddle(PONG_PADDLE_X, pong_py);
        pong_draw_paddle(W-PONG_PADDLE_X, pong_ey);
        CTX.translate(W/2, H/2);
        CTX.rotate(ang);
        CTX.translate(-W/2, -H/2);
    } else {
        if (! pong2ba_scaled) {
            CTX.scale(1/PONG2BA_SC, 1/PONG2BA_SC);
            pong2ba_scaled = true;
        }
        if (KEY.space) {
            return "next";
        } else {
            CTX.fillStyle = "#aaa";
            CTX.fillRect(100, 100, W-200, H-200);
            CTX.lineWidth = 5;
            CTX.stokeStyle = "#333";
            CTX.strokeRect(100, 100, W-200, H-200);
            CTX.font = "40px monospace";
            CTX.fillStyle = "#111";
            CTX.textAlign = "center";
            CTX.fillText("You've won!", W/2, 200);
            CTX.font = "20px monospace";
            CTX.fillText("press space to continue", W/2, 300);
        }
    }
    return true;
}
function pong2ba_ctrl_hint() {return {};}


//////////////////////////////////////////////////////////////////

var ba2as_lw;
var ba2as_sz;
function ba2as_init() {
    ba2as_lw = 5;
    ba2as_sz = BREAKOUT_BSZ;
}
function ba2as_frame(dt) {
    if (ba2as_sz < 40) {
        clear("#000");
        ba2as_lw -= 1;
        if (ba2as_lw < 1)
            ba2as_lw = 1;
        ba2as_sz += 0.2;
        CTX.lineWidth = ba2as_lw;
        CTX.strokeStyle = "#ddd";
        CTX.beginPath();
        CTX.arc(breakout_bx, breakout_by, ba2as_sz, 0, 2 * Math.PI, false);
        CTX.stroke();
    } else {
        if (KEY.space) {
            return "next";
        } else {
            CTX.fillStyle = "#aaa";
            CTX.fillRect(100, 100, W-200, H-200);
            CTX.lineWidth = 5;
            CTX.stokeStyle = "#333";
            CTX.strokeRect(100, 100, W-200, H-200);
            CTX.font = "40px monospace";
            CTX.fillStyle = "#111";
            CTX.textAlign = "center";
            CTX.fillText("You've won!", W/2, 200);
            CTX.font = "20px monospace";
            CTX.fillText("press space to continue", W/2, 300);
        }
    }
    return true;
}
function ba2as_ctrl_hint() {return {};}

//////////////////////////////////////////////////////////////////

var as2pac_fade;
function as2pac_init() {
    as2pac_fade = 200;
}
function as2pac_frame(dt) {
    if (as2pac_fade > 0) {
        CTX.fillStyle = "rgba(0, 0, 100, 0.01)";
        CTX.fillRect(0, 0, W, H);
        as2pac_fade -= 1;
    } else {
        if (KEY.space) {
            return "next";
        } else {
            CTX.fillStyle = "#aaa";
            CTX.fillRect(100, 100, W-200, H-200);
            CTX.lineWidth = 5;
            CTX.stokeStyle = "#333";
            CTX.strokeRect(100, 100, W-200, H-200);
            CTX.font = "40px monospace";
            CTX.fillStyle = "#111";
            CTX.textAlign = "center";
            CTX.fillText("You've won!", W/2, 200);
            CTX.font = "20px monospace";
            CTX.fillText("press space to continue", W/2, 300);
        }
    }
    return true;
}
function as2pac_ctrl_hint() {return {};}

//////////////////////////////////////////////////////////////////

var pac2bros_scale;
function pac2bros_init() {
    pac2bros_scale = 1;
}
function pac2bros_frame(dt) {
    var dx = Math.round((W-(map[0].length*PM_TILE_SZ))/2);
    var dy = Math.round((H-(map.length*PM_TILE_SZ))/2)-30;
    if (pac2bros_scale < 20) {
        if (pac2bros_scale > 2) {
            PM_MAP_STYLE = "#5555ff";
        }
        if (pac2bros_scale > 4) {
            PM_MAP_STYLE = "#7777ff";
        }
        if (pac2bros_scale > 8) {
            PM_MAP_STYLE = "#aaaaff";
        }
        clear("#000");
        CTX.scale(pac2bros_scale, pac2bros_scale);
        CTX.translate(-dx*2, -dy);
        pm_draw_map();
        CTX.translate(+dx*2, +dy);
        CTX.scale(1/pac2bros_scale, 1/pac2bros_scale);
        pac2bros_scale += dt/100;
    } else {
        if (KEY.space) {
            return "next";
        } else {
            CTX.fillStyle = "#aaa";
            CTX.fillRect(100, 100, W-200, H-200);
            CTX.lineWidth = 5;
            CTX.stokeStyle = "#333";
            CTX.strokeRect(100, 100, W-200, H-200);
            CTX.font = "40px monospace";
            CTX.fillStyle = "#111";
            CTX.textAlign = "center";
            CTX.fillText("You've won!", W/2, 200);
            CTX.font = "20px monospace";
            CTX.fillText("press space to continue", W/2, 300);
        }
    }
    return true;
}
function pac2bros_ctrl_hint() {return {};}
//////////////////////////////////////////////////////////////////

var bros2luc_fade;
function bros2luc_init() {
    bros2luc_fade = 200;
}
function bros2luc_frame(dt) {
    if (bros2luc_fade > 0) {
        CTX.fillStyle = "rgba(0, 0, 0, 0.01)";
        CTX.fillRect(0, 0, W, H);
        bros2luc_fade -= 1;
    } else {
        if (KEY.space) {
            return "next";
        } else {
            CTX.fillStyle = "#aaa";
            CTX.fillRect(100, 100, W-200, H-200);
            CTX.lineWidth = 5;
            CTX.stokeStyle = "#333";
            CTX.strokeRect(100, 100, W-200, H-200);
            CTX.font = "40px monospace";
            CTX.fillStyle = "#111";
            CTX.textAlign = "center";
            CTX.fillText("You've won!", W/2, 200);
            CTX.font = "20px monospace";
            CTX.fillText("press space to continue", W/2, 300);
        }
    }
    return true;
}
function bros2luc_ctrl_hint() {return {};}
//////////////////////////////////////////////////////////////////

var luc2wolf_fade;
function luc2wolf_init() {
    luc2wolf_fade = 200;
}
function luc2wolf_frame(dt) {
    if (luc2wolf_fade > 0) {
        CTX.fillStyle = "rgba(0, 0, 100, 0.01)";
        CTX.fillRect(0, 0, W, H);
        luc2wolf_fade -= 1;
    } else {
        if (KEY.space) {
            return "next";
        } else {
            CTX.fillStyle = "#aaa";
            CTX.fillRect(100, 100, W-200, H-200);
            CTX.lineWidth = 5;
            CTX.stokeStyle = "#333";
            CTX.strokeRect(100, 100, W-200, H-200);
            CTX.font = "40px monospace";
            CTX.fillStyle = "#111";
            CTX.textAlign = "center";
            CTX.fillText("You've won!", W/2, 200);
            CTX.font = "20px monospace";
            CTX.fillText("press space to get psyched", W/2, 300);
        }
    }
    return true;
}
function luc2wolf_ctrl_hint() {return {};}
//////////////////////////////////////////////////////////////////

var gameend_fade;
function gameend_init() {
    gameend_fade = 200;
}
function gameend_frame(dt) {
    if (gameend_fade > 0) {
        CTX.fillStyle = "rgba(0, 0, 100, 0.01)";
        CTX.fillRect(0, 0, W, H);
        gameend_fade -= 1;
    } else {
        CTX.fillStyle = "#aaa";
        CTX.fillRect(100, 100, W-200, H-200);
        CTX.lineWidth = 5;
        CTX.stokeStyle = "#333";
        CTX.strokeRect(100, 100, W-200, H-200);
        CTX.font = "40px monospace";
        CTX.fillStyle = "#111";
        CTX.textAlign = "center";
        CTX.fillText("THE END", W/2, 200);
        CTX.font = "20px monospace";
        CTX.fillText("How did you find the green blocks?", W/2, 250);
        CTX.font = "15px monospace";
        CTX.fillText("I've made the map and I didn't find them...", W/2, 300);
        CTX.font = "20px monospace";
        CTX.fillText("Thanks for playing!", W/2, 350);
    }
    return true;
}
function gameend_ctrl_hint() {return {};}
