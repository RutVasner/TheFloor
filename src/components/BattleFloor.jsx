import { useEffect, useRef, useState } from "react";
import { imageMap } from "../data/images";

export function BattleFloor({ battle, onEnd }) {
  const { p1, p2, topic } = battle;

  const images = imageMap[topic] || [];

  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(p1);
  const [showAnswer, setShowAnswer] = useState(false);

  const [time, setTime] = useState({
    [p1.id]: 30,
    [p2.id]: 30,
  });

  const [score, setScore] = useState({
    [p1.id]: 0,
    [p2.id]: 0,
  });

  const locked = useRef(false);
  const ended = useRef(false);

  // =============================
  // ⏱️ טיימר לפי תור
  // =============================
  useEffect(() => {
    if (ended.current) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        const currentTime = prev[turn.id] - 1;

        if (currentTime <= 0) {
          clearInterval(timer);
          finishBattle();
          return prev;
        }

        return {
          ...prev,
          [turn.id]: currentTime,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [turn]);

  // =============================
  // סיום סיבוב
  // =============================
  const finishBattle = () => {
    if (ended.current) return;
    ended.current = true;

    const winner =
      score[p1.id] >= score[p2.id] ? p1 : p2;
    const loser =
      winner.id === p1.id ? p2 : p1;

    onEnd(winner, loser);
  };

  // =============================
  // מעבר תמונה
  // =============================
  const nextImage = () => {
    if (ended.current) return;

    if (index + 1 >= images.length) {
      finishBattle();
      return;
    }

    setIndex((i) => i + 1);
    setShowAnswer(false);
    locked.current = false;
  };

  const onYes = () => {
    if (locked.current || ended.current) return;

    locked.current = true;

    setScore((s) => ({
      ...s,
      [turn.id]: s[turn.id] + 1,
    }));

    setTurn(turn.id === p1.id ? p2 : p1);
    setShowAnswer(true);

    setTimeout(nextImage, 600);
  };

  const onNo = () => {
    if (locked.current || ended.current) return;

    locked.current = true;
    setShowAnswer(true);

    setTimeout(nextImage, 600);
  };

  // =============================
  // מקלדת
  // =============================
useEffect(() => {
  const yesKeys = new Set([
    "v",
    "V",
    "ArrowRight",
    // "ArrowUp",
    "ה",

  ]);

  const noKeys = new Set([
    "x",
    "X",
    "ArrowLeft",
    // "ArrowDown",
    "ס",
  ]);

  const handleKey = (e) => {
    if (yesKeys.has(e.key)) {
      onYes();
    }

    if (noKeys.has(e.key)) {
      onNo();
    }
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [turn, index]);

  if (!images[index]) return null;

  const current = images[index];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{p1.name} מול {p2.name}</h2>
      <h3>נושא: {topic}</h3>

      <h2>
        ⏱️ {p1.name}: {time[p1.id]} | {p2.name}: {time[p2.id]}
      </h2>

      <h3>תור: {turn.name}</h3>

      <img
        src={current.src}
        alt={current.answer}
        style={{ width: 300, height: 300, objectFit: "cover" }}
      />

      {showAnswer && <h2>{current.answer}</h2>}

      <p>
        ניקוד — {p1.name}: {score[p1.id]} | {p2.name}: {score[p2.id]}
      </p>

      <p>Y = ידע | X = לא ידע</p>
    </div>
  );
}
