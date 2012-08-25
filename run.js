
var RUNNNING;

var last_end_time;
var start_time;
var TIME_DELTA;

var TARGET_FRAME_TIME = 1000 / 60;

var timeout;

function main() {
    start_time = new Date().getTime();
    clearTimeout(RUNNING);
    clear("#000000");
    last_end_time = new Date().getTime();
    TIME_DELTA = (TIME_DELTA + (last_end_time - start_time)) / 2;
    timeout = 1;
    if (TIME_DELTA < TARGET_FRAME_TIME) {
        timeout = Math.round(TARGET_FRAME_TIME-TIME_DELTA);
    }
    pong_frame(TIME_DELTA + timeout);
    document.getElementById("frame-time").innerHTML = timeout + " - " + TIME_DELTA;
    RUNNING = setTimeout(main, timeout);
}

var TIME_DELTA = 0.3;
last_end_time = new Date().getTime();
RUNNING = setTimeout(main, 1);

