'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Gameroom {
    name: string;
    // Add other properties as needed
  }

export default function GameRoomPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; 
  
  const [gameroom, setGameroom] = useState<Gameroom | null>(null);
  useEffect(() => {
    fetch(`/api/gamerooms?id=${id}`)
      .then((res) => res.json())
      .then((data) => setGameroom(data.gameroom));
  }, [id]);

  if (!gameroom) {
    return <div>Game room not found</div>;
  }

async function callDeleteRoute() {
  try {
    const response = await fetch(`/api/gamerooms?id=${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div>
      <h1>{gameroom.name}</h1>
      <button onClick={callDeleteRoute}>Delete</button>
    </div>
  );
}

