import {hebrewTopic} from "../data/players"
export function ArenaBoard({ board, selected, onTileClick }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 120px)"}}>
      {board.map((player) => (
        <div
          key={player.id}
          onClick={() => onTileClick(player)}
          style={{
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: player.color,
            border: selected.some((p) => p.id === player.id) ? "1px solid #333" : "",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {player.name}
          <br/>
          {hebrewTopic[player.topic]}

        </div>
      ))}
    </div>
  );
}
