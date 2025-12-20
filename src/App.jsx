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


  const onBattleEnd = (winner, loser, newTopic) => {
    setBoard((prev) =>
      prev.map((tile) => {
        if (
          tile.ownerId === winner.ownerId ||
          tile.ownerId === loser.ownerId
        ) {
          return {
            ...tile,
            ownerId: winner.id,
            name: winner.name,
            topic: newTopic,
            color: winner.color,
          };
        }

        return tile;
      })
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

