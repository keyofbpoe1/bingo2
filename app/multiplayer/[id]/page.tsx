'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import BingoCard from '@/app/components/bingocard';
import Share from '@/app/components/share';

export default function BingoGame() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [winningValues, setWinningValues] = useState<string[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('bingoWinner', (winnerName: string) => {
      setWinner(winnerName);
      setGameEnded(true);
      setWinnerMessage(`${winnerName} has won the game!`);
    });

    newSocket.on('userJoined', (user: string) => {
      setUsers((prevUsers) => [...prevUsers, user]);
      setUserCount((prevCount) => prevCount + 1);
    });

    newSocket.on('userLeft', (user: string) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
      setUserCount((prevCount) => prevCount - 1);
    });

    newSocket.on('currentUsers', (currentUsers: string[]) => {
      setUsers(currentUsers);
      setUserCount(currentUsers.length);
    });

    newSocket.on('winnerMessage', (message: string) => {
      setWinnerMessage(message);
    });

    newSocket.on('gameEnded', (data: { winnerName: string, winningValues: string[] }) => {
      console.log('Game ended data:', data);
      setWinner(data.winnerName);
      setGameEnded(true);
      setWinningValues(data.winningValues);
    });

    newSocket.on('winnerAnnouncement', (message: string) => {
      setWinnerMessage(message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && socket) {
      socket.emit('setUsername', username);
      setIsUsernameSet(true);
    }
  };

  const startNewGame = () => {
    setGameEnded(false);
    setWinner(null);
    setWinnerMessage(null);
    socket?.emit('newGame', roomId);
  };

  const handleWin = (winningValues: string[]) => {
    if (socket) {
      socket.emit('winGame', { username, winningValues });
    }
  };

  useEffect(() => {
    if (socket && roomId) {
      socket.emit('joinRoom', roomId);
    }
  }, [socket, roomId]);

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  if (!isUsernameSet) {
    return (
      <form onSubmit={handleUsernameSubmit} className="flex flex-col items-center p-24">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 text-gray-800 rounded-md"
          placeholder="Enter your username"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none">Join Bingo Game</button>
      </form>    );
  }

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Bingo Game</h1>
      <div className="flex justify-left p-4">
        <button
          onClick={handleShareClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Share Game
        </button>
      </div>
      {showShareModal && <Share onClose={() => setShowShareModal(false)} />}
      {winnerMessage && (
        <div className="mt-4 text-center text-xl font-bold text-green-600">
          {winnerMessage}
        </div>
      )}
      {gameEnded && winner && (
        <div className="mt-4 text-center">
          {/* <p className="text-xl font-bold text-green-600">
            {winner} has won the game!
          </p> */}
          <p className="mt-2">Winning fallacies: {winningValues?.join(', ') || 'None'}</p>
        </div>
      )}
      <form className="flex flex-col items-center p-4">
        <label htmlFor="roomId" className="text-xl font-bold">Room ID:</label>
        <input
          type="text"
          value={roomId || ''}
          onChange={handleRoomIdChange}
          className="border p-2 mb-2 text-gray-800 rounded-md"
          placeholder="Enter a room ID"
        />
        <button
          onClick={() => socket?.emit('joinRoom', roomId)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
        >
          Join Room
        </button>
      </form>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Players:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index} className={`${user === username ? "font-bold" : ""} ${user === winner ? "text-green-600" : ""}`}>
              {user} {user === username && "(You)"} {user === winner && "(Winner!)"}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Users connected: {userCount}</h2>
      </div>
      <BingoCard 
        onWin={(winningValues) => handleWin(winningValues)} 
        disabled={gameEnded} 
        winningValues={winningValues}
      />
    </div>
  );
}


