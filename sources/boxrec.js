export function getBoxrec(body) {
  let index = 0;
  let values = [];

  for (let i = 0; i < 5; i++) {
    index = body.indexOf(`w-[33%]`, index);
    index = body.indexOf(`>`, index) + 1;
    let end = body.indexOf(`</div>`, index);

    values.push(body.slice(index, end));
  }

  return {
    win: values[0],
    lose: values[1],
    draw: values[2],
    kow: values[3],
    kol: values[4],
  };
}
