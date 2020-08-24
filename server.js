const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//* Sets static folder
app.use(express.static(path.join(__dirname, "public")));

//* Bot name
const botName = `Inoske-Sama`;

//* Run when client connects
io.on("connection", (socket) => {
  console.log(`New websocket connection...`);

  socket.on(`joinRoom`, ({ username, room }) => {
    // creates new user
    const user = userJoin(socket.id, username, room);
    // join takes the room to join
    socket.join(user.room);

    //* message for the user that is connecting...
    socket.emit(
      `message`,
      formatMessage(botName, `Welcome to The Slayer Chat`)
    );

    //* Broadcast when user connects to chat..
    //* but not to the user that is connecting
    socket.broadcast
      .to(user.room)
      .emit(`message`, formatMessage(botName, `A user has joined the chat.`));

    //* Listen for chatMessage
    socket.on(`chatMessage`, (msg) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit(`message`, formatMessage(user.username, msg));
    });

    //* Runs when client disconnects
    socket.on(`disconnect`, () => {
      const user = userLeaves(socket.id);

      if (user) {
        io.to(user.room).emit(
          `message`,
          formatMessage(botName, `${user.username} has left the chat.`)
        );
      }

      //*  Send users and room info
      io.to(user.room).emit(`roomUsers`, {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    //*  Send users and room info
    io.to(user.room).emit(`roomUsers`, {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
