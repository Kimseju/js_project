let response = await fetch("https://kr.ufc.com/athlete/islam-makhachev");
let body = await response.text();

let key = 'hero-profile__division-body">';

const start = body.indexOf(key) + key.length;
const end = body.indexOf("</p>", start);

const record = body.slice(start, end);

const nums = record.split(" ")[0].split("-");

console.log(nums[0], nums[1], nums[2]);

key = 'hero-profile__stat-numb">';
let idx = -1;
let values = [];

while (true) {
  idx = body.indexOf(key, idx + 1);

  if (idx === -1) break;

  const start = idx + key.length;
  const end = body.indexOf("</p>", start);

  values.push(body.slice(start, end).trim());
}

console.log(values);
