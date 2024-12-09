let playerLives = 3;
let aiLives = 3;
let playerInventory = [];

const maxInventorySize = 4;
const messages = document.getElementById('message');
const playRoundButton = document.getElementById('play-round');
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

// Обновление интерфейса
function updateUI() {
  playerLivesSpan.textContent = playerLives;
  aiLivesSpan.textContent = aiLives;
  playerInventorySpan.textContent = playerInventory.length;
}

// Игровая логика
function playRound() {
  if (playerLives <= 0 || aiLives <= 0) {
    messages.textContent = playerLives <= 0 ? "Вы проиграли!" : "Вы победили!";
    playRoundButton.disabled = true;
    return;
  }

  const playerShot = Math.random() > 0.5;
  const aiShot = Math.random() > 0.5;

  if (playerShot) aiLives--;
  if (aiShot) playerLives--;

  // Получение бонуса
  if (aiLives > 0 && playerLives > 0) {
    const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
    if (playerInventory.length < maxInventorySize) {
      playerInventory.push(bonus);
      const listItem = document.createElement('li');
      listItem.textContent = bonus;
      bonusList.appendChild(listItem);
    } else {
      messages.textContent = "Инвентарь полон! Используйте предмет.";
    }
  }

  // Обновление UI
  updateUI();
  if (playerLives <= 0 || aiLives <= 0) {
    messages.textContent = playerLives <= 0 ? "Вы проиграли!" : "Вы победили!";
    playRoundButton.disabled = true;
  }
}

// Событие
playRoundButton.addEventListener('click', playRound);
updateUI();
