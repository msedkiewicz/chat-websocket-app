const express = require("express");
const socket = require("socket.io");

const app = express();
const server = app.listen(8000, () => {
  console.log("Server is running on Port:", 8000);
});
const path = require("path");
const io = socket(server);

const messages = [];
app.use(express.static(path.join(__dirname, "/client/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

io.on("connection", (socket) => {
  console.log("New client! Its id - " + socket.id);
  socket.on("message", (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("Oh, socket " + socket.id + " has left");
  });
  console.log("I've added a listener on message and disconnect events \n");
});
