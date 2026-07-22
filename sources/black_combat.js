export function getBlackCombat(params) {
  let index = 0;
  const values = [];

  for (let i = 0; i < 3; i++) {
    index = params.indexOf("data_record_", index);
    index = params.indexOf(">", index) + 1;

    let end = params.indexOf("<div", index);

    values.push(params.slice(index, end).trim());
  }

  return {
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
