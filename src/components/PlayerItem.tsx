"use client"

import Image from "next/image";

interface PlayerItemProps {
  id: string;
  name: string;
  isGoalkeeper: boolean;
  createdAt: Date;
  deletePlayer: (id: string) => void;
}

export function PlayerItem({
  name,
  isGoalkeeper,
  id,
  createdAt,
  deletePlayer,
}: PlayerItemProps) {

  return (
    <li key={id} className="flex gap-1 justify-between items-center">
      <span className="text-slate-300">{name}</span>
      <Image
        src={isGoalkeeper ? "/assets/glove.svg" : "/assets/boot.svg"}
        alt={isGoalkeeper ? "Goalkeeper" : "Outfield"}
        title={isGoalkeeper ? "Goalkeeper" : "Outfield"}
        width={32}
        height={32}
        className="invert"
      />
      <button id={id} onClick={e => deletePlayer(id)}>Delete</button>
    </li>
  );
}
