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
  // {
  //   text: "GG project.",
  //   username: "System",
  // },
];

let players = {}
const isChecked = {
  red: false,
  blue: false
}

// WebSocket
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // SOCKET II. listen events
  socket.on("messages:create", ({ message, username, time, image }) => {
    console.log("message:", message);
    // Message.create({ text: message })
    messages.push({ text: message, username, time, image });
    console.log(messages, "<<< msgs");

    // SOCKET III. kirim events ke semua user
    io.emit("messages:response", messages);

    // ack -> acknowledgement
    // callback();
  });

  // HISTORY II.
  socket.on("messages:fetch", (callback) => {
    // HISTORY III. kita kirim messages
    console.log(callback, "<<dsa");
    callback(messages);
  });

  socket.on("ready:toggle:red", (isRedChecked) => {
    isChecked.red = isRedChecked
    socket.emit("ready:toggle:red:save", isChecked.red);
    io.emit("ready:toggle:red:update", isChecked.red);
    socket.broadcast.emit("ready:toggle:red:forbid", isChecked.red);
  });
  socket.on("ready:toggle:blue", (isBlueChecked) => {
    isChecked.blue = isBlueChecked
    socket.emit("ready:toggle:blue:save", isChecked.blue);
    io.emit("ready:toggle:blue:update", isChecked.blue);
    socket.broadcast.emit("ready:toggle:blue:forbid", isChecked.blue);
  });
  socket.on("game:start", () => {
    if (isChecked.red && isChecked.blue) {
      console.log("Both players ready. Starting game...");
      io.emit("game:start");  // Notify all clients to start
    } else {
      socket.emit("game:start:failed", "Both players need to be ready!");
    }
  });

  socket.on("action:move:left", (newPlayers) => {
    console.log(newPlayers, "<<<SAVED LEFT");
    players = { ...players, ...newPlayers };
    io.emit("action:update", players); // General update event
  });

  socket.on("action:move:right", (newPlayers) => {
    console.log(newPlayers, "<<<SAVED RIGHT");
    players = { ...players, ...newPlayers };
    io.emit("action:update", players);
  });

  socket.on("action:punch", (newPlayers) => {
    console.log(newPlayers, "<<<PUNCH");
    players = { ...players, ...newPlayers };
    io.emit("action:update", players);
  });

  socket.on("action:punch:reset", (newPlayers) => {
    console.log(newPlayers, "<<<RESET PUNCH");
    players = { ...players, ...newPlayers };
    io.emit("action:update", players);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
