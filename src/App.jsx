import { useState } from "react";
import { initialPlayers } from "./data/players";
import { ArenaBoard } from "./components/ArenaBoard";
import { BattleFloor } from "./components/BattleFloor";

export default function App() {
  const [screen, setScreen] = useState("arena");
  const [board, setBoard] = useState(initialPlayers);
  const [selected, setSelected] = useState([]);
  const [battle, setBattle] = useState(null);

  const onTileClick = (player) => {
    if (selected.some((p) => p.id === player.id)) return;
    const sel = [...selected, player];
    setSelected(sel);
    if (sel.length === 2) {
      setBattle({ p1: sel[0], p2: sel[1], topic: sel[1].topic });
      setSelected([]);
      setScreen("battle");
    }
  };

  const onBattleEnd = (winner, loser) => {
    setBoard((prev) =>
      prev.map((p) =>
        p.id === loser.id
          ? {
              ...p,
              name: winner.name,
              topic: winner.topic,
              color: winner.color,
            }
          : p
      )
    );
    setBattle(null);
    setScreen("arena");
  };

  return screen === "arena" ? (
    <ArenaBoard board={board} selected={selected} onTileClick={onTileClick} />
  ) : (
    <BattleFloor battle={battle} onEnd={onBattleEnd} />
  );
}
