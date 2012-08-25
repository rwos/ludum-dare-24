var BROS_MAP = [
"                                                                 ",
"                                                                 ",
"                                                       o         ",
"                                                nnn    |         ",
"                                               nnnn    |         ",
"                                      GG      nnnnn    |         ",
"       GG  G                  n              nnnnnn    |         ",
"]            x       nn  nn xnn  n    n     nnnnnnn    |         ",
"=============== =======  ======  ================================",
"############### #######  ######  ################################"
];

var bros_pos;
var bros_rest;
var bros_yvel;

var bros_world_off;

var BROS_T_SZ = 50;

var BROS_PL_H = 60;
var BROS_PL_W = 40;

function bros_map_at(x, y) {
    var ix = Math.round(x);
    var iy = Math.round(y);
    if (iy < 0 || iy > BROS_MAP.length || ix < 0 || ix > BROS_MAP[iy].length) {
        return " ";
    }
    return BROS_MAP[iy][ix];
}

function bros_init() {
    bros_pos = [1,5];
    bros_rest = false;
    bros_yvel = 0;
    bros_world_off = 0;
}

function bros_ctrl_pl(dt) {
    var grav = 0.001;
    bros_yvel -= grav;
    bros_pos[1] -= bros_yvel*dt;
}

function bros_draw_pl() {
    CTX.fillStyle = "#aa7777";
    CTX.fillRect(bros_pos[0]*BROS_T_SZ, bros_pos[1]*BROS_T_SZ-BROS_PL_H, BROS_PL_W, BROS_PL_H);
}

function bros_draw_tile(x, y, c, off) {
    if (c == " ")
        return;
    switch (c) {
    case "=":
        CTX.fillStyle = "#33dd33"; break;
    case "#":
        CTX.fillStyle = "#777733"; break;
    case "G":
        CTX.fillStyle = "#aaaa33"; break;
    case "]":
        CTX.fillStyle = "#33aa33"; break;
    case "n":
        CTX.fillStyle = "#444433"; break;
    default:
        CTX.fillStyle = "#444444"; break;
    }
    var rx = x*BROS_T_SZ + off;
    var ry = y*BROS_T_SZ;
    CTX.fillRect(rx, ry, BROS_T_SZ, BROS_T_SZ);
}

function bros_draw_map() {
    for (var y=0; y<BROS_MAP.length; y++) {
        for (var x=0; x<BROS_MAP[y].length; x++) {
            bros_draw_tile(x, y, BROS_MAP[y][x], bros_world_off);
        }
    }
}

function bros_frame(dt) {
    clear("#aaaaff");
    bros_ctrl_pl(dt);
    bros_draw_map();
    bros_draw_pl();
    document.getElementById("d").innerHTML = bros_pos[0] + " - " + bros_pos[1];
    return true;
}

function bros_ctrl_hint() {
    return {"a or left-arrow ": "left",
            "d or right-arrow": "right",
            "space           ": "jump"};
}

