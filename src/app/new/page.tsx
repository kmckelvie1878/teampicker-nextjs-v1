import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createPlayer(data: FormData) {
  "use server";

  const name = data.get("player-name")?.valueOf() as string;
  const goalkeeper = data.get("is-goalkeeper")?.valueOf() as boolean;
  let goalkeeperValue = goalkeeper ? true : false;

  await prisma.player.create({ data: { name, isGoalkeeper: goalkeeperValue } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Add New Player</h1>
      </header>
      <form action={createPlayer} className="flex gap-2 flex-col justify-start">
        <div className="flex gap-2 flex-col">
          <label htmlFor="player-name">Player Name</label>
          <input
            type="text"
            name="player-name"
            placeholder="e.g. Billy"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
        </div>
        <div className="flex gap-2 flex-row">
          <label htmlFor="is-goalkeeper">Is Goalkeeper?</label>
          <input type="checkbox" name="is-goalkeeper" id="is-goalkeeper" />
        </div>
        <div className="flex gap-1 justify-end">
          <Link
            href="/"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
