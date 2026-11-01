export function getUfc(params) {
  let start = params.indexOf(`hero-profile__division-body">`) + 29;
  let end = params.indexOf(" (W-L-D)", start);
  let imgdx = params.indexOf("hero-profile__image-wrap");

  imgdx = params.indexOf(`src="`, imgdx) + 5;
  let imgend = params.indexOf(`" alt=`, imgdx);

  let img = params.slice(imgdx, imgend);

  // [추가] 선수 확인 모달에서 이름 보여주려고 name 추출 추가 (아래 return 의 name 도)
  let namedx = params.indexOf(`hero-profile__name">`) + 20;
  let name = params.slice(namedx, params.indexOf("</h1>", namedx));

  const [w, l, d] = params.slice(start, end).split("-");

  let values = [];
  for (let i = 0; i < 3; i++) {
    start = params.indexOf(`hero-profile__stat-numb">`, end) + 25;
    end = params.indexOf("</p>", start);

    values.push(params.slice(start, end));
  }

  return {
    name: name, // [추가]
    img: img,
    w,
    l,
    d,
    ko: values[0],
    sub: values[1],
    finishes: values[2],
  };
}
