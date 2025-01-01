const B_ITEMS = ["assets/BItem1.png", "assets/BItem2.png", "assets/BItem3.png", "assets/BItem4.png", "assets/BItem5.png"];
const A_ITEMS = ["assets/AItem1.png", "assets/AItem2.png", "assets/AItem3.png", "assets/AItem4.png", "assets/AItem5.png"];
const S_ITEMS = ["assets/SItem1.png", "assets/SItem1.png", "assets/SItem1.png", "assets/SItem1.png", "assets/SItem1.png"];

const menu = document.getElementById("menu");
const gachaAnimation = document.getElementById("gacha-animation");
const itemDisplay = document.querySelector(".item-display");
const itemImage = document.getElementById("item-image");
const gachaMusic = document.getElementById("gacha-music");
const rollBtn = document.getElementById("roll-btn");
const backBtn = document.getElementById("back-btn");

let counter = 0;

rollBtn.addEventListener("click", startGacha);
backBtn.addEventListener("click", backToMenu);

function startGacha() {
  menu.classList.add("hidden");
  gachaAnimation.classList.remove("hidden");

  gsap.fromTo(".screen", { opacity: 0 }, { opacity: 1, duration: 7, onComplete: revealItem });
}

function revealItem() {
  itemDisplay.classList.remove("hidden");

  const item = rollItem();
  itemImage.src = item.img;
  gachaMusic.src = item.audio;
  gachaMusic.play();
}

function rollItem() {
  counter++;
  let random = Math.random() * 100;

  if (counter % 90 === 0) {
    return { img: randomItem(S_ITEMS), audio: "assets/gachaS.mp3" };
  } else if (counter % 10 === 0 || random <= 1.2) {
    return { img: randomItem(A_ITEMS), audio: "assets/gacha.mp3" };
  } else if (random <= 98) {
    return { img: randomItem(B_ITEMS), audio: "assets/gacha.mp3" };
  }
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function backToMenu() {
  itemDisplay.classList.add("hidden");
  gachaAnimation.classList.add("hidden");
  menu.classList.remove("hidden");
}
