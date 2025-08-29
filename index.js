const express = require("express");

const app = express();
const players = [];

class Player {
    constructor(id){
        this.id = id;
    }
}

app.use(express.static("public"));

app.get("/join",(req, res)=>{
    const id = `${Math.random()}`;
    const player = new Player(id);
    players.push(player);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(id);
})

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
