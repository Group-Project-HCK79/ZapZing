const express = require("express");
const app = express();
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

app.get("/", (req, res) => {
  res.send(" INI GAME ZAPZING");
});
const messages = [
    {
      text: "Hello from tuku.",
      username: "System",
    },
  ];

//web socket pertama nyediain handshake
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    //socket 2 listen event
    socket.on("message:create", ({message})=>{
        console.log("message:", message);
        messages.push({text: message})
        console.log(messages, "<--- penampung");

        //socket 3 ngirim semua user
        io.emit("messages:response", message)
    })
})

server.listen(3000, () => {
  console.log("INI GAME ZapZing http://localhost:3000");
});
