const selectAttack = document.getElementById('select-attack')
const btnPet = document.getElementById('btn-pet')

const selectPet = document.getElementById('select-pet')


const spanmokenPlayer = document.getElementById('player-pet')

const spanmokenEnemy = document.getElementById('enemys-pet')
const btnReset = document.getElementById('btn-reset')
const spanLivesPlayer = document.getElementById('lives-player')
const spanLivsEnemy = document.getElementById('lives-enemys')
const conteinerCards = document.getElementById('conteiner-cards')
const conteinerAttacks = document.getElementById('conteiner-attacks')
const sectionViewMap = document.getElementById('view-map')
const map = document.getElementById('map')


const message = document.getElementById('result')

let lienzo = map.getContext('2d')


let attackPlayer
let attackEnemys = []
let mokeponOptions
let mokepon1
let mokepon2
let mokepon3
let btnFire
let btnWater
let btnEarth
let buttons = []

let indexAttackPlayer
let indexAttackEnemy
let playerPet
let playerAttack = []
let enemysAttacks = []

let attackMokepon

let playerWins = 0
let enemyWins = 0
let playerLives = 3
let EnemyLives = 3

let mokepones = []

let mapBackground = new Image()
mapBackground.src = 'assets/img/mokemap.png'

let maxWidth = 800;
let minWidth = 300;
let weightScreen = Math.max(minWidth, Math.min(window.innerWidth - 20, maxWidth));
let searchHeight = weightScreen * 600 / 800;

map.width = weightScreen;
map.height = searchHeight;


// Clase Mokepon modificada
class Mokepon {
    constructor(name, image, lives, mapImage) {
        this.name = name;
        this.image = image;
        this.lives = lives;
        this.attack = [];
        this.width = 40;
        this.height = 40;
        this.x = randomMokepon(0, map.width - this.width);
        this.y = randomMokepon(0, map.height - this.height);
        this.mapImage = new Image();
        this.mapImage.src = mapImage;
        this.speedX = 0;
        this.speedY = 0;
    }

    drawMokepon() {
        lienzo.drawImage(
            this.mapImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let zancudo = new Mokepon('zancudo', 'assets/img/leeff.png', 3, 'assets/img/capipepo.png')
let perrozompopo = new Mokepon('perrozompopo', 'assets/img/waterr.png', 3, 'assets/img/hipodoge.png')
let zanate = new Mokepon('zanate', 'assets/img/firee.png', 3, 'assets/img/ratigueya.png')

let zancudoEnemy = new Mokepon('zancudo', 'assets/img/leeff.png', 3, 'assets/img/capipepo.png')
let perrozompopoEnemy = new Mokepon('perrozompopo', 'assets/img/waterr.png', 3, 'assets/img/hipodoge.png')
let zanateEnemy = new Mokepon('zanate', 'assets/img/firee.png', 3, 'assets/img/ratigueya.png')
mokepones.push(zancudo, perrozompopo, zanate)
const enemies = [zancudoEnemy, perrozompopoEnemy, zanateEnemy];

zanate.attack.push(
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '💧', id: 'btn-water' },
    { name: '🌿', id: 'btn-leef' }
)

perrozompopo.attack.push(
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🌿', id: 'btn-leef' }
)

zancudo.attack.push(
    { name: '🌿', id: 'btn-leef' },
    { name: '🌿', id: 'btn-leef' },
    { name: '🌿', id: 'btn-leef' },
    { name: '🔥', id: 'btn-fire' },
    { name: '💧', id: 'btn-water' },

)

function initGame() {
    selectAttack.style.display = 'none'
    sectionViewMap.style.display = 'none'

    mokepones.forEach((mokepon) => {

        mokeponOptions = `
        <input type="radio" name="mascota" id=${mokepon.name}>
            <label class="card-pet" for="${mokepon.name}">
                <p>${mokepon.name}</p>
                <img src="${mokepon.image}" alt="${mokepon.name}">
            </label>
        `
        conteinerCards.innerHTML += mokeponOptions

        mokepon1 = document.getElementById('zancudo')
        mokepon2 = document.getElementById('perrozompopo')
        mokepon3 = document.getElementById('zanate')


    })
    btnPet.addEventListener('click', selectMokepon)

    btnReset.addEventListener('click', resetGame)

   joinGame();

}

function joinGame(){
    fetch("http://localhost:8080/join")
    .then(function (res){
      
        if(res.ok){
            res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                    })
        }
    })
}

function selectMokepon() {
    selectPet.style.display = 'none'

    sectionViewMap.style.display = 'flex'

    if (mokepon1.checked) {
        spanmokenPlayer.innerHTML = mokepon1.id
        playerPet = mokepon1.id
    }
    else if (mokepon2.checked) {
        spanmokenPlayer.innerHTML = mokepon2.id
        playerPet = mokepon2.id
    }
    else if (mokepon3.checked) {
        spanmokenPlayer.innerHTML = mokepon3.id
        playerPet = mokepon3.id
    } else {
        alert('You must select a mokepon')
    }
    // Asignar el mokepon seleccionado a la variable global
    selectedMokepon = mokepones.find(m => m.name === playerPet)
    // Dibuja el mokepon seleccionado en el mapa
    lienzo.clearRect(0, 0, map.width, map.height)
    drawBackground();
    drawEnemies();  // Dibuja todos los enemigos
    drawCharacter(selectedMokepon); // Dibuja jugador encima



    findAttacksByPet(playerPet)

}


function findAttacksByPet(playerPet) {
    let attacks
    for (let i = 0; i < mokepones.length; i++) {
        if (mokepones[i].name === playerPet) {
            attacks = mokepones[i].attack
        }
    }

    renderAttacksButtons(attacks)


}

function renderAttacksButtons(attacks) {

    attacks.forEach((attack) => {

        attackMokepon = ` 
             <button id=${attack.id} class="BAttack" > ${attack.name} </button>
        `
        conteinerAttacks.innerHTML += attackMokepon
    })

    btnFire = document.getElementById('btn-fire')
    btnWater = document.getElementById('btn-water')
    btnEarth = document.getElementById('btn-leef')

    buttons = document.querySelectorAll('.BAttack')





}

function frecuencyAttack() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {

            if (e.target.textContent.trim() === '🔥') {
                playerAttack.push('fire')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else if (e.target.textContent.trim() === '💧') {
                playerAttack.push('water')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else if (e.target.textContent.trim() === '🌿') {
                playerAttack.push('leef')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else {
                playerAttack.push('earth')
                console.log(playerAttack)
                button.style.background = '#112f58'
            }
            attackEnemy()
        })
    })

}

function selectEnemysPet() {

    let random = randomMokepon(0, mokepones.length - 1)

    spanmokenEnemy.innerHTML = mokepones[random].name
    enemysAttacks = mokepones[random].attack
    frecuencyAttack()
}



function attackEnemy() {

    let randomAttack = randomMokepon(0, enemysAttacks.length - 1)
    if (randomAttack == 0 || randomAttack == 1) {
        attackEnemys.push('fire')
    } else if (randomAttack == 3 || randomAttack == 4) {
        attackEnemys.push('water')
    } else {
        attackEnemys.push('leef')
    }

    console.log(attackEnemys)

    initFight()
}

function initFight() {
    if (attackEnemys.length == 5) {
        combat()

    }

}

function indexBothEnemys(player, enemy) {
    indexAttackPlayer = playerAttack[player]
    indexAttackEnemy = attackEnemys[enemy]
}

function combat() {
    for (let i = 0; i < playerAttack.length; i++) {
        indexBothEnemys(i, i)
        if (playerAttack[i] === attackEnemys[i]) {
            createMessage('TIE')
        } else if (playerAttack[i] === 'fire' && attackEnemys[i] === 'leef') {
            createMessage('WON')
            playerWins++
            spanLivesPlayer.innerHTML = playerWins
        } else if (playerAttack[i] === 'water' && attackEnemys[i] === 'fire') {
            createMessage('WON')
            playerWins++
            spanLivesPlayer.innerHTML = playerWins
        } else if (playerAttack[i] === 'leef' && attackEnemys[i] === 'water') {
            createMessage('WON')
            playerWins++
            spanLivesPlayer.innerHTML = playerWins
        } else {
            createMessage('LOST')
            enemyWins++
            spanLivsEnemy.innerHTML = enemyWins
        }
    }
    checkLives()
}

function checkLives() {

    if (playerWins === enemyWins) {
        alert('It is a tie')


    } else if (playerWins > enemyWins) {
        alert('You win')

    } else {
        alert('You lost')
    }
}




function resetGame() {
    location.reload()
}



function createMessage(result) {

    let paragraph = document.createElement('p')
    paragraph.innerHTML = `Your attack is ${indexAttackPlayer} and the enemy attack is ${indexAttackEnemy} + ${result}`
    message.appendChild(paragraph)

}


function randomMokepon(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 2. Nueva función para dibujar solo el fondo

function drawBackground() {
    lienzo.drawImage(mapBackground, 0, 0, map.width, map.height);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        drawCharacter(enemy);
    });
}

function drawCharacter(mokepon) {
    lienzo.drawImage(mokepon.mapImage, mokepon.x, mokepon.y, mokepon.width, mokepon.height);
}
let intervalMovimiento;

function startGameLoop() {
    clearInterval(intervalMovimiento);
    intervalMovimiento = setInterval(updatePosition, 30);
}

function updatePosition() {
    if (!selectedMokepon) return;

    // Actualizar posición
    selectedMokepon.x += selectedMokepon.speedX;
    selectedMokepon.y += selectedMokepon.speedY;

    // Limitar al jugador dentro del mapa
    if (selectedMokepon.x < 0) selectedMokepon.x = 0;
    if (selectedMokepon.y < 0) selectedMokepon.y = 0;
    if (selectedMokepon.x + selectedMokepon.width > map.width)
        selectedMokepon.x = map.width - selectedMokepon.width;
    if (selectedMokepon.y + selectedMokepon.height > map.height)
        selectedMokepon.y = map.height - selectedMokepon.height;

    // Dibujar toda la escena nuevamente
    drawScene();
}

// Función para dibujar toda la escena
function drawScene() {
    lienzo.clearRect(0, 0, map.width, map.height);
    drawBackground();
    drawEnemies();
    drawCharacter(selectedMokepon);
    if (selectedMokepon.x && selectedMokepon.y) {
        checkCollision(zancudoEnemy);
        checkCollision(zanateEnemy);
        checkCollision(perrozompopoEnemy);
    }
}

function moveUp() {
    if (!selectedMokepon) return;
    selectedMokepon.speedY = -5;
    startGameLoop();
}
function moveDown() {
    if (!selectedMokepon) return;
    selectedMokepon.speedY = 5;
    startGameLoop();
}
function moveLeft() {
    if (!selectedMokepon) return;
    selectedMokepon.speedX = -5;
    startGameLoop();
}
function moveRight() {
    if (!selectedMokepon) return;
    selectedMokepon.speedX = 5;
    startGameLoop();
}
function stopMoveY() {
    if (!selectedMokepon) return;
    selectedMokepon.speedY = 0;
    if (selectedMokepon.speedX === 0 && selectedMokepon.speedY === 0) {
        clearInterval(intervalMovimiento);
    }
}
function stopMoveX() {
    if (!selectedMokepon) return;
    selectedMokepon.speedX = 0;
    if (selectedMokepon.speedX === 0 && selectedMokepon.speedY === 0) {
        clearInterval(intervalMovimiento);
    }
}

function checkCollision(enemy) {
    const upEnemy = enemy.y;
    const downEnemy = enemy.y + enemy.height;
    const leftEnemy = enemy.x;
    const rightEnemy = enemy.x + enemy.width;

    const upPet = selectedMokepon.y;
    const downPet = selectedMokepon.y + selectedMokepon.height;
    const leftPet = selectedMokepon.x;
    const rightPet = selectedMokepon.x + selectedMokepon.width;

    if (
        downPet < upEnemy ||
        upPet > downEnemy ||
        rightPet < leftEnemy ||
        leftPet > rightEnemy
    ) {
        return
    }

    stopMoveX();
    stopMoveY();
    clearInterval(intervalMovimiento);
    console.log("There are collisions");
    console.log('There are collisions' + ' with ' + enemy.name);
    selectAttack.style.display = 'flex';
    sectionViewMap.style.display = 'none';
    selectEnemysPet(enemy);

}


window.addEventListener('load', initGame)
window.addEventListener('keydown', (e) => {
    if (!selectedMokepon) return;
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveUp();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveDown();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moveLeft();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveRight();
            break;
    }
});
window.addEventListener('keyup', (e) => {
    if (!selectedMokepon) return;
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'w':
        case 'W':
        case 's':
        case 'S':
            stopMoveY();
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'a':
        case 'A':
        case 'd':
        case 'D':
            stopMoveX();
            break;
    }
});
