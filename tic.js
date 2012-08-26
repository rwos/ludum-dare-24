var TIC_CTRL_W = 200;
var TIC_CTRL_H = 300;

var TIC_PRT_W = 400;

var tic_txt;

var tic_printing;

function tic_init() {
    tic_txt = [];
    tic_printing = false;
    set_mouse_areas([
        {
            pos: [20, 20],
            sz:  [20, 20],
            hover: function() {alert("HOVER");},
            click: function() {alert("CLICK");}
        }
    ]);
}

function tic_draw_bg() {
    // main box
    CTX.fillStyle = "#1f1f1f";
    CTX.fillRect(W-TIC_CTRL_W-20, 30, TIC_CTRL_W, TIC_CTRL_H);
    CTX.fillStyle = "#554444";
    CTX.fillRect(W-TIC_CTRL_W-10, 40, TIC_CTRL_W-20, TIC_CTRL_H-20);
    // controls
    // XXX TODO

    // frame
    CTX.fillStyle = "#332222";
    CTX.fillRect(W-TIC_CTRL_W+10, TIC_CTRL_H+30, TIC_CTRL_W-60, TIC_CTRL_H);
    // main box shadow
    CTX.fillStyle = "#1f1717";
    CTX.fillRect(W-TIC_CTRL_W+20, TIC_CTRL_H+30, TIC_CTRL_W-70, 5);
    // paper background
    CTX.fillStyle = "#ddddff";
    CTX.fillRect(10, 30, TIC_PRT_W-15, H-30);
}

function tic_print(s) {
    CTX.font = "20px monospace";
    CTX.fillStyle = "#333355";
    CTX.textAlign = "left";
    if (rand(0, 5) == 1) {
        tic_printing -= 1;
    }
    if (tic_printing < 0)
        tic_printing = 0;
    var y;
    for (var i = 0; i < tic_txt.length; i++) {
        y = i*20+60-tic_printing;
        if (y > H) {
            tic_txt.pop();
            continue;
        }
        CTX.fillText(tic_txt[i], 40, y);
    }
    // printer head
    CTX.fillStyle = "#554444";
    CTX.fillRect(0, 0, TIC_PRT_W, 30);
    // printer head shadow
    CTX.fillStyle = "#1f172f";
    CTX.fillRect(15, 30, TIC_PRT_W-25, 5);
}

function tic_line(s) {
    tic_txt.unshift(s);
    tic_printing += 20;
}

var XXX = 20;
function tic_frame(dt) {
    clear("#bbaaaa");
    tic_draw_bg();
    if (XXX > 10) {
        tic_line("+---+---+---+");
        tic_line("|   |   |   |");
        tic_line("+---+---+---+");
        tic_line("|   |   |   |");
        tic_line("+---+---+---+");
        tic_line("|   |   |   |");
        tic_line("+---+---+---+");
        XXX --;
    }
    tic_print();

    // XXX TODO: ON WINNGING + LOSING: rm_mouse_areas()

    return true;
}

function tic_ctrl_hint() {
    return {"mouse left click": "everything"};
}
