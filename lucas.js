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

var lucas_mouse_areas = [];

var lucas_stage_areas = [];

var lucas_stage;

var lucas_stage_stuff = [
    [
        {
            name: "Darwin's Magic Banana",
            talk: "Don't be silly.",
            look: "Looks like a banana to me.",
            use:  "I' can't even reach it.",
            take: "I'm not tall enough.",
            hover: voidfn,
            click: function(){lucas_action("banana");},
            pos: [W-80, 30],
            sz: [50, 10]
        },
        {
            name: "Slingshot",
            talk: "It's not very talkative.",
            look: "A slingshot.",
            use:  "I'll have to take it, first.",
            take: "I now have a slingshot. Yay!",
            hover: voidfn,
            click: function(){lucas_action("slingshot");},
            pos: [W/2, LUCAS_H-50],
            sz: [30, 30]
        }
     ]
];

function lucas_action(s) {

    alert(s);
}

function lucas_init() {
    lucas_x = 0;
    lucas_y = 200;
    lucas_scale = 1;

    lucas_stage = 0;

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
        click: function() {lucas_action("goto");}
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
    lucas_stage_areas = lucas_stage_stuff[lucas_stage];
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
    // XXX rm_mouse_areas() on win and lose
    return true;
}

function lucas_ctrl_hint() {
    return {"mouse left click": "everything"};
}
