let playerLives = 3;
let aiLives = 3;
let playerInventory = [];
let roundCount = 0;

const maxInventorySize = 4;
const messages = document.getElementById('message');
const shootAIButton = document.createElement('button');
const shootSelfButton = document.createElement('button');
const playerLivesSpan = document.getElementById('player-lives');
const aiLivesSpan = document.getElementById('ai-lives');
const playerInventorySpan = document.getElementById('player-inventory');
const bonusList = document.getElementById('bonus-list');

// Бонусы
const bonuses = [
  "Добавить жизнь",
  "Снять жизнь у ИИ",
  "Пропустить ход ИИ",
  "Увеличить инвентарь",
];

// Настройка кнопок
shootAIButton.textContent = "Выстрелить в ИИ";
shootSelfButton.textContent = "Выстрелить в себя";
shootAIButton.classList.add('action-button');
shootSelfButton.classList.add('action-button');
document.getElementById('duel-area').appendChild(shootAIButton);
document.getElementById('duel-area').appendChild(shootSelfButton);

// Обновление интерфейса
function updateUI() {
  playerLivesSpan.textContent = playerLives;
  aiLivesSpan.textContent = aiLives;
  playerInventorySpan.textContent = playerInventory.length;
}

// Проверка окончания игры
function checkGameOver() {
  if (playerLives <= 0 || aiLives <= 0) {
    messages.textContent = playerLives <= 0 ? "Вы проиграли!" : "Вы победили!";
    shootAIButton.disabled = true;
    shootSelfButton.disabled = true;
    return true;
  }
  return false;
}

// Получение бонуса
function grantBonus() {
  if (roundCount % 3 === 0 && roundCount > 0) {
    const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
    if (playerInventory.length < maxInventorySize) {
      playerInventory.push(bonus);
      const listItem = document.createElement('li');
      listItem.textContent = bonus;
      bonusList.appendChild(listItem);
      messages.textContent = `Вы получили бонус: ${bonus}`;
    } else {
      messages.textContent = "Инвентарь полон! Используйте предмет.";
    }
  }
}

// Действие: выстрелить в ИИ
function shootAtAI() {
  if (checkGameOver()) return;

  const bullet = Math.random() > 0.5;
  roundCount++;

  if (bullet) {
    aiLives--;
    messages.textContent = "Вы попали в ИИ!";
  } else {
    messages.textContent = "Патрон оказался пустым!";
  }

  grantBonus();
  updateUI();
  checkGameOver();
}

// Действие: выстрелить в себя
function shootAtSelf() {
  if (checkGameOver()) return;

  const bullet = Math.random() > 0.5;
  roundCount++;

  if (bullet) {
    playerLives--;
    messages.textContent = "Выстрел оказался смертельным!";
  } else {
    messages.textContent = "Патрон пустой! Ваш ход продолжается.";
    return; // Игрок продолжает ход, если патрон пустой
  }

  grantBonus();
  updateUI();
  checkGameOver();
}

// Обработчики событий
shootAIButton.addEventListener('click', shootAtAI);
shootSelfButton.addEventListener('click', shootAtSelf);
updateUI();
