const express = require("express");
const { createServer } = require("node:http");
// const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// HTTP Request
app.get("/", (req, res) => {
  res.send("<h1>Ini server</h1>");
});

const messages = [
  {
    text: "GG project.",
    username: "System",
  },
];

let players = {}

// WebSocket
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // SOCKET II. listen events
  socket.on("messages:create", ({ message, username }) => {
    console.log("message:", message);
    // Message.create({ text: message })
    messages.push({ text: message, username });
    console.log(messages, "<<< msgs");

    // SOCKET III. kirim events ke semua user
    io.emit("messages:response", messages);

    // ack -> acknowledgement
    // callback();
  });

  // HISTORY II.
  socket.on("messages:fetch", (callback) => {
    // HISTORY III. kita kirim messages
    // console.log(callback, "<<dsa");
    callback(messages);
  });

  socket.on("action:move:left", (newPlayers) => {
    console.log(newPlayers, "<<<SAVED LEFT");
    
    players = newPlayers

    io.emit("action:move:left:response", players);
  });
  socket.on("action:move:right", (newPlayers) => {
    console.log(newPlayers, "<<<SAVED RIGHT");

    
    players = newPlayers

    io.emit("action:move:right:response", players);
  });


  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
