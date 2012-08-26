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

