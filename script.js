// Гаранты и пул предметов
let aGuarantee = 10;
let sGuarantee = 90;

const bItems = ["assets/BItem1.png", "assets/BItem2.png", "assets/BItem3.png", "assets/BItem4.png", "assets/BItem5.png"];
const aItems = ["assets/AItem1.png", "assets/AItem2.png", "assets/AItem3.png", "assets/AItem4.png", "assets/AItem5.png"];
const sItems = ["assets/SItem1.png", "assets/SItem1.png", "assets/SItem1.png"];

// Элементы DOM
const menuMusic = document.getElementById('menuMusic');
const rollOnceBtn = document.getElementById('rollOnce');
const rollTenBtn = document.getElementById('rollTen');
const backToMenuBtn = document.getElementById('backToMenu');

const rollScreen = document.getElementById('rollScreen');
const result = document.getElementById('result');
const resultImage = document.getElementById('resultImage');

const aGuaranteeSpan = document.getElementById('aGuarantee');
const sGuaranteeSpan = document.getElementById('sGuarantee');

// Генерация предмета
function rollItem() {
    let roll = Math.random() * 100;
    if (sGuarantee === 1 || roll <= 0.2) {
        sGuarantee = 90;
        aGuarantee--;
        return { rank: 'S', item: getRandom(sItems), music: "assets/gachaS.mp3" };
    } else if (aGuarantee === 1 || roll <= 1.4) {
        sGuarantee--;
        aGuarantee = 10;
        return { rank: 'A', item: getRandom(aItems), music: "assets/gacha.mp3" };
    } else {
        sGuarantee--;
        aGuarantee--;
        return { rank: 'B', item: getRandom(bItems), music: "assets/gacha.mp3" };
    }
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Обновление информации о гарантах
function updateGuarantees() {
    aGuaranteeSpan.textContent = aGuarantee;
    sGuaranteeSpan.textContent = sGuarantee;
}

// Показываем экран крутки
function showRollScreen(itemData) {
    menuMusic.pause();
    rollScreen.classList.remove('hidden');

    setTimeout(() => {
        resultImage.src = itemData.item;
        result.classList.remove('hidden');
        const audio = new Audio(itemData.music);
        audio.play();
    }, 7000); // 7 секунд для анимации
}

// Возвращаемся в меню
function resetToMenu() {
    result.classList.add('hidden');
    rollScreen.classList.add('hidden');
    menuMusic.play();
}

// Обработчики событий
rollOnceBtn.addEventListener('click', () => {
    const item = rollItem();
    updateGuarantees();
    showRollScreen(item);
});

rollTenBtn.addEventListener('click', () => {
    let items = [];
    for (let i = 0; i < 10; i++) {
        items.push(rollItem());
    }
    updateGuarantees();
    showRollScreen(items[0]); // Показываем первый предмет
});

backToMenuBtn.addEventListener('click', resetToMenu);

// Инициализация
updateGuarantees();
