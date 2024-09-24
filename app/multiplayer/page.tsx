'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import GameRoomList from "../components/gameroomlist";
import CreateGameRoom from "../components/creategameroom";

export default function MultiplayerPage() {
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState<boolean>(true);
  const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(name);
  //   console.log(privacy);
    
  //   const res = await fetch("/api/gamerooms", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, privacy }),
  //   });
  //   const json = await res.json();
  //   console.log(json);
    
  //   router.push(`/multiplayer/${json.gameroom.id}`);
  // };

  return (

    //<>
     <div className="container mx-auto flex h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300" style={{left: 0, position: 'fixed'}}>
        <GameRoomList />
      </aside>
      <main className="flex-1 p-4" style={{marginLeft: '20rem'}}>
        <CreateGameRoom />
      </main>
        
      </div>
    //</>


    // <div>
    //   <h1>Multiplayer</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Name:
    //       <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Privacy:
    //       <select
    //         value={privacy.toString()}
    //         onChange={(e) =>
    //           setPrivacy(e.target.value === "true")
    //         }
    //       >
    //         <option value="true">Private</option>
    //         <option value="false">Public</option>
    //       </select>
    //     </label>
    //     <br />
    //     <button type="submit">Create Game</button>
    //   </form>
    //   <GameRoomList />
    // </div>
  );
}
