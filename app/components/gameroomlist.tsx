import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function GameRoomList() {
  const [gamerooms, setGamerooms] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    fetch("/api/gamerooms?public=true")
      .then((res) => res.json())
      .then((data) => setGamerooms(data.gamerooms));
  }, []);

  return (
    <nav className="bg-gray-800 p-4 w-64">
      <h3 className="text-white text-xl font-bold">Public Game Rooms</h3>
      <ul className="space-y-2 mt-4">
        {gamerooms.map((gameroom) => (
          <li key={gameroom.id}>
            <Link href={`/multiplayer/${gameroom.id}`} className="text-white hover:text-gray-300">
              {gameroom.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

