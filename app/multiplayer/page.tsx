'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import GameRoomList from "../components/gameroomlist";
import CreateGameRoom from "../components/creategameroom";

export default function MultiplayerPage() {
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState<boolean>(true);
  const router = useRouter();

  const callDeleteAllRoute = async () => {
    try {
      const response = await fetch("/api/gamerooms?all=true", {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
     <div className="container mx-4 flex">
      <aside className="w-64 p-4" >
        <GameRoomList />
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={callDeleteAllRoute}>
          Delete all game rooms
        </button>
      </aside>
      <main className="flex-1 p-4" style={{marginLeft: '20rem'}}>
        <CreateGameRoom />
      </main>
        
      </div> 
  );
}

