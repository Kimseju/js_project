export function getRize(params) {
  let imgdx = params.indexOf("p-fighter__picture");

  imgdx = params.indexOf(`src="`, imgdx) + 5;
  let imgend = params.indexOf(`">`, imgdx);

  let img = params.slice(imgdx, imgend);

  // 선수 확인 모달에서 이름 보여주려고 name 추출 추가 + 영문이름같이
  // イ・ソンヒョン        <span>Sunghyun Lee</span>
  let namedx = params.indexOf("p-fighter__profile-name");
  namedx = params.indexOf(">", namedx) + 1;
  let endx = params.indexOf("<span>", namedx);
  let name = params.slice(namedx, endx).trim();
  let enName = params.slice(endx + 6, params.indexOf("</span>", endx));

  let start = params.indexOf("戦歴／") + 3;

  let bouts = params.indexOf("戦", start);
  let win = params.indexOf("勝", bouts);
  let lose = params.indexOf("敗", win);
  let draw = params.indexOf("分（", lose);
  let ko = params.indexOf("KO", draw);

  return {
    name: `${name} (${enName})`,
    img: img,
    totalBouts: params.slice(start, bouts),
    win: params.slice(bouts + 1, win),
    lose: params.slice(win + 1, lose),
    draw: params.slice(lose + 1, draw),
    ko: params.slice(draw + 2, ko + 2),
  };
}

//   戦歴／87戦71勝14敗2分（17KO）</p>
