import { getRoadfc } from "./sources/roadfc.js";
import { getBlackCombat } from "./sources/black_combat.js";
import { getUfc } from "./sources/ufc.js";
import { getOne } from "./sources/one_champion.js";
import { getBoxrecBody, startBoxrec } from "./controller/bxr.js";
import { getBoxrec } from "./sources/boxrec.js";
import { getRize } from "./sources/rise.js";

// let res = await fetch("https://rise-rc.com/fighter/lee_sunghyun/");
// let body = await res.text();
// console.log(getRize(body));

// let res = await fetch("https://www.blackcombat-official.com/fighter/95863943");
// let body = await res.text();
// console.log(getBlackCombat(body));

// let res = await fetch("https://www.onefc.com/athletes/cho-kyeong-jae/");
// let body = await res.text();
// console.log(getOne(body));

// let res = await fetch(
//   "https://roadfc.co.kr/main/fighter/fighter_view.php?key=NVVETg==",
// );
// let body = await res.text();
// console.log(getRoadfc(body));

let res = await fetch("https://kr.ufc.com/athlete/joshua-van");
let body = await res.text();
console.log(getUfc(body));

// await startBoxrec();

// let res = await getBoxrecBody("https://boxrec.com/en/box-pro/628407");
// console.log(getBoxrec(res));
