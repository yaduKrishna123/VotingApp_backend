require('dotenv').config();
require('./src/connection/connection');
const express = require('express');
const cors = require('cors');
const router = require('./src/router/router');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io'); // Import Server from socket.io

const PORT = 4000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

app.use(express.json());
app.use(router);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
router.post('/chat', (req, res) => {
  const message = req.body.message;

  // Broadcast the chat message to all connected clients
  io.emit('chatMessage', message);

  res.status(200).json({ message: 'Message broadcasted' });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Define your socket events here
  socket.on('vote', (pollId, optionIndex) => {
    // Handle the vote logic
    // Broadcast the updated poll data to all connected clients
    io.emit('pollUpdate', pollId, optionIndex);
  });

  
  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message); // Broadcast the chat message
  });


  // 

  

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


app.locals.io = io; 
server.listen(PORT, () => {
  console.log(`Server is listening to port number ${PORT}`);
});
