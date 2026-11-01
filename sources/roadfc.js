export function getRoadfc(params) {
  let index = 0;
  let imgdx = params.indexOf("fv_wrap");
  let values = [];

  imgdx = params.indexOf(`src='`, imgdx) + 5;
  let imgend = params.indexOf(`'/>`, imgdx);

  let img = params.slice(imgdx, imgend);

  // 선수 확인 모달에서 이름 보여주려고 name 추출 추가
  let namedx = params.indexOf("fv_name");
  namedx = params.indexOf(">", namedx) + 1;
  let name = params.slice(namedx, params.indexOf("<", namedx));

  for (let i = 0; i < 3; i++) {
    index = params.indexOf("fs_50", index);
    index = params.indexOf(">", index) + 1;

    let end = params.indexOf("<", index);

    values.push(params.slice(index, end));
  }

  return {
    name: name,
    img: "https://roadfc.co.kr" + img,
    w: values[0],
    l: values[1],
    d: values[2],
  };
}
