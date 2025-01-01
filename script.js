const B_ITEMS = ["assets/BItem1.png", "assets/BItem2.png", "assets/BItem3.png", "assets/BItem4.png", "assets/BItem5.png"];
const A_ITEMS = ["assets/AItem1.png", "assets/AItem2.png", "assets/AItem3.png", "assets/AItem4.png", "assets/AItem5.png"];
const S_ITEMS = ["assets/SItem1.png", "assets/SItem1.png", "assets/SItem1.png", "assets/SItem1.png", "assets/SItem1.png"];

const menu = document.getElementById("menu");
const gachaAnimation = document.getElementById("gacha-animation");
const itemDisplay = document.querySelector(".item-display");
const itemImage = document.getElementById("item-image");

const menuMusic = document.getElementById("menu-music");
const gachaMusic = document.getElementById("gacha-music");
const rollBtn = document.getElementById("roll-btn");
const backBtn = document.getElementById("back-btn");

const screens = document.querySelectorAll(".screen");

let counter = 0; // Счётчик круток для гарантии

// Привязываем события
rollBtn.addEventListener("click", startGacha);
backBtn.addEventListener("click", backToMenu);

function startGacha() {
  // Скрыть меню
  menu.classList.add("hidden");

  // Показать экран гачи
  gachaAnimation.classList.remove("hidden");

  // Остановить музыку меню
  menuMusic.pause();
  menuMusic.currentTime = 0;

  // Получить результат гачи
  const { img, audio, color } = rollItem();

  // Установить музыку
  gachaMusic.src = audio;
  gachaMusic.play();

  // Анимация экранов с изменением цвета
  gsap.fromTo(
    screens,
    { backgroundColor: "#333", opacity: 0 },
    {
      backgroundColor: color, // Цвет определяется на основе ранга
      opacity: 1,
      duration: 0.5,
      stagger: 0.5,
      repeat: 6,
      onComplete: () => revealItem(img),
    }
  );
}

function revealItem(img) {
  itemDisplay.classList.remove("hidden");

  // Показать предмет
  itemImage.src = img;
}

function rollItem() {
  counter++;
  let random = Math.random() * 100;

  if (counter % 90 === 0) {
    return { img: randomItem(S_ITEMS), audio: "assets/gachaS.mp3", color: "#FFD700" }; // Желтый
  } else if (counter % 10 === 0 || random <= 1.2) {
    return { img: randomItem(A_ITEMS), audio: "assets/gacha.mp3", color: "#8A2BE2" }; // Фиолетовый
  } else {
    return { img: randomItem(B_ITEMS), audio: "assets/gacha.mp3", color: "#1E90FF" }; // Синий
  }
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function backToMenu() {
  // Скрыть гача-анимацию и вернуть меню
  itemDisplay.classList.add("hidden");
  gachaAnimation.classList.add("hidden");
  menu.classList.remove("hidden");

  // Остановить гача-музыку
  gachaMusic.pause();
  gachaMusic.currentTime = 0;

  // Включить музыку меню
  menuMusic.play();
}
