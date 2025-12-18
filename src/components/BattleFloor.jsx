import { useEffect, useState } from "react";

export function BattleFloor({ battle, onEnd }) {
  const { p1, p2, topic } = battle;
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(p1); // השחקן הפעיל
  const [showAnswer, setShowAnswer] = useState(false);

  const [time, setTime] = useState({
    [p1.id]: 30,
    [p2.id]: 30,
  });

  const [ended, setEnded] = useState(false);
  const [locked, setLocked] = useState(false);

    useEffect(() => {
    fetch("/imageMap.json")
      .then(res => res.json())
      .then(data => {
        setImages(data[topic] || []);
      })
      .catch(err => console.error("Failed to load image map:", err));
  }, [topic]);
  
  // =============================
  // טיימר
  // =============================
  useEffect(() => {
    if (ended) return;

    const timer = setInterval(() => {
      setTime(prev => {
        const currentId = turn.id;
        const newTime = prev[currentId] - 1;

        if (newTime <= 0) {
          clearInterval(timer);
          finishBattle(prev); // שולחים את הזמן העדכני
          return prev;
        }

        return { ...prev, [currentId]: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, ended]);

  // =============================
  // סיום סיבוב
  // =============================
  const finishBattle = (finalTime) => {
    debugger;
    if (ended) return;
    setEnded(true);

    const winner = finalTime[p1.id] > finalTime[p2.id] ? p1 : p2;
    const loser = winner.id === p1.id ? p2 : p1;

    onEnd(winner, loser);
  };

  // =============================
  // מעבר תמונה
  // =============================
  const nextImage = () => {
    if (ended) return;
    if (index + 1 >= images.length) {
      finishBattle(time);
      return;
    }
    setIndex(i => i + 1);
    setShowAnswer(false);
    setLocked(false);
  };

  // =============================
  // פעולות המשתמש
  // =============================
  const onYes = () => {
    if (locked || ended) return;
    setLocked(true);

    setTurn(turn.id === p1.id ? p2 : p1);
    setShowAnswer(true);

    setTimeout(nextImage, 600);
  };

  const onNo = () => {
    if (locked || ended) return;
    setLocked(true);

    setTime(prev => {
      const currentId = turn.id;
      const newTime = prev[currentId] - 3;

      if (newTime <= 0) {
        finishBattle({ ...prev, [currentId]: 0 });
        return prev;
      }

      return { ...prev, [currentId]: newTime };
    });

    setShowAnswer(true);
    setTimeout(nextImage, 600);
  };

  // =============================
  // מקלדת
  // =============================
  useEffect(() => {
    const yesKeys = new Set(["v","V","ArrowRight","ה"]);
    const noKeys = new Set(["x","X","ArrowLeft","ס"]);

    const handleKey = (e) => {
      if (yesKeys.has(e.key)) onYes();
      if (noKeys.has(e.key)) onNo();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [turn, locked, ended]);

  if (!images[index]) return null;
  const current = images[index];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{p1.name} מול {p2.name}</h2>
      <h3>נושא: {topic}</h3>

      <h2>⏱️ {p1.name}: {time[p1.id]} | {p2.name}: {time[p2.id]}</h2>
      <h3>תור: {turn.name}</h3>

      <img src={current.src} alt={current.answer} style={{ width: 300, height: 300, objectFit: "cover" }} />
      {showAnswer && <h2>{current.answer}</h2>}

      <p>Y = ידע | X = לא ידע</p>
    </div>
  );
}
