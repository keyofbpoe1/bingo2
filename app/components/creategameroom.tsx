import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGameRoom() {
const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState<boolean>(true);
  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name);
        console.log(privacy);
        
        const res = await fetch("/api/gamerooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, privacy }),
        });
        const json = await res.json();
        console.log(json);
        
        router.push(`/multiplayer/${json.gameroom.id}`);
      };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Create Game Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name:
          <input
            type="text"
            value={name}
            placeholder="Name Your Game Room"
            onChange={(e) => setName(e.target.value)}
            className="block w-1/4 border border-gray-300 p-2 rounded-md text-gray-800"
          />
        </label>
        <label className="block">
          Privacy:
          <select
            value={privacy.toString()}
            onChange={(e) =>
              setPrivacy(e.target.value === "true")
            }
            className="block w-1/4 border border-gray-300 p-2 rounded-md text-gray-800"
          >
            <option value="true">Private</option>
            <option value="false">Public</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create Game Room
        </button>
      </form>

    </main>
  );
}
