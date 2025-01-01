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
const roll10Btn = document.getElementById("roll-10-btn");
const backBtn = document.getElementById("back-btn");

let counter = 0; // Счётчик круток для гарантии
let currentRolls = []; // Массив для сохранения результатов круток

// Привязываем события
rollBtn.addEventListener("click", startGacha);
roll10Btn.addEventListener("click", start10Rolls);
backBtn.addEventListener("click", backToMenu);

function startGacha() {
  // Скрыть меню
  menu.classList.add("hidden");

  // Показать гача-анимацию
  gachaAnimation.classList.remove("hidden");

  // Остановить музыку из меню
  menuMusic.pause();
  menuMusic.currentTime = 0;

  // Получить музыку для гача
  const { audio } = rollItem();
  gachaMusic.src = audio;
  gachaMusic.play();

  // Анимация экранов
  const screens = document.querySelectorAll(".screen");
  gsap.fromTo(
    screens,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      stagger: 0.5,
      repeat: 6, // Длительность ~3 секунд
      onComplete: revealItem,
    }
  );
}

function start10Rolls() {
  // Скрыть меню
  menu.classList.add("hidden");

  // Показать гача-анимацию
  gachaAnimation.classList.remove("hidden");

  // Остановить музыку из меню
  menuMusic.pause();
  menuMusic.currentTime = 0;

  // Получить музыку для гача
  gachaMusic.src = "assets/gacha.mp3"; // Общая музыка для 10 круток
  gachaMusic.play();

  // Анимация экранов для 10 круток
  const screens = document.querySelectorAll(".screen");
  gsap.fromTo(
    screens,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      stagger: 0.5,
      repeat: 6, // Длительность ~3 секунд
      onComplete: () => {
        currentRolls = [];
        for (let i = 0; i < 10; i++) {
          currentRolls.push(rollItem());
        }
        revealItems(); // Показать предметы после 10 круток
      },
    }
  );
}

function revealItems() {
  itemDisplay.classList.remove("hidden");

  // Отображаем все предметы
  let delay = 0;
  currentRolls.forEach((item, index) => {
    setTimeout(() => {
      itemImage.src = item.img;
      itemDisplay.innerHTML += `<img src="${item.img}" class="item-image">`;
    }, delay);
    delay += 500; // Интервал для появления каждого предмета
  });
}

function rollItem() {
  counter++;
  let random = Math.random() * 100;

  if (counter % 90 === 0) {
    return { img: randomItem(S_ITEMS), audio: "assets/gachaS.mp3" };
  } else if (counter % 10 === 0 || random <= 1.2) {
    return { img: randomItem(A_ITEMS), audio: "assets/gacha.mp3" };
  } else {
    return { img: randomItem(B_ITEMS), audio: "assets/gacha.mp3" };
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
