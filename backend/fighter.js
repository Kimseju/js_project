// GET /fighter?org=단체&id=선수ID 처리 (선수 확인 모달용)
//  - 응답: { success: true, fighter: { name, img, win, lose, draw } }
//  - 400: 파라미터 잘못됨 / 404: 선수 없음 / 500: 에러

import { getUfc } from "../sources/ufc.js";
import { getOne } from "../sources/one_champion.js";
// boxrec 일단 뺐음
// import { getBoxrec } from "../sources/boxrec.js";
import { getBlackCombat } from "../sources/black_combat.js";
import { getRize } from "../sources/rise.js";
import { getRoadfc } from "../sources/roadfc.js";

// 단체별 설정표
//  - url: 선수 페이지 주소
//  - marker: 선수 페이지에만 있는 문자열 (없는 선수여도 200 주는 사이트가 있어서 이걸로 걸러냄)
//  - parse: 단체마다 전적 키 이름이 달라서 { name, img, win, lose, draw } 로 맞춰줌
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
      return { name: r.name, img: r.img, win: r.wins, lose: null, draw: null };
    },
  },
  // boxrec 안나와서 일단 주석처리함
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

async function getFighter(org, id) {
  const url = org.url(encodeURIComponent(id));
  let body;

  const res = await fetch(url);
  if (!res.ok) return null;
  body = await res.text();

  if (!body.includes(org.marker)) return null;

  const fighter = org.parse(body);
  if (!fighter.name.trim()) return null;

  return fighter;
}

// /fighter 요청 처리 (server.js 에서 부름)
export async function handleFighter(searchParams, res) {
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
