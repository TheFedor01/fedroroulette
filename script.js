// Constants
const items = {
  B: ["Assets/BItem1.png", "Assets/BItem2.png", "Assets/BItem3.png", "Assets/BItem4.png", "Assets/BItem5.png"],
  A: ["Assets/AItem1.png", "Assets/AItem2.png", "Assets/AItem3.png", "Assets/AItem4.png", "Assets/AItem5.png"],
  S: ["Assets/SItem1.png", "Assets/SItem1.png", "Assets/SItem1.png"]
};

let pulls = 0;
let guaranteeA = 10;
let guaranteeS = 90;

// Elements
const menu = document.getElementById("menu");
const gachaScreen = document.getElementById("gachaScreen");
const resultScreen = document.getElementById("result");
const resultImage = document.getElementById("resultImage");
const aCounter = document.getElementById("aCounter");
const sCounter = document.getElementById("sCounter");
const menuMusic = document.getElementById("menuMusic");
const gachaSound = document.getElementById("gachaSound");
const gachaSSound = document.getElementById("gachaSSound");

// Functions
function randomizePull() {
  pulls++;
  guaranteeA--;
  guaranteeS--;

  if (guaranteeS === 0) {
    return "S";
  } else if (guaranteeA === 0) {
    return "A";
  }

  const chance = Math.random() * 100;
  if (chance <= 0.2) return "S";
  if (chance <= 1.4) return "A";
  return "B";
}

function pullOnce() {
  const rank = randomizePull();
  playAnimation(rank);
}

function playAnimation(rank) {
  menu.classList.add("hidden");
  gachaScreen.classList.remove("hidden");
  const audio = rank === "S" ? gachaSSound : gachaSound;
  audio.play();

  setTimeout(() => {
    resultScreen.classList.remove("hidden");
    resultImage.src = items[rank][Math.floor(Math.random() * items[rank].length)];
    aCounter.textContent = guaranteeA;
    sCounter.textContent = guaranteeS;
  }, 7000);
}

// Event Listeners
document.getElementById("singlePull").addEventListener("click", pullOnce);
document.getElementById("backToMenu").addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  gachaScreen.classList.add("hidden");
  menu.classList.remove("hidden");
});
