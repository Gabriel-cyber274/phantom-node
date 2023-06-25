const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Add this
const {addUsers, getUsers, removeUsers} = require('./utils/online')

const {getMessages, sendMessage} = require('./utils/roommessages');

app.use(cors()); // Add cors middleware

const server = http.createServer(app); // Add this

// Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: '*',
    // origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});


// Add this
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

    socket.on('joinRoom', (id)=> {
        socket.join(`room${id}`)
    });

    socket.on('userRoom', (id)=> {
        socket.join(`user${id}`)
    })


    socket.on('sendMessage', ({room_id, user_id})=> {
        socket.broadcast.to(`room${room_id}`).emit('getmessages', room_id);
        socket.broadcast.to(`user${user_id}`).emit('userUpdate', user_id);
    })


    socket.on('seen', (user_id)=> {
      socket.broadcast.to(`user${user_id}`).emit('userUpdate', user_id);
    })

  
  socket.on('onLine', (id)=> {
      addUsers(id, socket.id);
      io.emit('usersOnline', getUsers());
  })

  socket.emit('message', 'welocome to phantom')
  // We can write our socket event listeners in here...
 socket.on('disconnect', ()=> {
    removeUsers(socket.id);
 })
});

server.listen(4000, () => 'Server is running on port 3000');