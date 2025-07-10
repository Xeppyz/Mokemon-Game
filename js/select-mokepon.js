const selectAttack = document.getElementById('select-attack')
const btnPet = document.getElementById('btn-pet')
const btnFire = document.getElementById('btn-fire')
const btnReset = document.getElementById('btn-reset')
const btnWater = document.getElementById('btn-water')
const btnEarth = document.getElementById('btn-leef')

const selectPet = document.getElementById('select-pet')

const mokepon1 = document.getElementById('zancudo')
const mokepon2 = document.getElementById('perrozompopo')
const mokepon3 = document.getElementById('zanate')

const spanmokenPlayer = document.getElementById('player-pet')

const spanmokenEnemy = document.getElementById('enemys-pet')

const spanLivesPlayer = document.getElementById('lives-player')
const spanLivsEnemy = document.getElementById('lives-enemys')

const message = document.getElementById('result')


let attackPlayer
let attackEnemys

let playerLives = 3
let EnemyLives = 3


class Mokepon{
    constructor(name, image, lives) {
        this.name = name
        this.image = image
        this.lives = lives
    }
}
let zancudo = new Mokepon('Zancudo', './assets/img/firee.png', 3)
let perrozompopo = new Mokepon('Perrozompopo', './assets/img/perrozompopo.png', 3)
let zanate = new Mokepon('Zanate', './assets/img/zanate.png', 3)
console.log(zancudo, perrozompopo, zanate)

function initGame() { 
    selectAttack.style.display = 'none'
    btnPet.addEventListener('click', selectMokepon) 
    btnFire.addEventListener('click', attackFire)  
    btnWater.addEventListener('click', attackWater)  
    btnEarth.addEventListener('click', attackLeef )   
    btnReset.addEventListener('click', resetGame)

}


function selectMokepon() {

    selectPet.style.display = 'none'
    selectAttack.style.display = 'block'
    if(mokepon1.checked) {
        spanmokenPlayer.innerHTML = 'Zancudo'
    }
    else if(mokepon2.checked) {
        spanmokenPlayer.innerHTML = 'Perrozompopo'
    }
    else if(mokepon3.checked) {
       spanmokenPlayer.innerHTML = 'Zanate'
    }else {
        alert('You must select a mokepon')
    }
    selectEnemysPet()
}

 function selectEnemysPet()   {
    
    let random = randomMokepon(1, 5)

    if(random === 1) {
        spanmokenEnemy.innerHTML = 'Zancudo'
        mokepon1.checked = true
    }
    else if(random === 2) {
        spanmokenEnemy.innerHTML = 'Perrozompopo'
        mokepon2.checked = true
    }
    else if(random === 3) {
        spanmokenEnemy.innerHTML = 'Zanate'
        mokepon3.checked = true
    }
    else if(random === 4) {
        spanmokenEnemy.innerHTML = 'Chupacabra'
        mokepon4.checked = true
    }
    else if(random === 5) {
        spanmokenEnemy.innerHTML = 'Llorona'
        mokepon5.checked = true
    }
    else {
        alert('Error')
    }
 }

 
function attackFire() {
    attackPlayer = 'fire'
    attackEnemy()

}

function attackWater() {
    attackPlayer = 'water'
    attackEnemy()

}

function attackLeef() {
    attackPlayer = 'leef'
    attackEnemy()


}

function attackEnemy() {
    let randomAttack = randomMokepon(1, 3)
    if(randomAttack === 1) {
        attackEnemys = 'fire'
    }   else if(randomAttack === 2) {
        attackEnemys = 'water'
    }   else if(randomAttack === 3) {
        attackEnemys = 'leef'
    }   else {
        alert('Error')
    }

    combat()
}


function combat() { 
        if(attackEnemys == attackPlayer) {
            createMessage('TIE')

        }else if(attackPlayer == 'fire' && attackEnemys == 'leef') {
            createMessage('WON')
            EnemyLives--
            spanLivsEnemy.innerHTML = EnemyLives

        }else if(attackPlayer == 'water' && attackEnemys == 'fire') {
            createMessage('WON')
            EnemyLives--
            spanLivsEnemy.innerHTML = EnemyLives
        }else if(attackPlayer == 'earth' && attackEnemys == 'water') {
            createMessage('WON')
            EnemyLives--
            spanLivsEnemy.innerHTML = EnemyLives
        }else{
            createMessage('LOST')
            playerLives--
            spanLivesPlayer.innerHTML = playerLives
        
        }

        checkLives()
    
}

function checkLives(){

    if(playerLives == 0){
    
        alert('You lost')
        disableButtons()
           
       
    }else if(EnemyLives == 0){
        alert('You win')
        disableButtons()
         
    }
}




function disableButtons() {
    let btnFire = document.getElementById('btn-fire')
    btnFire.disabled = true  
    let btnWater = document.getElementById('btn-water')
    btnWater.disabled = true 
    let btnEarth = document.getElementById('btn-leef')
    btnEarth.disabled = true 

   

}

function resetGame() {
     location.reload()
}



function createMessage(result) {
    
    let paragraph = document.createElement ('p')
    paragraph.innerHTML = `Your attack is ${attackPlayer} and the enemy attack is ${attackEnemys} + ${result}`
    message.appendChild(paragraph)
   
}



function randomMokepon(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', initGame)
