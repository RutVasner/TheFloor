// generateImageMap.js
const fs = require("fs");
const path = require("path");
const { translations: t } = require("./translations");

const assetsDir = path.join(__dirname, "assets"); // התיקיה הראשית
const categories = fs.readdirSync(assetsDir).filter(f =>
  fs.statSync(path.join(assetsDir, f)).isDirectory()
);

const imageMap = {};

categories.forEach((cat) => {
  const dirPath = path.join(assetsDir, cat);
  const files = fs.readdirSync(dirPath).filter(f => /\.(jpg|png|jpeg)$/i.test(f));

  imageMap[cat] = files.map((file) => {
    
    const name = path.parse(file).name; // בלי סיומת
    console.log(t[name], "trans");
    // debugger;
    return {
      src: `/assets/${cat}/${file}`,
      answer: t[name] || name, // אם אין תרגום, נשאיר באנגלית
    };
  });
});

// שמירה כ־JSON
fs.writeFileSync("imageMap.json", JSON.stringify(imageMap, null, 2), "utf-8");
console.log("✅ JSON נוצר בהצלחה!");
