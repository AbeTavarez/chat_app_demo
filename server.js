const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//* Sets static folder
app.use(express.static(path.join(__dirname, "public")));

//* Run when client connects
io.on("connection", (socket) => {
  console.log("New websocket connection...");
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
