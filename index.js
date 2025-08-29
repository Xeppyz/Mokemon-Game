const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

const players = [];

class Player {
    constructor(id) {
        this.id = id;
    }

    assignMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Mokepon {
    constructor(name) {
        this.name = name;
    }
}

app.use(express.static("public"));

app.get("/join", (req, res) => {
    const id = `${Math.random()}`;
    const player = new Player(id);
    players.push(player);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(id);
})

app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || "";
    const name = req.body.mokepon || "";
    const mokepon = new Mokepon(name);
    const playerIndex = players.findIndex((player) => playerId === player.id);

    if (playerIndex >= 0) {
        players[playerIndex].assignMokepon(mokepon);
    }
    console.log(players);
    console.log(playerId);
    res.end();
});

app.post("/mokepon/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const playerIndex = players.findIndex((player) => playerId === player.id);

    if (playerIndex >= 0) {
        players[playerIndex].updatePosition(x, y);
    }

    const enemys = players.filter((player) => playerId !== player.id);

    res.send({
        enemys
    });
});

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});

function getEnemiesPositions() {
    fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x: selectedMokepon.x,
            y: selectedMokepon.y
        })
    })
    .then(res => res.json())
    .then(({ enemys }) => {
        enemys.forEach(enemyData => {
            let enemy = enemies.find(e => e.name === enemyData.mokepon);
            if (enemy && enemyData.x !== undefined && enemyData.y !== undefined) {
                enemy.x = enemyData.x;
                enemy.y = enemyData.y;
            }
        });
        drawScene();
    });
}
