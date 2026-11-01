export function getBlackCombat(params) {
  let index = 0;
  let imgdx = params.indexOf("fighter_img");

  const values = [];

  imgdx = params.indexOf(`src='`, imgdx) + 5;
  let imgend = params.indexOf(`'`, imgdx);

  let img = params.slice(imgdx, imgend);

  // 선수 확인 모달에서 이름 보여주려고 name 추출 추가
  let namedx = params.indexOf(`class="data_name"`);
  namedx = params.indexOf("</span>", namedx) + 7;
  let name = params.slice(namedx, params.indexOf("<br", namedx)).trim();

  for (let i = 0; i < 3; i++) {
    index = params.indexOf("data_record_", index);
    index = params.indexOf(">", index) + 1;

    let end = params.indexOf("<div", index);

    values.push(params.slice(index, end).trim());
  }

  return {
    name: name,
    img: img,
    win: values[0],
    lose: values[1],
    draw: values[2],
  };
}

//   <div class="data_record">
//         <div class="data_record_win">
//             13 <div class="mini">Win</div>
//         </div>
//         <div class="data_record_draw">
//             8 <div class="mini">Loss</div>
//         </div>
//         <div class="data_record_lose">
//             0 <div class="mini">Draw</div>
//         </div>
//     </div>
