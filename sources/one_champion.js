export function getOneBout(params) {
  const targetKey = "Finishes";
  let currentIdx = params.indexOf(targetKey);

  const values = [];
  const searchStr = '<div class="value">';

  for (let i = 0; i < 4; i++) {
    currentIdx = params.indexOf(searchStr, currentIdx);
    if (currentIdx === -1) break;

    const start = currentIdx + searchStr.length;
    const end = params.indexOf("</div>", start);

    values.push(params.slice(start, end).trim());
    currentIdx = end;
  }

  return {
    finishes: values[0],
    finishRate: values[1],
    wins: values[2],
    totalBouts: values[3],
  };
}
