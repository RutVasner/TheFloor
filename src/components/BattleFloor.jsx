import { useEffect, useState } from "react";
import { hebrewTopic } from "../data/players";
export function BattleFloor({ battle, onEnd }) {
  const { p1, p2, topic } = battle;
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(p1);
  const [showAnswer, setShowAnswer] = useState(false);

  const [time, setTime] = useState({
    [p1.id]: 30,
    [p2.id]: 30,
  });

  const [ended, setEnded] = useState(false);
  const [locked, setLocked] = useState(false);

  // =============================
  // טעינת תמונות
  // =============================
  useEffect(() => {
    console.log("topic changed:", topic);
    setImagesLoaded(false);
    setIndex(0); // איפוס אינדקס כשמשנים נושא
    fetch("/imageMap.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch success");
        const topicImages = data[topic] || [];
        setImages(topicImages);
        setImagesLoaded(true);
        console.log("Images loaded:", topicImages.length);
      })
      .catch((err) => {
        console.error("Failed to load image map:", err);
        setImages([]);
        setImagesLoaded(true);
      });
  }, [topic]);

  // =============================
  // טיימר
  // =============================
  useEffect(() => {
    if (ended || !imagesLoaded) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        const currentId = turn.id;
        const newTime = prev[currentId] - 1;

        if (newTime <= 0) {
          clearInterval(timer);
          finishBattle(prev, "נגמר הזמן");
          return prev;
        }

        return { ...prev, [currentId]: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, ended, imagesLoaded]);

  // =============================
  // סיום סיבוב
  // =============================
  const finishBattle = (finalTime, reason) => {
    console.log("Battle ended:", reason);

    if (ended) return;
    setEnded(true);

    const winner = finalTime[p1.id] > finalTime[p2.id] ? p1 : p2;
    const loser = winner.id === p1.id ? p2 : p1;

    onEnd(winner, loser,p1.topic);
  };

  // =============================
  // מעבר תמונה
  // =============================
  const nextImage = () => {
    console.log("nextImage called - index:", index, "images.length:", images.length);

    // בדיקות בטיחות
    if (ended) {
      console.log("Game already ended");
      return;
    }

    if (!imagesLoaded) {
      console.log("Images not loaded yet");
      return;
    }

    if (images.length === 0) {
      console.log("No images available");
      finishBattle(time, "אין תמונות זמינות");
      return;
    }

    // בדיקה אם נגמרו התמונות
    if (index + 1 >= images.length) {
      console.log("No more images");
      finishBattle(time, "נגמרו התמונות");
      return;
    }

    // מעבר לתמונה הבאה
    setIndex((i) => i + 1);
    setShowAnswer(false);
    setLocked(false);
  };

  // =============================
  // פעולות המשתמש
  // =============================
  const onYes = () => {
    console.log("Yes pressed");
    if (locked || ended || !imagesLoaded) return;

    setLocked(true);
    setTurn(turn.id === p1.id ? p2 : p1);
    setShowAnswer(true);

    setTimeout(nextImage, 600);
  };

  const onNo = () => {
    console.log("No pressed");
    if (locked || ended || !imagesLoaded) return;

    setLocked(true);

    setTime((prev) => {
      const currentId = turn.id;
      const newTime = prev[currentId] - 3;

      if (newTime <= 0) {
        finishBattle({ ...prev, [currentId]: 0 }, "נגמר הזמן - תשובה שגויה");
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
    const yesKeys = new Set(["v", "V", "ArrowRight", "ה"]);
    const noKeys = new Set(["x", "X", "ArrowLeft", "ס"]);

    const handleKey = (e) => {
      if (yesKeys.has(e.key)) onYes();
      if (noKeys.has(e.key)) onNo();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [turn, locked, ended, imagesLoaded]);

  // =============================
  // רינדור
  // =============================

  // מסך טעינה
  if (!imagesLoaded) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>טוען תמונות...</h2>
        <p>נושא: {topic}</p>
      </div>
    );
  }

  // אין תמונות
  if (images.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>אין תמונות זמינות עבור נושא: {topic}</h2>
        <button onClick={() => onEnd(p1, p2,p1.topic)}>חזור לזירה</button>
      </div>
    );
  }

  // אין תמונה נוכחית
  if (!images[index]) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>שגיאה בטעינת תמונה</h2>
        <button onClick={() => onEnd(p1, p2,p1.topic)}>חזור לזירה</button>
      </div>
    );
  }

  const current = images[index];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        {p1.name} מול {p2.name}
      </h2>
      <h3>נושא: {hebrewTopic[topic]}</h3>

      <h2>
        ⏱️ {p1.name}: {time[p1.id]} | {p2.name}: {time[p2.id]}
      </h2>
      <h3>תור: {turn.name}</h3>

      <div style={{ margin: "20px 0" }}>
        <p>תמונה {index + 1} מתוך {images.length}</p>
      </div>

      <img
        src={current.src}
        alt={current.answer}
        style={{ width: 300, height: 300, objectFit: "contain",}}
      />

      {showAnswer && <h2 style={{ color: "green" }}>{current.answer}</h2>}

      <div style={{ marginTop: "20px" }}>
        <p><strong>V = ידע | X = לא ידע</strong></p>
        {locked && <p style={{ color: "orange" }}>ממתין...</p>}
      </div>
    </div>
  );
}