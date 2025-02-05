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
let users = [];
// WebSocket
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  
  users.push({
    id: socket.id,
    username: socket.handshake.auth.username,
  });
  // SOCKET II. listen events
  io.emit("users:online", users);
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

  socket.on("disconnect", () => {
    console.log("user disconnected");
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== 1) {
      users.splice(index, 1);
    }
    io.emit("users:online", users);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
