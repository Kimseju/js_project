// [추가] 선수 확인 모달용으로 GET /fighter?org=단체&id=선수ID 추가함
//  - [추가] 표시된 부분만 새로 넣은 거고, 기존 POST / (인스타) 쪽은 안 건드림
//  - 응답: { success: true, fighter: { name, img, win, lose, draw } }

import http from "node:http";
import { main } from "./index.js";
// [추가] 선수 조회에 쓰는 파서들
import { getUfc } from "../sources/ufc.js";
import { getOne } from "../sources/one_champion.js";
// [보류] boxrec 은 로그인 안 하면 막혀서 일단 뺌 (아래 boxrec 관련 주석들 같이 풀면 됨)
// import { getBoxrec } from "../sources/boxrec.js";
import { getBlackCombat } from "../sources/black_combat.js";
import { getRize } from "../sources/rise.js";
import { getRoadfc } from "../sources/roadfc.js";
// import { startBoxrec, getBoxrecBody } from "../controller/bxr.js";

// [추가] 단체별 선수 페이지 주소 + 파서
// marker: 선수 페이지에만 있는 문자열 (없는 선수여도 200 주는 사이트가 있어서 이걸로 걸러냄)
// 전적 키 이름이 단체마다 달라서 win / lose / draw 로 맞춰줌
const orgs = {
  ufc: {
    url: (id) => `https://kr.ufc.com/athlete/${id}`,
    marker: `hero-profile__name">`,
    parse: (body) => {
      const r = getUfc(body);
      return { name: r.name, img: r.img, win: r.w, lose: r.l, draw: r.d };
    },
  },
  one: {
    url: (id) => `https://www.onefc.com/athletes/${id}/`,
    marker: "Finishes",
    parse: (body) => {
      const r = getOne(body);
      // 원챔은 승 / 총 경기수만 나옴
      return { name: r.name, img: r.img, win: r.wins, lose: null, draw: null };
    },
  },
  // [보류] boxrec
  // boxrec: {
  //   url: (id) => `https://boxrec.com/en/box-pro/${id}`,
  //   marker: "w-[33%]",
  //   browser: true,
  //   parse: (body) => {
  //     const r = getBoxrec(body);
  //     return { name: r.name, img: null, win: r.win, lose: r.lose, draw: r.draw };
  //   },
  // },
  blackcombat: {
    url: (id) => `https://www.blackcombat-official.com/fighter/${id}`,
    marker: `class="data_name"`,
    parse: (body) => {
      const r = getBlackCombat(body);
      return { name: r.name, img: r.img, win: r.win, lose: r.lose, draw: r.draw };
    },
  },
  rise: {
    url: (id) => `https://rise-rc.com/fighter/${id}/`,
    marker: "p-fighter__profile-name",
    parse: (body) => {
      const r = getRize(body);
      return { name: r.name, img: r.img, win: r.win, lose: r.lose, draw: r.draw };
    },
  },
  roadfc: {
    url: (id) => `https://roadfc.co.kr/main/fighter/fighter_view.php?key=${id}`,
    marker: "fv_name",
    parse: (body) => {
      const r = getRoadfc(body);
      return { name: r.name, img: r.img, win: r.w, lose: r.l, draw: r.d };
    },
  },
};

// [추가] 선수 페이지 받아와서 파싱, 선수 못 찾으면 null
async function getFighter(org, id) {
  const url = org.url(encodeURIComponent(id));
  let body;

  // [보류] boxrec 은 클라우드플레어 때문에 controller/bxr.js (playwright) 로 열어야 함
  // if (org.browser) {
  //   await startBoxrec();
  //   body = await getBoxrecBody(url);
  //
  //   // boxrec 은 로그인 안 하면 몇 명 보고 나서 로그인 페이지로 튕김 (rate_limited)
  //   if (body.includes("BoxRec: Login")) {
  //     throw new Error(
  //       "BoxRec 로그인이 필요합니다. 서버가 띄운 크롬 창에서 로그인 후 다시 시도해주세요.",
  //     );
  //   }
  // } else {
  const res = await fetch(url);
  if (!res.ok) return null;
  body = await res.text();
  // }

  if (!body.includes(org.marker)) return null;

  const fighter = org.parse(body);
  if (!fighter.name.trim()) return null;

  return fighter;
}

// [추가] /fighter 요청 처리 (400: 파라미터 잘못됨 / 404: 선수 없음 / 500: 에러)
async function handleFighter(searchParams, res) {
  const org = orgs[searchParams.get("org")];
  const id = searchParams.get("id")?.trim();

  if (!org || !id) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, error: "단체와 선수 ID를 확인해주세요." }));
    return;
  }

  try {
    const fighter = await getFighter(org, id);

    if (!fighter) {
      res.statusCode = 404;
      res.end(JSON.stringify({ success: false, error: "선수를 찾을 수 없습니다." }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, fighter }));
  } catch (err) {
    console.error("선수 조회 에러:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // [추가] req.url 에서 경로(/fighter)랑 쿼리(?org=..&id=..) 분리
  const { pathname, searchParams } = new URL(req.url, "http://localhost");

  if (req.url === "/" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        await main(body);

        res.statusCode = 200;
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error("에러 발생:", err);
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else if (pathname === "/fighter" && req.method === "GET") {
    // [추가] 선수 조회
    // 프론트(라이브서버 등 다른 origin)에서 불러야 해서 CORS 열어줌
    res.setHeader("Access-Control-Allow-Origin", "*");
    handleFighter(searchParams, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "존재하지 않는 경로입니다." }));
  }
});

server.listen(3000, () => {
  console.log("구동 시작");
});
