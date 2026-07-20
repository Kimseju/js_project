const res = await fetch("https://www.onefc.com/athletes/cho-kyeong-jae/");
const body = await res.text();

const targetKey = "Finishes";
let currentIdx = body.indexOf(targetKey);

const values = [];
const searchStr = '<div class="value">';

for (let i = 0; i < 4; i++) {
  currentIdx = body.indexOf(searchStr, currentIdx);
  if (currentIdx === -1) break;

  const start = currentIdx + searchStr.length;
  const end = body.indexOf("</div>", start);

  values.push(body.slice(start, end).trim());
  currentIdx = end;
}

const [finish, finishRate, win, bout] = values;
console.log(finish, finishRate, win, bout);
