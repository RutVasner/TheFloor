export const imageMap = {
food: [
{ src: "/assets/food/bread.jpg", answer: "לחם" },
{ src: "/assets/food/soup.jpg", answer: "מרק" },
{ src: "/assets/food/eshel.jpg", answer: "אשל" },
{ src: "/assets/food/chease.jpg", answer: "גבינה" },
{ src: "/assets/food/eggSalad.jpg", answer: "סלט ביצים" },
{ src: "/assets/food/icecream.jpg", answer: "גלידה" },
{ src: "/assets/food/omlet.jpg", answer: "חביתה" },
{ src: "/assets/food/meatbolls.jpg", answer: "קציצות" },
{ src: "/assets/food/shnitzel.jpg", answer: "שניצל" },
{ src: "/assets/food/yellowchease.jpg", answer: "גבינה צהובה" },
{ src: "/assets/food/wippedcream.jpg", answer: "קצפת" },
{ src: "/assets/food/marokayfish.jpg", answer: "דג מרוקאי" },
{ src: "/assets/food/mahpotato.jpg", answer: "פירה תפוח אדמה" },
{ src: "/assets/food/bolonez.jpg", answer: "בולונז" },
{ src: "/assets/food/Stirfriedvegetables.jpg", answer: "מוקפצים" },
{ src: "/assets/food/sushi.jpg", answer: "סושי" },
{ src: "/assets/food/shipudim.jpg", answer: "שיפודים " },
{ src: "/assets/food/shakshuka.jpg", answer: "שקשוקה " },
{ src: "/assets/food/kuskus.jpg", answer: "קוסקוס " },
{ src: "/assets/food/rice.jpg", answer: "אורז " },
{ src: "/assets/food/majadra.jpg", answer: "מג'דרה " },
{ src: "/assets/food/humusbasar.jpg", answer: "חומוס-בשר " },
{ src: "/assets/food/lazanya.jpg", answer: "לזניה " },
{ src: "/assets/food/piza.jpg", answer: "פיצה " },
{ src: "/assets/food/musaka.jpg", answer: "מוסקה " },
{ src: "/assets/food/sosegeinroll.jpg", answer: "נקניקיה בלחמניה " },
{ src: "/assets/food/tako.jpg", answer: "טאקו " },
{ src: "/assets/food/shuarma.jpg", answer: "שווארמה " },
{ src: "/assets/food/napolyoncake.jpg", answer: "עוגת נפוליון " },
],
animals: [
{ src: "/assets/animals/BEAR.jpg", answer: "דב" },
{ src: "/assets/animals/Beaver.jpg", answer: "בונה" },
{ src: "/assets/animals/CAMEL.jpg", answer: "גמל" },
{ src: "/assets/animals/CAT.jpg", answer: "חתול" },
{ src: "/assets/animals/COW.jpg", answer: "פרה" },
{ src: "/assets/animals/CROCODDILE.jpg", answer: "תנין" },
{ src: "/assets/animals/DOLPHIN.jpeg", answer: "דולפין" },
{ src: "/assets/animals/DONKEY.jpg", answer: "חמור" },
{ src: "/assets/animals/EAGLE.jpg", answer: "נשר" },
{ src: "/assets/animals/FOX.jpg", answer: "שועל" },
{ src: "/assets/animals/FLAMINGO.jpg", answer: "פלמינגו" },
{ src: "/assets/animals/elephant.jpg", answer: "פיל" },
{ src: "/assets/animals/GOAT.jpg", answer: "עז" },
{ src: "/assets/animals/Giraffe.jpg", answer: "ג'ירפה" },
{ src: "/assets/animals/FROG.jpg", answer: "צפרדע" },
{ src: "/assets/animals/horse.jpg", answer: "סוס" },
{ src: "/assets/animals/Hippopotamus.jpg", answer: "היפופוטם" },
{ src: "/assets/animals/Hedgehog.jpg", answer: "קיפוד" },
{ src: "/assets/animals/MONKEY.jpg", answer: "קוף" },
{ src: "/assets/animals/LION.jpeg", answer: "אריה" },
{ src: "/assets/animals/ZEBRA.jpeg", answer: "זברה" },
{ src: "/assets/animals/WOLF.jpeg", answer: "זאב" },
{ src: "/assets/animals/squirrel.jpeg", answer: "סנאי" },
{ src: "/assets/animals/KOALA.jpeg", answer: "קוואלה" },
{ src: "/assets/animals/PANDA.jpeg", answer: "פנדה" },
{ src: "/assets/animals/OTTER.jpg", answer: "לוטרה" },
{ src: "/assets/animals/ostrich.jpg", answer: "יען" },
{ src: "/assets/animals/HAMSTER.jpeg", answer: "ארנבת" },
{ src: "/assets/animals/RABBIT.jpg", answer: "שפן" },
{ src: "/assets/animals/PENGUIN.jpg", answer: "פינגוין" },
{ src: "/assets/animals/SHEEP.jpg", answer: "כבשה" },
{ src: "/assets/animals/SHARK.jpg", answer: "כריש" },
{ src: "/assets/animals/ROOSTER.jpg", answer: "תרנגול" },
{ src: "/assets/animals/SNAKE.jpg", answer: "נחש" },

],
flags: [
{ src: "/assets/flags/Argentina.jpg", answer: "ארגנטינה" },
{ src: "/assets/flags/Austria.jpg", answer: "אוסטריה" },
{ src: "/assets/flags/BELGIUM.jpg", answer: "בלגיה" },
{ src: "/assets/flags/BRAZIL.jpg", answer: "ברזיל" },
{ src: "/assets/flags/CANADA.jpg", answer: "קנדה" },
{ src: "/assets/flags/CHINA.jpg", answer: "סין" },
{ src: "/assets/flags/CROACIA.jpg", answer: "קרואטיה" },
{ src: "/assets/flags/CYPRUS.jpg", answer: "קפריסין" },
{ src: "/assets/flags/DENMARK.jpg", answer: "דנמרק" },
{ src: "/assets/flags/DENMARK.jpg", answer: "ארגנטינה" },
{ src: "/assets/flags/DENMARK.jpg", answer: "ארגנטינה" },
{ src: "/assets/flags/DENMARK.jpg", answer: "ארגנטינה" },
{ src: "/assets/flags/DENMARK.jpg", answer: "ארגנטינה" },
{ src: "/assets/flags/DENMARK.jpg", answer: "ארגנטינה" },

],

holidays: [{ src: "/assets/holidays/football.jpg", answer: "כדורגל" }],
geography: [{ src: "/assets/geography/israel.jpg", answer: "ישראל" }],
history: [{ src: "/assets/history/pyramid.jpg", answer: "הפירמידות" }],
music: [{ src: "/assets/music/piano.jpg", answer: "פסנתר" }]
};

import fs from "fs";
import path from "path";

// נתיב תיקיית הבסיס שלך (לדוגמה: public/assets)
const baseDir = path.join(process.cwd(), "public/assets");

// הקטגוריות שלך
const categories = ["flags", "food"]; // אפשר להוסיף עוד

// מילון תרגום לדוגמא (אפשר להרחיב)
const translations = {
  "Argentina": "ארגנטינה",
  "Austria": "אוסטריה",
  "BELGIUM": "בלגיה",
  "BRAZIL": "ברזיל",
  "CANADA": "קנדה",
  "CHINA": "סין",
  "CROACIA": "קרואטיה",
  "CYPRUS": "קפריסין",
  "DENMARK": "דנמרק",
  "EGYPT": "מצרים",
  "Estonia": "אסטוניה",
  "Finland": "פינלנד",
  "GEORGIA": "גאורגיה",
  "GREECE": "יוון",
  "INDIA": "הודו",
  "IRELAND": "אירלנד",
  "ISRAEL": "ישראל",
  "ITALY": "איטליה",
  "Japan": "יפן",
  "LATVIA": "לטביה",
  "LITHUANIA": "ליטא",
  "Luxembourg": "לוקסמבורג",
  "Malta": "מלטה",
  "MEXICO": "מקסיקו",
  "MONTENEGRO": "מונטנגרו",
  "NETHERLAND": "הולנד",
  "NORWAY": "נורווגיה",
  "Portugal": "פורטוגל",
  "RUSSIA": "רוסיה",
  "SLOVAKIA": "סלובקיה",
  "SLOVENIA": "סלובניה",
  "SOUTH AFRICA": "דרום אפריקה",
  "SOUTH KOREA": "דרום קוריאה",
  "SPAIN": "ספרד",
  "SWITZERLAND": "שווייץ",
  "THAILAND": "תאילנד",
  "Turkey": "טורקיה",
  "UK": "הממלכה המאוחדת"
};


// פונקציה ליצירת מערך קטגוריה
function createCategoryArray(category) {
  const dirPath = path.join(baseDir, category);
  if (!fs.existsSync(dirPath)) {
    console.warn(`תיקייה לא קיימת: ${category}`);
    return [];
  }

  const files = fs.readdirSync(dirPath);

  return files.map(file => {
    const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
    const answer = translations[nameWithoutExt] || nameWithoutExt;
    return {
      src: `/assets/${category}/${file}`,
      answer
    };
  });
}

// יצירת מערכים לכל הקטגוריות
const data = {};
categories.forEach(cat => {
  data[cat] = createCategoryArray(cat);
});

// אפשר גם לשמור לקובץ JSON:
fs.writeFileSync("categories.json", JSON.stringify(data, null, 2), "utf-8");
