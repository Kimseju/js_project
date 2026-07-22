export function getOne(params) {
  let index = params.indexOf("Finishes");

  const values = [];

  for (let i = 0; i < 4; i++) {
    index = params.indexOf(`<div class="value">`, index) + 19;
    let end = params.indexOf("</div>", index);

    values.push(params.slice(index, end));
  }

  return {
    finishes: values[0],
    finishRate: values[1],
    wins: values[2],
    totalBouts: values[3],
  };
}
