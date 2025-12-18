import { useState } from "react";
import { initialPlayers } from "./data/players";
import { ArenaBoard } from "./components/ArenaBoard";
import { BattleFloor } from "./components/BattleFloor";

export default function App() {
  const [screen, setScreen] = useState("arena");
  const [board, setBoard] = useState(initialPlayers);
  const [selected, setSelected] = useState([]);
  const [battle, setBattle] = useState(null);

const onTileClick = (tile) => {
  if (selected.some((t) => t.ownerId === tile.ownerId)) return;

  const sel = [...selected, tile];
  setSelected(sel);

  if (sel.length === 2) {
    setBattle({
      p1: sel[0],
      p2: sel[1],
      topic: sel[1].topic,
    });
    setSelected([]);
    setScreen("battle");
  }
};


const onBattleEnd = (winner, loser,p1Topic) => {
  debugger;
  setBoard((prev) =>
    prev.map((tile) =>
      tile.ownerId === loser.ownerId
        ? {
            ...tile,
            ownerId: winner.ownerId,
            name: winner.name,
            topic: p1Topic,
            color: winner.color,
          }
        : tile
    )
  );

  setBattle(null);
  setScreen("arena");
};

  return screen === "arena" ? (
    <ArenaBoard className="app" board={board} selected={selected} onTileClick={onTileClick} />
  ) : (
    <BattleFloor className="app" battle={battle} onEnd={onBattleEnd} />
  );
}
