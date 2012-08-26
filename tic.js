var TIC_CTRL_W = 200;
var TIC_CTRL_H = 300;

var TIC_PRT_W = 400;

var tic_txt;

var tic_printing;

var tic_field;

var tic_mouse_areas;

var tic_first;

var tic_won;
var tic_lost;

function tic_init() {
    tic_first = true;
    tic_won = false;
    tic_lost = false;
    tic_txt = [];
    tic_printing = false;
    tic_field = [" ", " ", " ",
                 " ", " ", " ",
                 " ", " ", " "];
    var x = W-TIC_CTRL_W+10;
    var y = 60;
    tic_mouse_areas = [
        {
            pos: [x, y],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(0);}
        },
        {
            pos: [x+50, y],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(1);}
        },
        {
            pos: [x+100, y],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(2);}
        },
        {
            pos: [x, y+50],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(3);}
        },
        {
            pos: [x+50, y+50],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(4);}
        },
        {
            pos: [x+100, y+50],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(5);}
        },
        {
            pos: [x, y+100],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(6);}
        },
        {
            pos: [x+50, y+100],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(7);}
        },
        {
            pos: [x+100, y+100],
            sz:  [40, 40],
            hover: voidfn,
            click: function() {tic_user_turn(8);}
        }
    ];
    set_mouse_areas(tic_mouse_areas);
}

function tic_draw_bg() {
    // main box
    CTX.fillStyle = "#1f1f1f";
    CTX.fillRect(W-TIC_CTRL_W-20, 30, TIC_CTRL_W, TIC_CTRL_H);
    CTX.fillStyle = "#554444";
    CTX.fillRect(W-TIC_CTRL_W-10, 40, TIC_CTRL_W-20, TIC_CTRL_H-20);
    // controls
    var a;
    for (var i = 0; i < tic_mouse_areas.length; i++) {
        a = tic_mouse_areas[i];
        CTX.fillStyle = "#cccccc";
        CTX.fillRect(a.pos[0], a.pos[1], a.sz[0], a.sz[1]);
        CTX.fillStyle = "#333333";
        CTX.textAlign = "center";
        CTX.fillText(i+"", a.pos[0]+20, a.pos[1]+28);
    }
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
    if (rand(0, 2) == 1) {
        tic_printing -= 6;
    }
    if (tic_printing < 0)
        tic_printing = 0;
    var y;
    for (var i = 0; i < tic_txt.length; i++) {
        y = i*20+60-tic_printing;
        if (y > H+50) {
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
    // printing indicator
    if (tic_printing > 0) {
        CTX.fillStyle = "#ff3333";
    } else {
        CTX.fillStyle = "#441111";
    }
    CTX.fillRect(TIC_PRT_W-40, 10, 10, 10);
}

function tic_cmp_turn() {
    var i = rand(0,8);
    var free_field = false;
    tic_line("COMPUTER TURN")
    for (var i = 0; i < tic_field.length; i++) {
        if (tic_field[i] != " ") {
            continue;
        }
        var free_field = i
        if (rand(0,9) == 1) {
            tic_field[i] = "X";
            return true;
        }
    }
    if (free_field !== false) {
        tic_field[free_field] = "X";
        return true;
    } else {
        tic_line("GAME OVER");
        return false; // game is over
    }
}

function tic_chk_game_cond() {
    var f = tic_field;
    var c;
    for (var i=0; i<2; i++) {
        if (i == 0)
            c = "X";
        else
            c = "O";
        if ((f[0] == c && f[1] == c && f[2] == c)
        ||  (f[3] == c && f[4] == c && f[5] == c)
        ||  (f[6] == c && f[7] == c && f[8] == c)

        ||  (f[0] == c && f[3] == c && f[6] == c)
        ||  (f[1] == c && f[4] == c && f[7] == c)
        ||  (f[2] == c && f[5] == c && f[8] == c)

        ||  (f[0] == c && f[4] == c && f[8] == c)
        ||  (f[6] == c && f[4] == c && f[2] == c)) {
            if (c == "X") {
                tic_line("YOU LOST");
                tic_lost = true;
                return;
            } else {
                tic_line("YOU WON");
                tic_won = true;
                return;
            }
        }
    }
}

function tic_user_turn(i) {
    if (tic_field[i] != " " || tic_printing > 0) {
        tic_line("");
        tic_line("INPUT ERROR ID107");
        tic_line("LAYER 8 PROBLEM DETECTED");
        tic_line("");
        tic_line("STOP.");
        tic_lost = true;
        return false; // fail -> lost
    }
    tic_field[i] = "O";
    tic_chk_game_cond();
    tic_line("");
    tic_line("YOUR TURN");
    tic_draw_field();
    tic_line("");
    tic_line("--------------");
    tic_line("");
    if (! tic_cmp_turn()) {
        tic_lost = true;
        return;
    };
    tic_draw_field();
    tic_line("");
    tic_chk_game_cond();
    tic_line("COMPUTER WAITING FOR YOU");
}

function tic_draw_field() {
    tic_line("+---+---+---+");
    tic_line("| "+tic_field[6]+" | "+tic_field[7]+" | "+tic_field[8]+" |");
    tic_line("+---+---+---+");
    tic_line("| "+tic_field[3]+" | "+tic_field[4]+" | "+tic_field[5]+" |");
    tic_line("+---+---+---+");
    tic_line("| "+tic_field[0]+" | "+tic_field[1]+" | "+tic_field[2]+" |");
    tic_line("+---+---+---+");

}

function tic_line(s) {
    if (tic_lost || tic_won) {
        return;
    }
    tic_txt.unshift(s);
    tic_printing += 20;
}

function tic_frame(dt) {
    clear("#bbaaaa");
    tic_draw_bg();
    if (tic_first) {
        tic_cmp_turn();
        tic_draw_field();
        tic_line("");
        tic_line("ON THE RIGHT TO PLAY");
        tic_line("USE THE NUMBER PAD");
        tic_line("");
        tic_line("COMPUTER WAITING FOR YOU");
        tic_first = false;
    }
    tic_print();

    if (tic_printing == 0) {
        if (tic_lost) {
            rm_mouse_areas();
            return false;
        } else if (tic_won) {
            rm_mouse_areas();
            return "next";
        }
    }
    return true;
}

function tic_ctrl_hint() {
    return {"mouse left click": "everything"};
}
