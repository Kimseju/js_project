export function getBlackCombat(params) {
  let index = 0;
  let imgdx = params.indexOf("fighter_img");

  const values = [];

  imgdx = params.indexOf(`src='`, imgdx) + 5;
  let imgend = params.indexOf(`'`, imgdx);

  let img = params.slice(imgdx, imgend);

  for (let i = 0; i < 3; i++) {
    index = params.indexOf("data_record_", index);
    index = params.indexOf(">", index) + 1;

    let end = params.indexOf("<div", index);

    values.push(params.slice(index, end).trim());
  }

  return {
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
