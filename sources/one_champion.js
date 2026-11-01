export function getOne(params) {
  let index = params.indexOf("Finishes");
  let imgdx = params.indexOf("image ratio");

  const values = [];

  imgdx = params.indexOf(`src="`, imgdx) + 5;
  let imgend = params.indexOf(`" class="`, imgdx);

  let img = params.slice(imgdx, imgend);

  // [추가] 선수 확인 모달에서 이름 보여주려고 name 추출 추가 (아래 return 의 name 도)
  let namedx = params.indexOf("<h1");
  namedx = params.indexOf(">", namedx) + 1;
  let name = params.slice(namedx, params.indexOf("</h1>", namedx)).trim();

  for (let i = 0; i < 4; i++) {
    index = params.indexOf(`<div class="value">`, index) + 19;
    let end = params.indexOf("</div>", index);

    values.push(params.slice(index, end));
  }

  return {
    name: name, // [추가]
    img: img,
    finishes: values[0],
    finishRate: values[1],
    wins: values[2],
    totalBouts: values[3],
  };
}
