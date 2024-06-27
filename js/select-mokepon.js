

function initGame() {
    let btnPet = document.getElementById('btn-pet')
    btnPet.addEventListener('click', selectMokepon)

}

function selectMokepon() {


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

function randomMokepon(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', initGame)
