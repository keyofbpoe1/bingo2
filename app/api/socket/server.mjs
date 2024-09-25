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

const users = new Map();

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('setUsername', (username) => {
      users.set(socket.id, username);
      io.emit('userJoined', username);
    });

    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        users.delete(socket.id);
        io.emit('userLeft', username);
        console.log('User disconnected');
      });

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

    socket.on('chatMessage', (msg) => {
        const username = users.get(socket.id);
        io.emit('chatMessage', { username, message: msg });
    });   
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//     io.emit("chat message", msg);
//   });

    socket.on('winnerMessage', (message) => {
        io.emit('winnerMessage', message);
    });

  socket.on('bingo', (winnerName) => {
    io.emit('gameEnded', winnerName);
  });

  socket.on('winGame', (data) => {
    const { username, winningValues } = data;
    console.log('Win game data:', data);
    io.emit('gameEnded', { winnerName: username, winningValues });
    io.emit('winnerAnnouncement', `${username} has won the game!`);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});