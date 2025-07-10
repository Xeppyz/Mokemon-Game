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


const message = document.getElementById('result')


let attackPlayer
let attackEnemys
let mokeponOptions
let mokepon1 
let mokepon2 
let mokepon3 
let btnFire 
let btnWater 
let btnEarth 

let playerPet

let attackMokepon

let playerLives = 3
let EnemyLives = 3

let mokepones = []


class Mokepon{
    constructor(name, image, lives) {
        this.name = name
        this.image = image
        this.lives = lives
        this.attack = []
    }
}
let zancudo = new Mokepon('zancudo', 'assets/img/leeff.png', 3)
let perrozompopo = new Mokepon('perrozompopo', 'assets/img/waterr.png', 3)
let zanate = new Mokepon('zanate', 'assets/img/firee.png', 3)
mokepones.push(zancudo, perrozompopo, zanate)

zanate.attack.push(
    {name: 'SACAOJO', id: 'btn-fire'},
    {name: 'HUIDA', id: 'btn-water'},
    {name: 'ALETEO', id: 'btn-leef'}
)

perrozompopo.attack.push(
    {name: 'COLAZO', id: 'btn-fire'},
    {name: 'REGENERACION', id: 'btn-water'},
    {name: 'MORDISCO', id: 'btn-leef'}
)

zancudo.attack.push(
    {name: 'SACASANGRE', id: 'btn-fire'},
    {name: 'DENGUE', id: 'btn-water'},
    {name: 'VUELO', id: 'btn-leef'}
)

function initGame() { 
    selectAttack.style.display = 'none'
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

}


function selectMokepon() {

    selectPet.style.display = 'none'
    selectAttack.style.display = 'block'
    if(mokepon1.checked) {
        spanmokenPlayer.innerHTML = mokepon1.id
        playerPet = mokepon1.id
    }
    else if(mokepon2.checked) {
        spanmokenPlayer.innerHTML = mokepon2.id
        playerPet = mokepon2.id
    }
    else if(mokepon3.checked) {
       spanmokenPlayer.innerHTML = mokepon3.id
       playerPet = mokepon3.id
    }else {
        alert('You must select a mokepon')
    }
    findAttacksByPet(playerPet)

    selectEnemysPet()
}


function findAttacksByPet(playerPet) {
    let attacks
    for (let i = 0; i < mokepones.length; i++) {
        if(mokepones[i].name === playerPet) {
            attacks = mokepones[i].attack
        }
    }
 
    renderAttacksButtons(attacks)


}

function renderAttacksButtons(attacks) {
    
    attacks.forEach((attack) => {

        attackMokepon = ` 
             <button id=${attack.id} >
                ${attack.name}
            </button>
        `

        conteinerAttacks.innerHTML += attackMokepon
})

    btnFire = document.getElementById('btn-fire')
   
    btnWater = document.getElementById('btn-water')
    btnEarth = document.getElementById('btn-leef')

     btnFire.addEventListener('click', attackFire)  
    btnWater.addEventListener('click', attackWater)  
    btnEarth.addEventListener('click', attackLeef )   
    


   
}

 function selectEnemysPet()   {
    
    let random = randomMokepon(0, mokepones.length -1)

    spanmokenEnemy.innerHTML = mokepones[random].name
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
