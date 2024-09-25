import { Server } from "socket.io";
import http from 'http';

const server = http.createServer((req, res) => {
  if (!res.headersSent) {
    // handle your HTTP requests here
  }
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // replace with your Next.js app URL
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();
const users = new Map();

io.on('connection', (socket) => {
    console.log('A user connected');

    io.on('connection', (socket) => {
      console.log('A user connected');
    
      // Create a new room
      socket.on('createRoom', (roomName) => {
        if (!rooms.has(roomName)) {
          rooms.set(roomName, new Set());
        }
        socket.join(roomName);
        console.log(`Room ${roomName} created`);
      });
    
      // Join an existing room
      socket.on('joinRoom', (roomName) => {
        if (rooms.has(roomName)) {
          socket.join(roomName);
          console.log(`User joined room ${roomName}`);
        } else {
          console.log(`Room ${roomName} does not exist`);
        }
      });
    
      // Send a message to a room
      socket.on('sendMessage', (roomName, message) => {
        if (rooms.has(roomName)) {
          io.to(roomName).emit('message', message);
          console.log(`Message sent to room ${roomName}`);
        } else {
          console.log(`Room ${roomName} does not exist`);
        }
      });
    
      // ...
    });
  
    // socket.on('joinRoom', (roomId) => {
    //   if (!rooms.has(roomId)) {
    //     rooms.set(roomId, new Set());
    //   }
    //   rooms.get(roomId).add(socket.id);
    //   socket.join(roomId);
    //   const roomUsers = Array.from(rooms.get(roomId));
    //   io.in(roomId).emit('roomUsers', roomUsers.map((id) => users.get(id)));
    // });

    socket.on('setUsername', (username) => {
      users.set(socket.id, username);
    });

    socket.on('disconnect', () => {
        const roomIds = Array.from(rooms.entries()).filter(([roomId, sockets]) => sockets.has(socket.id)).map(([roomId]) => roomId);
        roomIds.forEach((roomId) => {
          rooms.get(roomId).delete(socket.id);
          if (rooms.get(roomId).size === 0) {
            rooms.delete(roomId);
          } else {
            const roomUsers = Array.from(rooms.get(roomId));
            io.in(roomId).emit('roomUsers', roomUsers.map((id) => users.get(id)));
          }
        });
        users.delete(socket.id);
        console.log('User disconnected');
      });
      
      socket.on('message', (message) => {
        io.to(socket.rooms[0]).emit('message', message);
      });
      

    socket.on('chatMessage', (msg) => {
        const username = users.get(socket.id);
        io.in(socket.rooms[1]).emit('chatMessage', { username, message: msg });
    });

    socket.on('winnerMessage', (message) => {
        io.in(socket.rooms[1]).emit('winnerMessage', message);
    });

    socket.on('bingo', (winnerName) => {
      io.in(socket.rooms[1]).emit('gameEnded', winnerName);
    });

    socket.on('winGame', (data) => {
      const { username, winningValues } = data;
      console.log('Win game data:', data);
      io.in(socket.rooms[1]).emit('gameEnded', { winnerName: username, winningValues });
      io.in(socket.rooms[1]).emit('winnerAnnouncement', `${username} has won the game!`);
    });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
