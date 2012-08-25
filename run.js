
var RUNNNING;

var END_TIME;
var START_TIME;
var TIME_DELTA;

var TARGET_FRAME_TIME = 1000 / 60;

var TIMEOUT;

var frame_fun = pong_frame;
var frame_ret;
var ctrl_hint_fun = pong_ctrl_hint;

function display_ctrl_hint() {
    var s = "<pre>";
    var hints = ctrl_hint_fun();
    for (var key in hints) {
        s += "<b>" + key + "</b>\t\t---" + hints[key] + "\n";
    }
    document.getElementById("ctrl-hint").innerHTML = s + "</pre>";
}

function main() {
    START_TIME = new Date().getTime();
    clearTimeout(RUNNING);
    clear("#000000");
    END_TIME = new Date().getTime();
    TIME_DELTA = (TIME_DELTA + (END_TIME - START_TIME)) / 2;
    TIMEOUT = 1;
    if (TIME_DELTA < TARGET_FRAME_TIME) {
        TIMEOUT = Math.round(TARGET_FRAME_TIME-TIME_DELTA);
    }
    frame_ret = frame_fun(TIME_DELTA + TIMEOUT);
    if (frame_ret === "next") {
        alert("NEXT LEVEL");
    } else if (! frame_ret) {
        alert("LOST");
    }
    document.getElementById("frame-time").innerHTML = TIMEOUT + " - " + TIME_DELTA;
    RUNNING = setTimeout(main, TIMEOUT);
}

var TIME_DELTA = 0.3;
END_TIME = new Date().getTime();
display_ctrl_hint();
RUNNING = setTimeout(main, 1);

