export function getRize(params) {
  let start = params.indexOf("戦歴／") + 3;

  let bouts = params.indexOf("戦", start);
  let win = params.indexOf("勝", bouts);
  let lose = params.indexOf("敗", win);
  let draw = params.indexOf("分（", lose);
  let ko = params.indexOf("KO", draw);

  return {
    totalBouts: params.slice(start, bouts),
    win: params.slice(bouts + 1, win),
    lose: params.slice(win + 1, lose),
    draw: params.slice(lose + 1, draw),
    ko: params.slice(draw + 2, ko + 2),
  };
}

//   戦歴／87戦71勝14敗2分（17KO）</p>
