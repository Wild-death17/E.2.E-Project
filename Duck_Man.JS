//----Moshe Cohen---------------------------------------------------
//--Game-Loop---------
let Update = undefined;
function StartStop() {
  if (Update == undefined) {
    Update = setInterval(GameUpdateLoop, 20);
  } else {
    clearInterval(Update);
    Update = undefined;
  }
}
function GameUpdateLoop() {
  Timer();
  updateObject();
  updateCloud();
  if (isJumping) Jump();
  else WolkCharImg();
}
//--jump--------------
const GRAVITY = 0.2;
const JUMP_SPEED = 4;
let Yval;
let isJumping = false;
document.addEventListener("keydown", (e) => {
  if (Update === undefined) return;
  if (e.code === "Space" && !isJumping) {
    Yval = JUMP_SPEED;
    isJumping = true;
    if (isMuted) playSound("./Site_Audio/JumpSound.mp4");
  }
  if (e.shiftKey && !isJumping) {
    Yval = JUMP_SPEED - 1;
    isJumping = true;
    if (isMuted) playSound("./Site_Audio/JumpSound.mp4");
  }
});
function Jump() {
  let duck = document.querySelector(".Character");
  increaseObjectProp(duck, "--bottom", Yval);
  if (getObjectProp(duck, "--bottom") <= 0) {
    setObjectProp(duck, "--bottom", 0);
    isJumping = false;
  }
  Yval -= GRAVITY;
}
//--Objects-----------
const Xval = 0.5;
let NextObject = 500;
function updateObject() {
  document.querySelectorAll(".Object").forEach((Obj) => {
    increaseObjectProp(Obj, "--right", Xval);
    if (getObjectProp(Obj, "--right") < 1100)
      IsDead(document.querySelector(".Character"), Obj);
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
function IsDead(duck, Obj) {
  let DuckBottom = getObjectProp(duck, "bottom");
  let ObjHeight = getObjectProp(Obj, "height");
  let ObjRight = getObjectProp(Obj, "right") + getObjectProp(Obj, "width") - 10;
  let ObjLeft = getObjectProp(Obj, "left") + getObjectProp(Obj, "width") - 10;
  if (DuckBottom < ObjHeight && 1170 < ObjRight && 90 < ObjLeft) {
    GameOver();
  }
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
function Timer() {
  document.querySelector(".Timer").innerText =
    Number(document.querySelector(".Timer").innerText) + 1;
}
//--Audio-------------
function playSound(SoundUrl, Loop = false) {
  let Sound = new Audio(SoundUrl);
  Sound.play();
  Sound.loop = Loop;
}
//----Zion Amar---------------------------------------------------
let inputName = "";
let Btns = [];
let isMuted = "";
function Menu() {
  document.querySelector("#title").innerHTML = "Duck Man Game";
  inputName = `<input class="PlayerName" placeholder="Enter Your Name..."/>`;
  Btns = [
    `<button class="btn" onclick="startGame()"><b>Start Game</b></button>`,
    `<button class="btn" id="isMuted" onclick="Mute()"></button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Menu Game</h1>${inputName}${Btns[0]}${Btns[1]}${Btns[2]}`;
  Mute();
}
function Mute() {
  let txt = "";
  if (!isMuted) {
    txt = ` Mute <i class='fas fa-volume-mute'></i>`;
    isMuted = "true";
  } else {
    txt = ` Unmute <i class="fas fa-volume-up"></i>`;
    isMuted = "";
  }
  document.querySelector("#isMuted").innerHTML = txt;
}
function Pause() {
  StartStop();
  document.querySelector("#grass").classList.remove("grassBGMotion");
  document.querySelector(".treesBG").classList.remove("treesBGMotion");
  Btns = [
    `<button class="btn" onclick="Play()"><b>Resume</b></button>`,
    `<button class="btn" onclick="window.location.reload()">New Game</button>`,
    `<button class="btn" onclick="Exit()">Exit</button>`,
  ];
  document.querySelector("#gameScreen").style.opacity = 0.1;
  document.querySelector(".Menu").style.display = "flex";
  document.querySelector(
    ".Menu"
  ).innerHTML = `<h1>Pause Menu</h1>${Btns[0]}${Btns[1]}${Btns[2]}`;
}
function Play() {
  document.querySelector("#grass").classList.add("grassBGMotion");
  document.querySelector(".treesBG").classList.add("treesBGMotion");
  StartStop();
  document.querySelector("#gameScreen").style.opacity = 1;
  document.querySelector(".Menu").style.display = "none";
}
function Exit() {
  if (confirm("Are you sure?")) window.close();
}
function startGame() {
  PlayerName = document.querySelector(".PlayerName").value;
  if (PlayerName) {
    document.querySelector(".Menu").style.display = "none";
    document.querySelector("#grass").classList.add("grassBGMotion");
    document.querySelector(".treesBG").classList.add("treesBGMotion");
    StartStop();
    document.querySelector(".Hud").innerHTML = `
  <div class="Player">Player: ${PlayerName}</div>
  <button class="pause" onclick="Pause()" style="font-size:44px"><i class="fa fa-pause"></i></button>
  <div class="Timer">0</div>`;
  } else {
    alert("Please enter your name!");
  }
}
function GameOver() {
  StartStop();
  document.querySelector("#title").innerHTML = "";
  document.querySelector("#gameScreen").style.opacity = 0;
  document.querySelector(".Menu").style.display = "flex";
  document.querySelector(
    ".Menu"
  ).innerHTML = `<div class="GameOver">Game Over</div>`;
  setTimeout(function () {
    document.querySelector("#title").innerHTML = "High Score";
    document.querySelector(".Menu").innerHTML = `<div class="Table">
  <table>
  <thead>
  <tr>
      <th>Place</th>
      <th>Name</th>
      <th>Score</th>
  </tr>
  </thead>
  <tbody id="mainTable"></tbody>
</table></div><div><button class="btn" onclick="window.location.reload()" style="width: 150px;">Play Again</button><button class="btn" onclick="Exit()" style="width: 150px;">Exit</button></div>`;
    localStoragePlayerScore(
      document.querySelector(".Timer").innerText,
      PlayerName
    );
  }, 2000);
}
function CreateTble(data) {
  let str = "";
  let position = 0;
  for (let line of data) {
    str += "<tr>";
    str += `<td>${++position}</td>`;
    str += `<td>${line.Name}</td>`;
    str += `<td>${line.Time}</td>`;
    str += "</tr>";
  }
  document.getElementById("mainTable").innerHTML = str;
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
  if (arrayObj.length > 7) {
    arrayObj.splice(7, arrayObj.length - 7);
  }
  localStorage.playerStatic = JSON.stringify(arrayObj);
  CreateTble(arrayObj);
  return arrayObj;
}
//----Nati Pinyan--------------------------------------
