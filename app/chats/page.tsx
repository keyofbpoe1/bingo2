// 'use client';

// import { useState, useEffect } from 'react'
// import io from 'socket.io-client'

// const socket = io('http://localhost:3001')

// const ChatRoomPage = () => {
//   const [roomName, setRoomName] = useState('')
//   const [username, setUsername] = useState('')
//   const [message, setMessage] = useState('')
//   const [messages, setMessages] = useState<string[]>([])
//   const [roomUsers, setRoomUsers] = useState<string[]>([])
//   const [currentRoom, setCurrentRoom] = useState<string | null>(null)

//   useEffect(() => {
//     socket.on('roomUsers', (users: string[]) => {
//       setRoomUsers(users)
//     })

//     socket.on('message', (message: string) => {
//       setMessages((prevMessages) => [...prevMessages, message])
//     })

//     socket.on('roomCreated', (roomName: string) => {
//       setCurrentRoom(roomName)
//     })

//     return () => {
//       socket.off('roomUsers')
//       socket.off('message')
//       socket.off('roomCreated')
//     }
//   }, [socket])

//   const handleCreateRoom = () => {
//     socket.emit('createRoom', roomName, username)
//     setRoomName('')
//     setUsername('')
//   }

//   const handleJoinRoom = () => {
//     socket.emit('joinRoom', roomName, username)
//     setRoomName('')
//     setUsername('')
//   }

//   const handleSendMessage = () => {
//     socket.emit('sendMessage', message, currentRoom)
//     setMessage('')
//   }

//   return (
//     <div>
//       <h1>Chat Room</h1>

//       <div>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <input
//           type="text"
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           placeholder="Room name"
//         />
//         <button onClick={handleCreateRoom}>Create Room</button>
//         <button onClick={handleJoinRoom}>Join Room</button>
//       </div>

//       {currentRoom && (
//         <div>
//           <h2>Current Room: {currentRoom}</h2>

//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Message"
//           />
//           <button onClick={handleSendMessage}>Send</button>

//           <h2>Room Users</h2>
//           <ul>
//             {roomUsers.map((user, index) => (
//               <li key={index}>{user}</li>
//             ))}
//           </ul>

//           <h2>Messages</h2>
//           <ul>
//             {messages.map((message, index) => (
//               <li key={index}>{message}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ChatRoomPage

'use client';


import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatRoomPage = () => {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    // ...
  }, [socket]);

  const createRoom = () => {
    socket.emit('createRoom', roomName);
    setCurrentRoom(roomName);
  };

  const joinRoom = () => {
    socket.emit('joinRoom', roomName);
    setCurrentRoom(roomName);
  };

  const sendMessage = () => {
    socket.emit('sendMessage', currentRoom, message);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Room</h1>

      <div>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
        />
        <button onClick={createRoom}>Create Room</button>
        <button onClick={joinRoom}>Join Room</button>
      </div>

      {currentRoom && (
        <div>
          <h2>Current Room: {currentRoom}</h2>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
          <button onClick={sendMessage}>Send</button>

          <h2>Messages</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};