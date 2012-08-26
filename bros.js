var BROS_MAP = [
"                                                                                                                                              ",
"                                                                                                                                              ",
"                                                                                                                              nn    o         ",
"                                                                                                                             nnn    |         ",
"       GG  G                                                                        =====                  nn               nnnn    |         ",
"                                        nn=======                                                                          nnnnn    |         ",
"                                n     nnnn                   =====         =========                                      nnnnnn    |         ",
"]            x       nn       xnn   nnnnnn               =========         =========             nn              n       nnnnnnn    |         ",
"===============  =======   ======   =========        =============   = =   ==============    ======   = =  ============  =====================",
"###############  #######   ######   #########        #############   # #   ##############     #####   # #  ############  #####################",
"###############  #######   ######   #########        #############   # #   ##############     #####   # #  ############  #####################",
"###############  #######   ######   #########        #############   # #   ##############     #####   # #  ############  #####################"
];

var bros_pos;
var bros_rest;
var bros_yvel;
var bros_dir;
var bros_anim;

var bros_world_off;

var bros_end_x;

var BROS_T_SZ = 40;

var BROS_PL_H = 2*BROS_T_SZ;
var BROS_PL_W = BROS_T_SZ;

var BROS_I_GRASS = new Image();
BROS_I_GRASS.src = "bros_grass.png";
var BROS_I_EARTH = new Image();
BROS_I_EARTH.src = "bros_earth.png";
var BROS_I_STONE = new Image();
BROS_I_STONE.src = "bros_stone.png";
var BROS_I_GOLD = new Image();
BROS_I_GOLD.src = "bros_gold.png";

var BROS_I = [
    new Image(),
    new Image()
];
BROS_I[0].src = "bros_1.png";
BROS_I[1].src = "bros_2.png";

function bros_map_at(x, y) {
    var ix = Math.round(x);
    var iy = Math.round(y);
    if (iy < 0 || iy >= BROS_MAP.length || ix < 0 || ix > BROS_MAP[iy].length) {
        return " ";
    }
    return BROS_MAP[iy][ix];
}

function bros_init() {
    bros_pos = [1,5];
    bros_rest = false;
    bros_yvel = 0;
    bros_dir = 1;
    bros_anim = 0;
    bros_world_off = 0;
    bros_end_x = bros_get_end_x();
}

function bros_get_end_x() {
    for (var y=0; y<BROS_MAP.length; y++) {
        for (var x=0; x<BROS_MAP[y].length; x++) {
            if (BROS_MAP[y][x] == "|")
                return x;
        }
    }
}

function bros_ctrl_pl(dt) {
    // world offset (camera)
    if (bros_pos[0]*BROS_PL_W > W/2) {
        bros_world_off -= 3;
    }
    // gravity
    var grav = 0.001;
    if (! bros_rest) {
        bros_yvel -= grav;
    }
    // input
    var spd = 0.005;
    if (KEY.right) {
        if (bros_rest)
            bros_anim += dt;
        bros_pos[0] += spd*dt;
        bros_dir = 1;
    } else if (KEY.left) {
        if (bros_rest)
            bros_anim += dt;
        bros_pos[0] -= spd*dt;
        bros_dir = -1;
    } else {
        bros_anim = 0;
    }
    if (! bros_rest) {
        bros_anim = 10;
    }
    if (bros_rest && (KEY.space || KEY.up)) {
        bros_rest = false;
        bros_yvel += 20*grav;
    }
    bros_pos[1] -= bros_yvel*dt;
    // collision
    if (
        // bottom left
        bros_map_at(Math.floor(bros_pos[0]), Math.floor(bros_pos[1])) != " "
        // bottom right
    ||  bros_map_at(Math.ceil(bros_pos[0]), Math.floor(bros_pos[1])) != " "
    ) {
        bros_pos[1] = Math.floor(bros_pos[1]);
        bros_yvel = 0;
        bros_rest = true;
    } else {
        bros_rest = false;
    }
}

function bros_draw_pl() {
    var x = bros_pos[0]*BROS_T_SZ + bros_world_off;
    var y = bros_pos[1]*BROS_T_SZ-BROS_PL_H;
    var frame = Math.round(bros_anim/10) % 2;
    if (bros_dir < 0) {
        x += BROS_T_SZ;
    }
    CTX.translate(x, y);
    CTX.scale(bros_dir, 1);
    CTX.drawImage(BROS_I[frame], 0, 0);
    CTX.scale(bros_dir, 1);
    CTX.translate(-x, -y);
}

function bros_draw_tile(x, y, c, off) {
    if (c == " ")
        return;
    var rx = x*BROS_T_SZ + off;
    var ry = y*BROS_T_SZ;
    switch (c) {
    case "=":
        CTX.drawImage(BROS_I_GRASS, rx, ry);
        break;
    case "#":
        CTX.drawImage(BROS_I_EARTH, rx, ry);
        break;
    case "G":
        CTX.drawImage(BROS_I_GOLD, rx, ry);
        break;
    case "]":
        CTX.fillStyle = "#33aa33";
        CTX.fillRect(rx, ry, BROS_T_SZ, BROS_T_SZ);
        break;
    case "n":
        CTX.drawImage(BROS_I_STONE, rx, ry);
        break;
    default:
        CTX.drawImage(BROS_I_STONE, rx, ry);
        break;
    }
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
    if (bros_pos[1] > 30 || ((bros_pos[0]*BROS_T_SZ) < -bros_world_off)) {
        return false;
    }
    if (bros_pos[0] >= bros_end_x) {
        return "next";
    }
    return true;
}

function bros_ctrl_hint() {
    return {"a or left-arrow       ": "left",
            "d or right-arrow      ": "right",
            "w or up-arrow or space": "jump"};
}

