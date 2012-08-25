var LUCAS_XS = 10;
var LUCAS_YS = 10;
var LUCAS_HS = 150;
var LUCAS_W = W-LUCAS_XS
var LUCAS_H = H-LUCAS_HS;

var lucas_menu = [
    ["go to", false],
    ["talk", false],
    ["look", false],
    ["read", false],
    ["pick up", false],
    ["use", false],
    ["ask", false],
    ["open", false],
    ["close", false]
];

var lucas_cur_action = "Hello Trullalala!";

function lucas_init() {
    
}

function lucas_draw_menu() {
    var m;
    CTX.font = "20px sans-serif";
    var next_x = LUCAS_XS*2;
    var next_y = H-LUCAS_HS+LUCAS_YS*5;
    var w = 0;
    CTX.fillStyle = "#dddddd";
    CTX.textAlign = "center";
    CTX.fillText(lucas_cur_action, W/2, H-LUCAS_HS+30);
    for (var i = 0; i < lucas_menu.length; i++) {
        m = lucas_menu[i];
        CTX.fillStyle = "#220022";
        w = CTX.measureText(m[0]).width + 20;
        CTX.fillRect(next_x, next_y, w, 35);
        if (m[1] == "hover") {
            CTX.fillStyle = "#33ff33";
        } else if (m[1] == "selected") {
            CTX.fillStyle = "#dddd33";
        } else {
            CTX.fillStyle = "#33dd33";
        }
        CTX.textAlign = "left";
        CTX.fillText(m[0], next_x+10, next_y+25);;
        next_x += w + 20;
        if  (next_x > LUCAS_W-LUCAS_XS*2) {
            next_y += 45;
            next_x = LUCAS_XS*2;
        }
        
    }
}

function lucas_frame(dt) {
    clear("#4444aa");
    // border
    CTX.fillStyle = "#000";
    CTX.fillRect(0, 0, W, LUCAS_YS);
    CTX.fillRect(0, 0, LUCAS_XS, H);
    CTX.fillRect(W-LUCAS_XS, 0, LUCAS_XS, H);
    CTX.fillRect(0, H-LUCAS_HS, W, LUCAS_HS);
    // menu
    lucas_draw_menu()
    return true;
}

function lucas_ctrl_hint() {
    return {"mouse left click": "everything"};
}
