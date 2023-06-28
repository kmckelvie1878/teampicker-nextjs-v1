import { PlayerItem } from "@/components/PlayerItem";
import { prisma } from "@/db";
import Link from "next/link";

function getPlayers() {
  return prisma.player.findMany();
}

export default async function Home() {
  const players = await getPlayers();

  async function deletePlayer(id: string) {
    "use server"

    await prisma.player.delete({
      where: {
        id: id,
      },
    })
    console.log(id, 'deleted');
  }
  
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">TeamPicker</h1>
        <Link
          href="/new"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          New Player
        </Link>
      </header>
      <main>
        <ul>
          {players.map((player: any) => (
            <PlayerItem key={player.id} {...player} deletePlayer={deletePlayer} />
          ))}
        </ul>
      </main>
    </>
  );
}
