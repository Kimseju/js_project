export function getBlackCombat(params) {
  const key = "data_record_";
  let idx = -1;
  const values = [];

  while ((idx = params.indexOf(key, idx + 1)) !== -1) {
    const start = params.indexOf(">", idx) + 1;
    const end = params.indexOf("<div", start);

    values.push(params.slice(start, end).trim());
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
