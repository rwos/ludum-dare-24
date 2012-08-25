
function wolf_init() {

}

function wolf_frame(dt) {
    clear("#00ff00");
    return true;
}

function wolf_ctrl_hint() {
    return {"w or up-arrow   ": "forwards",
            "s or down-arrow ": "backwards",
            "a or left-arrow ": "turn left",
            "d or right-arrow": "turn right",
            "space           ": "shoot",
            "q               ": "strafe left",
            "e               ": "strafe right",
    };
}

