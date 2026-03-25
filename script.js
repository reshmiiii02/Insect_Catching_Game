let selectedInsect = ''; 
let difficulty = ''; 
let score = 0; 
let insectCount = 0; 
let maxInsects = 5; 
let spawnInterval; 

function showLevels() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('difficultySelection').classList.remove('hidden');
}

function setDifficulty(level) {
    difficulty = level;
    document.getElementById('difficultySelection').classList.add('hidden');
    document.getElementById('insectSelection').classList.remove('hidden');
}

function selectInsect(insectName) {
    selectedInsect = insectName;
    document.getElementById('selectedInsectImage').src = `${insectName}.jpg`;
    document.getElementById('insectSelection').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    startGame();
}

function startGame() {
    score = 0;
    insectCount = 0;
    document.getElementById('score').textContent = score;

    const spawnRates = { low: 2000, medium: 1000, high: 500 };
    const spawnRate = spawnRates[difficulty];

    spawnInterval = setInterval(spawnInsect, spawnRate);
}

function spawnInsect() {
    if (insectCount >= maxInsects) {
        endGame();
        return;
    }

    const insectContainer = document.getElementById('insects');
    const insect = document.createElement('img');
    insect.src = `${selectedInsect}.jpg`;
    insect.classList.add('insect'); 

    insect.style.top = `${Math.random() * 90}%`;
    insect.style.left = `${Math.random() * 90}%`;

    insect.addEventListener('click', () => {
        if (insectCount < maxInsects) { 
            insect.remove();
            insectCount--;
            score++;
            document.getElementById('score').textContent = score;
        }
    });

    insectContainer.appendChild(insect);
    insectCount++;
}

function endGame() {
    clearInterval(spawnInterval);
    document.getElementById('gameOver').classList.remove('hidden');
    document.getElementById('insects').removeEventListener('click', spawnInsect);
}
function restartGame() {
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('insects').innerHTML = '';
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
}
