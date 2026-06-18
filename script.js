const playerDataBase= {

    easy: [
        {player:'Cristiano Ronaldo', img: 'easy-CR7.jpeg'},
        {player: 'Dybala', img: 'easy-debala.jpeg'},
        {player: 'Di Maria', img: 'easy-dimaria.jpg'},
        {player: 'Ferminyo', img: 'easy-ferminio.jpeg'},
        {player: 'Gavi', img: 'easy-gavi.jpeg'},
        {player: 'Griezzman', img: 'easy-griezzman.jpeg'},
        {player: 'Haland', img: 'easy-haland.jpeg'},
        {player: 'Ineasta', img: 'easy-ineasta.jpg'},
        {player: 'Isco', img: 'easy-isco.jpeg'},
        {player: 'Mbappe', img: 'easy-mbappe.jpeg'},
        {player: 'Messi', img: 'easy-messi.jpeg'},
        {player: 'Modric', img: 'easy-modric.jpeg'},
        {player: 'Neymar', img: 'easy-neymar.jpeg'},
        {player: 'Pedri', img: 'easy-pedri.jpeg'},
        {player: 'Pele', img: 'easy-pele.jpg'},
        {player: 'Pique', img: 'easy-peque.jpg'},
        {player: 'Ramous', img: 'easy-ramous.jpg'},
        {player: 'Ronaldinho', img: 'easy-ronaldinho.jpeg'},
        {player: 'Suariz', img: 'easy-suariz.jpeg'},
        {player: 'Van Dijk', img: 'easy-van.jpeg'},
    ],
    med: [
        {player: 'Alexis Maclister', img: 'med-alexis maclestir.jpg'},
        {player: 'Marco Assensio', img: 'med-assensio.jpeg'},
        {player: 'Benzima', img: 'med-benzema.jpg'},
        {player: 'Bokayo Saka', img: 'med-bokayo saka.jpg'},
        {player: 'Yassin Buno', img: 'med-buno.jpg'},
        {player: 'Coutinho', img: 'med-coutinho.jpeg'},
        {player: 'Cruijf', img: 'med-cruijf.gif'},
        {player: 'David De Gea', img: 'med-david de gea.jpeg'},
        {player: 'Debruini', img: 'med-debrouni.jpg'},
        {player: 'Donaruma', img: 'med-donaroma.jpg'},
        {player: 'Gouardyola', img: 'med-gaurdyola.jpg'},
        {player: 'Ashraf Hakimi', img: 'med-hakimi.jpg'},
        {player: 'Harry Kane', img: 'med-harry kane.jpg'},
        {player: 'Jordi Alba', img: 'med-jordi alba.jpeg'},
        {player: 'Marco cucurella', img: 'med-marc cucurella.jpeg'},
        {player: 'Marquineous', img: 'med-marquineous.jpg'},
        {player: 'Rafael Lyao', img: 'med-rafael liao.jpg'},
        {player: 'Ronaldo', img: 'med-ronaldo.jpg'},
        {player: 'Son Heung Min', img: 'med-son heung min.jpg'},
        {player: 'Terri Henry', img: 'med-terri henry.jpg'}
    ],
    hard: [
        {player: 'Alexis Sanchez', img: 'hard-alexis sanchez.jpg'},
        {player: 'Canavaro', img: 'hard-canavar.jpg'},
        {player: 'Alvarez', img: 'hard-alvarez.png'},
        {player: 'Ashley Cole', img: 'hard-ashley cole.jpg'},
        {player: 'Carlos Beyoul', img: 'hard-carlos beyoul.jpg'},
        {player: 'Debaul', img: 'hard-debaul.jpg'},
        {player: 'Enzo Fernandez', img: 'hard-enzo fernandez.jpg'},
        {player: 'George Best', img: 'hard-george best.jpg'},
        {player: 'Gerd Muller', img: 'hard-gerd muller.jpg'},
        {player: 'Grealish', img: 'hard-grealish.jpg'},
        {player: 'Hakim Zeyash', img: 'hard-hakim zeyash.jpg'},
        {player: 'Javi Puado', img: 'hard-Javi Puado.jpeg'},
        {player: 'Leanardo Paredes', img: 'hard-leandro paredes.jpg'},
        {player: 'Lucas Paqueta', img: 'hard-lucas paqueta.jpg'},
        {player: 'Mario Balotelli', img: 'hard-mario balotelli.jpg'},
        {player: 'Michael Owen', img: 'hard-michael owen.jpg'},
        {player: 'Roberto Bageo', img: 'hard-robert bageo.jpg'},
        {player: 'Sabastien Haller', img: 'hard-sebastien haller.jpg'},
        {player: 'Thiag Alcantara', img: 'hard-thiago alcantara.jpeg'},
        {player: 'Thiago Silva', img: 'hard-thiago silva.jpg'}
    ]

}

let currentLevel='';
let currentPool= [];
let score= 0;
let currentPlayer= null;

window.onload = updateHighScoreDisplay;

function showScreen(screenId){
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showMenu(){
    updateHighScoreDisplay();
    showScreen('menu');
}

function startGame(level){
    currentLevel= level;
    score= 0;
    currentPool= [...playerDataBase[level]];
    currentPool.sort(() => Math.random() -0.5 );

    if (currentPool.length > 20) {
        currentPool = currentPool.slice(0,20);
    }

    document.getElementById('current-score').innerText = score;
    showScreen('game-screen');
    nextTurn();
}

function nextTurn(){
    if (currentPool.length === 0) {
        endGame(true);
        return;
    }
    currentPlayer = currentPool.pop();
    document.getElementById('footballer-img').src = currentPlayer.img;

    generateOptions();
}

function generateOptions(){
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    let choices = [currentPlayer.player];
    let allLevelPlayers = [...playerDataBase[currentLevel]];
    allLevelPlayers.sort(() => Math.random() - 0.5);

    for( let i = 0; i < allLevelPlayers.length; i++) {
        if (allLevelPlayers[i].player !== currentPlayer.player && choices.length < 4) {
            choices.push(allLevelPlayers[i].player);
        }
    }

    choices.sort(() => Math.random() - 0.5 );

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(choice, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedPlayer, clickedButton){
    if (selectedPlayer === currentPlayer.player){
        score ++ ;
        document.getElementById('current-score').innerText = score;
        clickedButton.classList.add('correct');
        setTimeout(() => {
            nextTurn();
        }, 500);
    } else {
        clickedButton.classList.add('wrong');
        setTimeout(() => {
            endGame(false);
        }, 500);
    }
}

function endGame(win) {
    showScreen('game-over');

    const title = document.getElementById('game-over-title');
    if (win) {
        title.innerText = 'You won! Perfect Score';
        title.style.color = 'green';
    } else{
        title.innerText = 'Game Over';
        title.style.color = 'red';
    }

    document.getElementById('final-high-score').innerText = score;

    document.getElementById('final-score').innerText = score;
    const storageKey = `highScore_${currentLevel}`;
    let highScore = localStorage.getItem(storageKey) || 0;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem(storageKey, highScore);
    }

    document.getElementById('final-high-score').innerText = highScore;
}

function updateHighScoreDisplay() {
    document.getElementById('hs-easy').innerText = localStorage.getItem('highScore_easy') || 0;
    document.getElementById('hs-med').innerText = localStorage.getItem('highScore_med') || 0;
    document.getElementById('hs-hard').innerText = localStorage.getItem('highScore_hard') || 0;
}
