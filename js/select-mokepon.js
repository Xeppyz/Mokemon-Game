let attackPlayer
let attackEnemys

let playerLives = 3
let EnemyLives = 3

function initGame() {

    let selectAttack = document.getElementById('select-attack')
    selectAttack.style.display = 'none'
    let btnPet = document.getElementById('btn-pet')
    btnPet.addEventListener('click', selectMokepon)
    let btnFire = document.getElementById('btn-fire')
    btnFire.addEventListener('click', attackFire)
    let btnWater = document.getElementById('btn-water')
    btnWater.addEventListener('click', attackWater)
    let btnEarth = document.getElementById('btn-leef')
    btnEarth.addEventListener('click', attackLeef )

    let btnReset = document.getElementById('btn-reset')
    btnReset.addEventListener('click', resetGame)

}


function selectMokepon() {
    
    let selectPet = document.getElementById('select-pet')
    selectPet.style.display = 'none'
     
    let selectAttack = document.getElementById('select-attack')
    selectAttack.style.display = 'block'

    let mokepon1 = document.getElementById('zancudo')
    let mokepon2 = document.getElementById('perrozompopo')
    let mokepon3 = document.getElementById('zanate')
    let mokepon4 = document.getElementById('chupacabra')
    let mokepon5 = document.getElementById('llorona')

    let spanmokenPlayer = document.getElementById('player-pet')

    if(mokepon1.checked) {
        spanmokenPlayer.innerHTML = 'Zancudo'
    }
    else if(mokepon2.checked) {
        spanmokenPlayer.innerHTML = 'Perrozompopo'
    }
    else if(mokepon3.checked) {
       spanmokenPlayer.innerHTML = 'Zanate'
    }
    else if(mokepon4.checked) {
        spanmokenPlayer.innerHTML = 'Chupacabra'
    }
    else if(mokepon5.checked) {
        spanmokenPlayer.innerHTML = 'Llorona'
    }else {
        alert('You must select a mokepon')
    }
    selectEnemysPet()
}

 function selectEnemysPet()   {
    
    let random = randomMokepon(1, 5)
    let spanmokenEnemy = document.getElementById('enemys-pet')

  

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
        let spanLivesPlayer = document.getElementById('lives-player')
        let spanLivsEnemy = document.getElementById('lives-enemys')
        
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
    let message = document.getElementById('messages')
    let paragraph = document.createElement ('p')
    paragraph.innerHTML = `Your attack is ${attackPlayer} and the enemy attack is ${attackEnemys} + ${result}`
    message.appendChild(paragraph)
   
}



function randomMokepon(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', initGame)
