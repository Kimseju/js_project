export function getBoxrec(body) {
  let index = 0;
  let values = [];

  // 선수 확인 모달에서 이름 보여주려고 name 추출 추가하긴했는데 데이터가 안가져와짐;;
  let namedx = body.indexOf("<title>") + 7;
  let name = body
    .slice(namedx, body.indexOf("</title>", namedx))
    .replace("BoxRec: ", "");

  for (let i = 0; i < 5; i++) {
    index = body.indexOf(`w-[33%]`, index);
    index = body.indexOf(`>`, index) + 1;
    let end = body.indexOf(`</div>`, index);

    values.push(body.slice(index, end));
  }

  return {
    name: name,
    win: values[0],
    lose: values[1],
    draw: values[2],
    kow: values[3],
    kol: values[4],
  };
}
