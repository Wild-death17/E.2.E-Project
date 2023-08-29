//----Moshe Cohen---------------------------------------------------
let Update = setInterval(GameUpdateLoop, 20);

function GameUpdateLoop() {
  updateObject();
  updateCloud();
  if (isJumping) Jump();
  else WolkCharImg();
}
//--jump--------------
const JUMP_SPEED = 4;
const GRAVITY = 0.2;
let isJumping = false;
let Yval;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !isJumping) {
    Yval = JUMP_SPEED;
    isJumping = true;
  }
  if (e.shiftKey && !isJumping) {
    Yval = JUMP_SPEED - 1;
    isJumping = true;
  }
});
function Jump() {
  if (!isJumping) return;
  let duck = document.querySelector(".Character");
  duck.style.backgroundImage =
    "url(./Site_Imgs/Charecter/duck-removebg-preview.png)";
  increaseObjectProp(duck, "--bottom", Yval);
  if (getObjectProp(duck, "--bottom") <= 0) {
    setObjectProp(duck, "--bottom", 0);
    isJumping = false;
  }
  Yval -= GRAVITY;
}
//--Objects-----------
let NextObject = 500;
let Xval = 0.5;
function updateObject() {
  document.querySelectorAll(".Object").forEach((Obj) => {
    increaseObjectProp(Obj, "--right", Xval);
    if (getObjectProp(Obj, "--right") >= 100) Obj.remove();
  });
  if (NextObject <= 0) {
    createObject();
    NextObject = random_number(2000, 500);
  }
  NextObject -= 10;
}
function createObject() {
  let Obj = document.createElement("div");
  let rand = random_number(4, 0);
  Obj.classList.add(`Object${rand}`);
  Obj.classList.add(`Object`);
  document.getElementsByClassName("Map")[0].append(Obj);
  setObjectProp(Obj, "--right", 0);
  return Obj;
}
//--get-set-inc-dec---
function getObjectProp(Elem, Prop) {
  return parseFloat(getComputedStyle(Elem).getPropertyValue(Prop));
}
function setObjectProp(Elem, Prop, Value) {
  Elem.style.setProperty(Prop, Value);
}
function increaseObjectProp(Elem, Prop, inc) {
  setObjectProp(Elem, Prop, getObjectProp(Elem, Prop) + inc);
}
function decreaseObjectProp(Elem, Prop, dec) {
  setObjectProp(Elem, Prop, getObjectProp(Elem, Prop) - dec);
}
//--Timer-------------
let sec = 0,
  min = 0;
function Timer() {
  setInterval(() => {
    let Time = `Timer:  ${addZero(min)}:${addZero(sec++)}`;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    document.querySelector(".Timer").innerHTML = Time;
  }, 1000);
}
function addZero(Val) {
  if (Val.toString().length == 1) {
    return `0${Val}`;
  } else {
    return `${Val}`;
  }
}
//----Zion Amar---------------------------------------------------
let inputName = "";
let Btns = [];
document.querySelector("#title").innerHTML = "Duck Man Game";
Menu();
function Menu() {
  inputName = `<input class="PlayerName" placeholder="Enter Your Name..." type="text" />`;
  Btns = [
    `<button class="btn" onclick="startGame()"><b>Start Game</b></button>`,
    `<button class="btn" onclick="Options()">Options</button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector(".Map").style.opacity = 0.1;
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Menu Game</h1>${inputName}${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Options() {
  Btns = [
    `<button class="btn" onclick="Mute()">Mute</button>`,
    `<button class="btn" onclick="Language()">Language</button>`,
    `<button class="btn" onclick="Menu()">Back</button>`,
  ];
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Options</h1>${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Pause() {
  document.querySelector(".Map").style.opacity = 0.1;
  document.querySelector(".Menu").style.display = "flex";
  Btns = [
    `<button class="btn" onclick="Play()"><b>Play</b></button>`,
    `<button class="btn" onclick="startGame()">New Game</button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Paused</h1>${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Exit() {
  if (confirm("Are you sure?")) window.close();
}
function startGame() {
  trees();
  let val = document.querySelector(".PlayerName").value;
  document.querySelector(".Map").style.opacity = 1;
  document.querySelector(".Menu").style.display = "none";
  document.querySelector("#gameScreen").style.display = "block";
  document.querySelector(".Hud").innerHTML = `
  <div class="Health">Health:</div>
  <div class="Player">Player: ${val}</div>
  <button class="pause" onclick="Pause()" style="font-size:44px"><i class="fa fa-pause"></i></button>
  <div class="Timer">Timer: 00:00</div>
  <div class="Points">Points:</div>`;
  Timer();
}
//----Michael Chemo---------------------------------------------------
let cloudXVal = 0.1,
  nextCloud = 0,
  frmCntChar = 0,
  frmCntObj = 0,
  isChar1 = false;
const cloudsArray = ["cloudImg1", "cloudImg2"];
const largObjArray = [
  "url(./Site_Imgs/Objects/object1-right_leg_up-removebg-preview.png)",
  "url(./Site_Imgs/Objects/object1-left_leg_up-removebg-preview.png)",
];

function updateCloud() {
  document.querySelectorAll(".clouds").forEach((Obj) => {
    increaseObjectProp(Obj, "--right", cloudXVal);
    if (getObjectProp(Obj, "--right") >= 100) Obj.remove();
  });
  if (nextCloud <= 0) {
    create_Cloud();
    nextCloud = random_number(5000, 3000);
  }
  nextCloud -= 10;
}
function create_Cloud() {
  let cloud = document.createElement("div"),
    size = random_number(30, 10),
    height = random_number(20, 30),
    inx = random_number(2, 0);
  cloud.classList.add(`clouds`);
  document.getElementsByClassName("Map")[0].append(cloud);
  setObjectProp(cloud, "--right", size * -1);
  setObjectProp(cloud, "--size", size);
  setObjectProp(cloud, "--height", height);
  setCalss(cloud, cloudsArray[inx]);
}

function WolkCharImg() {
  let char = document.querySelector(".Character");
  if (frmCntChar >= 10) {
    frmCntChar = 0;
    if (!isChar1) {
      char.style.backgroundImage =
        "url(./Site_Imgs/Charecter/duck1-removebg-preview.png)";
      isChar1 = true;
    } else {
      char.style.backgroundImage =
        "url(./Site_Imgs/Charecter/duck2-removebg-preview.png)";
      isChar1 = false;
    }
  } else {
    frmCntChar++;
  }
}

function setCalss(elm, className) {
  elm.classList.add(className);
}

function random_number(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function trees() {
  let treeBG_holder = document.getElementsByClassName("Map")[0];
  treeBG_holder.innerHTML += `<div class="treesBG"></div>`;
}
function localStoragePlayerScore(time, name) {
  let playerStatArry = [];
  if (localStorage.playerStatic)
    playerStatArry = JSON.parse(localStorage.playerStatic);
  let line = { Name: name, Time: time };
  playerStatArry.push(line);
  localStorage.playerStatic = JSON.stringify(playerStatArry);
  return sortToHighScore(playerStatArry);
}
function sortToHighScore(arrayObj) {
  arrayObj.sort((a, b) => {
    let fa = a.Time,
      fb = b.Time;
    if (fa > fb) return -1;

    if (fa < fb) return 1;

    return 0;
  });
  return arrayObj;
}

//----Nati Pinyan--------------------------------------
