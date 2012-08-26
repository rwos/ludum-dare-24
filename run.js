
var RUNNNING;

var END_TIME;
var START_TIME;
var TIME_DELTA;

var TARGET_FRAME_TIME = 1000 / 60;

var TIMEOUT;

var LEVELS = [
    "title",
    "tic",
    "tic2pong",
    "pong",
    "pong2ba",
    "breakout",
    "ba2as",
    "asteroids",
    "as2pac",
    "pacman",
    "pac2bros",
    "bros",
    "bros2luc",
    "lucas",
    "luc2wolf",
    "wolf",
    "gameend"
]
var NEXT_LEVEL = 0;
var frame_fun;
var frame_ret;
var ctrl_hint_fun;

function display_ctrl_hint() {
    var s = "<pre>";
    var hints = ctrl_hint_fun();
    for (var key in hints) {
        s += "<b>" + key + "</b> --- " + hints[key] + "\n";
    }
    document.getElementById("ctrl-hint").innerHTML = s + "</pre>";
}

function chg_level() {
    var lvl_name = LEVELS[NEXT_LEVEL];
    // evil eval! :-)
    frame_fun = eval(lvl_name + "_frame");
    ctrl_hint_fun = eval(lvl_name + "_ctrl_hint");
    display_ctrl_hint();
    for (var k in KEY) {
        KEY[k] = false;
    }
    TARGET_FRAME_TIME = 1000 / 60;
    eval(lvl_name + "_init()");
    NEXT_LEVEL += 1;
}

var lost_cnt;
function lost_init() {
    CTX.fillStyle = "rgba(0, 0, 0, 0.7)";
    CTX.fillRect(0, 0, W, H);
    CTX.fillStyle = "#aaa";
    CTX.fillRect(100, 100, W-200, H-200);
    CTX.lineWidth = 5;
    CTX.stokeStyle = "#333";
    CTX.strokeRect(100, 100, W-200, H-200);
    CTX.font = "40px monospace";
    CTX.fillStyle = "#111";
    CTX.textAlign = "center";
    CTX.fillText("You've lost!", W/2, 200);
    CTX.font = "20px monospace";
    CTX.fillText("press space to try again", W/2, 300);
    lost_cnt = 50;
}

function lost_frame() {
    if (lost_cnt > 0)
        lost_cnt -= 1;
    if (KEY.space && lost_cnt <= 0) {
        return "next";
    }
    return true;
}

function main() {
    START_TIME = new Date().getTime();
    clearTimeout(RUNNING);
    END_TIME = new Date().getTime();
    TIME_DELTA = (TIME_DELTA + (END_TIME - START_TIME)) / 2;
    TIMEOUT = 1;
    if (TIME_DELTA < TARGET_FRAME_TIME) {
        TIMEOUT = Math.round(TARGET_FRAME_TIME-TIME_DELTA);
    }
    frame_ret = frame_fun(TIME_DELTA + TIMEOUT);
    if (frame_ret === "next") {
        chg_level();
    } else if (! frame_ret) {
        NEXT_LEVEL -= 1;
        lost_init();
        frame_fun = lost_frame;
    }
    RUNNING = setTimeout(main, TIMEOUT);
}

var TIME_DELTA = 0.3;
END_TIME = new Date().getTime();
chg_level();
RUNNING = setTimeout(main, 1);

