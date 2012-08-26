var LUCAS_XS = 10;
var LUCAS_YS = 10;
var LUCAS_HS = 150;
var LUCAS_W = W-LUCAS_XS
var LUCAS_H = H-LUCAS_HS;

var lucas_menu;
var lucas_inventory;
var lucas_cur_action;

var lucas_x;
var lucas_y;
var lucas_scale;

var lucas_say_to;
var lucas_say_s;

var lucas_mouse_areas = [];

var lucas_stage_areas = [];

var lucas_stage;

var lucas_stage_stuff = [
    [
        {
            hover: voidfn,
            click: function(){lucas_action("banana");},
            pos: [W-80, 30],
            sz: [50, 10]
        },
        {
            hover: voidfn,
            click: function(){lucas_action("slingshot");},
            pos: [W/2, LUCAS_H-50],
            sz: [30, 30]
        },
        {
            hover: voidfn,
            click: function(){lucas_action("next stage");},
            pos: [W-40, LUCAS_YS],
            sz: [40, LUCAS_H]
        }
     ]
];

function lucas_walk_to(x) {
    lucas_x = x-100;
}

function lucas_say(s) {
    lucas_say_to = 300;
    lucas_say_s = s;
}
function lucas_action(s) {
    // verbs
    if (s == "go to" || s == "talk" || s == "look" || s == "use" || s == "take") {
        lucas_cur_action = "";
    }
    if (lucas_cur_action == "go to ") {
        if (s == "next stage") {
            lucas_walk_to(W+20);
        } else if (s == "banana") {
            lucas_walk_to(W-20);
        } else if (s == "slingshot") {
            lucas_walk_to(W/2);
        } else if (s == "player") {
            lucas_say("I'm already here.");
        } else {
            lucas_cur_action = "";
            return lucas_action(s);
        }
    } else if (lucas_cur_action == "talk ") {
        if (s == "next stage") {
            lucas_say("Maybe I'll find someone to talk to there.");
        } else if (s == "banana") {
            lucas_say("Don't be silly.");
        } else if (s == "slingshot") {
            lucas_say("It's not very talkative.");
        } else if (s == "player") {
            lucas_say("Thanks, but no thanks.");
        } else {
            lucas_cur_action = "";
            return lucas_action(s);
        }
    } else if (lucas_cur_action == "look ") {
        if (s == "next stage") {
            lucas_say("The path leads to another low-resolution bitmap.");
        } else if (s == "banana") {
            lucas_say("Looks like a banana to me.");
        } else if (s == "slingshot") {
            lucas_say("It's a slingshot. Looks useful.");
        } else if (s == "player") {
            lucas_say("A mighty pirate, respected everywhere.");
        } else {
            lucas_cur_action = "";
            return lucas_action(s);
        }
    } else if (lucas_cur_action.indexOf("use ") === 0) {
        if (lucas_cur_action.indexOf("with") !== -1) {
            // second thing
            if (lucas_cur_action == "XXX TOODO") {

            } else {
                switch (rand(0,6)) {
                case 0:
                    lucas_say("I can't do that");
                    break;
                case 1:
                    lucas_say("That could work. Not.");
                    break;
                case 2:
                    lucas_say("Do you just brute-force your way through?");
                    break;
                case 3:
                    lucas_say("I... don't think so");
                    break;
                case 4:
                    lucas_say("Nope.");
                    break;
                default:
                    lucas_say("That won't work.");
                    break;
                }
            }
        } else {
            // first thing
            return lucas_cur_action += s + " with ";
        }
    } else if (lucas_cur_action == "take ") {
        if (s == "next stage") {
            lucas_say("I can't take that.");
        } else if (s == "banana") {
            lucas_say("I can't reach it.");
        } else if (s == "slingshot") {
            lucas_action("go to slingshot")
            lucas_take("slingshot");
            lucas_say("I've got a slingshot! Yay!");
        } else if (s == "player") {
            lucas_say("I am already taken.");
        } else {
            lucas_cur_action = "";
            return lucas_action(s);
        }
    } else {
        lucas_cur_action = "";
    }
    lucas_cur_action += s + " ";
}

function lucas_init() {
    lucas_x = 0;
    lucas_y = 200;
    lucas_scale = 1;

    lucas_stage = 0;
    lucas_say_to = 0;
    lucas_say_s = "";

    lucas_menu = [
        ["go to", 20,  380, 75, 35],
        ["talk",  110, 380, 75, 35],
        ["look",  200, 380, 75, 35],
        ["use", 20, 430, 75, 35],
        ["take", 110, 430, 75, 35]
    ];
    lucas_cur_action = "";
    var empt = {name:"",talk:"",look:"",use:""};
    lucas_inventory = [
        {
            name: "17 Gold Coins",
            talk: "They have nothing interesting to tell.",
            look: "Seventeen shiny gold coins!",
            use:  "There's nothing to buy here."
        },
        empt, empt, empt
    ];
    lucas_mouse_areas = [];
    // add menu mouse areas
    lucas_mouse_areas.push({
        pos: [lucas_menu[0][1], lucas_menu[0][2]],
        sz:  [lucas_menu[0][3], lucas_menu[0][4]],
        hover: voidfn,
        click: function() {lucas_action("go to");}
    });
    lucas_mouse_areas.push({
        pos: [lucas_menu[1][1], lucas_menu[1][2]],
        sz:  [lucas_menu[1][3], lucas_menu[1][4]],
        hover: voidfn,
        click: function() {lucas_action("talk");}
    });
    lucas_mouse_areas.push({
        pos: [lucas_menu[2][1], lucas_menu[2][2]],
        sz:  [lucas_menu[2][3], lucas_menu[2][4]],
        hover: voidfn,
        click: function() {lucas_action("look");}
    });
    lucas_mouse_areas.push({
        pos: [lucas_menu[3][1], lucas_menu[3][2]],
        sz:  [lucas_menu[3][3], lucas_menu[3][4]],
        hover: voidfn,
        click: function() {lucas_action("use");}
    });
    lucas_mouse_areas.push({
        pos: [lucas_menu[4][1], lucas_menu[4][2]],
        sz:  [lucas_menu[4][3], lucas_menu[4][4]],
        hover: voidfn,
        click: function() {lucas_action("take");}
    });
    // add inventory mouse areas
    var x = W/2 + LUCAS_XS*6;
    var dy = H-LUCAS_HS+LUCAS_YS*6-20;
    var t;
    for (var i = 0; i < lucas_inventory.length; i++) {
        t = lucas_inventory[i];
        lucas_mouse_areas.push({
            pos: [x, dy+i*20],
            sz:  [200, 40],
            hover: voidfn,
            click: function() {lucas_action(t.name);}
        });
    }
    lucas_set_stage_mouse_areas();
}

function lucas_set_stage_mouse_areas() {
    lucas_stage_areas = lucas_stage_stuff[lucas_stage].slice(0);
    // add player
    lucas_stage_areas.push({
        pos: [lucas_x, lucas_y],
        sz: [50*lucas_scale, 100*lucas_scale],
        hover: voidfn,
        click: function() {lucas_action("player");}
    });
    // setting areas
    var all_areas = lucas_mouse_areas.slice(0);
    all_areas.push.apply(
            all_areas, lucas_stage_areas
    );
    set_mouse_areas(all_areas);
}

function lucas_draw_menu() {
    CTX.font = "20px sans-serif";
    CTX.fillStyle = "#dddddd";
    CTX.textAlign = "center";
    CTX.fillText(lucas_cur_action, W/2, H-LUCAS_HS+30);
    var m;
    for (var i = 0; i < lucas_menu.length; i++) {
        m = lucas_menu[i];
        CTX.fillStyle = "#220022";
        CTX.fillRect(m[1], m[2], m[3], m[4]);
        CTX.fillStyle = "#33dd33";
        CTX.textAlign = "center";
        CTX.fillText(m[0], m[1]+m[3]/2, m[2]+25);
    }
}

function lucas_draw_inventory() {
    var x = W/2 + LUCAS_XS*6;
    var dy = H-LUCAS_HS+LUCAS_YS*6;
    CTX.fillStyle = "#333333";
    CTX.fillRect(x-10, dy-20, 250, 100);
    CTX.font = "15px sans-serif";
    CTX.fillStyle = "#dddddd";
    CTX.textAlign = "left";
    var t;
    for (var i = 0; i < lucas_inventory.length; i++) {
        t = lucas_inventory[i];
        CTX.fillText(t.name, x, dy+i*20);
    }
}

function lucas_draw() {
    var y = 200;
    // player
    CTX.fillStyle = "#ffffff";
    CTX.fillRect(lucas_x, y, 50, 100);
    // stage
    var s;
    for (var i = 0; i < lucas_stage_stuff[lucas_stage].length; i++) {
        s = lucas_stage_stuff[lucas_stage][i];
        CTX.fillRect(s.pos[0], s.pos[1], s.sz[0], s.sz[1]);
    }
}

function lucas_frame(dt) {
    clear("#4444aa");
    lucas_draw();
    // border
    CTX.fillStyle = "#000";
    CTX.fillRect(0, 0, W, LUCAS_YS);
    CTX.fillRect(0, 0, LUCAS_XS, H);
    CTX.fillRect(W-LUCAS_XS, 0, LUCAS_XS, H);
    CTX.fillRect(0, H-LUCAS_HS, W, LUCAS_HS);
    // menu
    lucas_draw_menu()
    lucas_draw_inventory()
    lucas_set_stage_mouse_areas();
    // XXX rm_mouse_areas() on win and lose
    // text
    if (lucas_say_to > 0) {
        lucas_say_to -= 1;
        CTX.fillStyle = "#00ffff";
        CTX.font = "20px sans-serif";
        CTX.textAlign = "center";
        CTX.fillText(lucas_say_s, W/2, 40);
    }

    return true;
}

function lucas_ctrl_hint() {
    return {"mouse left click": "everything"};
}
