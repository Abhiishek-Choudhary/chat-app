import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Use the correct Render-assigned port
const PORT = process.env.PORT || 9000;

// Configure Socket.io server with CORS
const io = new Server(server, {
  cors: {
    origin: 'https://chat-app-seven-weld.vercel.app', // replace with your actual client URL
    methods: ["GET", "POST"]
  }
});

let users = [];

const addUser = (userData, socketId) => {
  if (!users.some(user => user.sub === userData.sub)) {
    users.push({ ...userData, socketId });
  }
};

const getUser = (userId) => {
  return users.find(user => user.sub === userId);
};

io.on('connection', (socket) => {
  console.log("User Connected");

  socket.on("addUsers", userData => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on('sendMessage', data => {
    const user = getUser(data.receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', data);
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user.socketId !== socket.id);
    io.emit("getUsers", users);
    console.log("User disconnected, users count:", users.length);
  });
});

server.listen(PORT, () => {
  console.log(`Socket server is running on port ${PORT}`);
});
