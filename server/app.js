const express = require("express");
const app = express();
const cors = require("cors");

const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { join } = require("node:path");
app.use(cors());

const server = createServer(app)

app.get("/", (req, res) => {
  res.send(" INI GAME ZAPZING");
});

app.listen(3000, () => {
  console.log("INI GAME ZapZing http://localhost:3000");
});
const io = new Server(server, {
    cors:"***"
})

io.on('connected',(socket)=> {
    console.log(`a `,socket.id);
    
})