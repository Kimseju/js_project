export function getOneBout(params) {
  const key = "Finishes";
  let index = params.indexOf(key);

  const values = [];
  const str = '<div class="value">';

  for (let i = 0; i < 4; i++) {
    index = params.indexOf(str, index);
    if (index === -1) break;

    const start = index + str.length;
    const end = params.indexOf("</div>", start);

    values.push(params.slice(start, end).trim());
    index = end;
  }

  return {
    finishes: values[0],
    finishRate: values[1],
    wins: values[2],
    totalBouts: values[3],
  };
}
