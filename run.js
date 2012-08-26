
var RUNNNING;

var END_TIME;
var START_TIME;
var TIME_DELTA;

var TARGET_FRAME_TIME = 1000 / 60;

var TIMEOUT;

var LEVELS = ["tic", "pong", "breakout", "asteroids", "pacman", "bros", "lucas", "wolf"]
var NEXT_LEVEL = 6;
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
        alert("YOU WON!");
        chg_level();
    } else if (! frame_ret) {
        alert("LOST");
        NEXT_LEVEL -= 1;
        chg_level();
    }
    RUNNING = setTimeout(main, TIMEOUT);
}

var TIME_DELTA = 0.3;
END_TIME = new Date().getTime();
chg_level();
RUNNING = setTimeout(main, 1);

