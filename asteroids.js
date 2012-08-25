var as_x;
var as_y;
var as_dir;
var as_engine;
var as_vel;

var as_teroids;

function asteroids_init() {
    as_x = W/2;
    as_y = H/2;
    as_dir = rand(0, 359);
    as_engine = false;
    as_vel = 0;
}

function asteroids_frame(dt) {

    return true;
}

function as_ctrl() {
    as_engine = KEY.up;
    if (KEY.left) {
        as_dir -= 1;
    }
    if (KEY.right) {
        as_dir += 1;
    }
}

function asteroids_ctrl_hint() {
    return {"w or up-arrow   ": "fire engines",
            "a or left-arrow ": "rotate left",
            "d or right-arrow": "rotate right",
            "space key       ": "fire weapons"
    };
}

