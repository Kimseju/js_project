export function getUfc(params) {
  let start = params.indexOf(`hero-profile__division-body">`) + 29;
  let end = params.indexOf(" (W-L-D)", start);
  let imgdx = params.indexOf("hero-profile__image-wrap");

  imgdx = params.indexOf(`src="`, imgdx) + 5;
  let imgend = params.indexOf(`" alt=`, imgdx);

  let img = params.slice(imgdx, imgend);

  const [w, l, d] = params.slice(start, end).split("-");

  let values = [];
  for (let i = 0; i < 3; i++) {
    start = params.indexOf(`hero-profile__stat-numb">`, end) + 25;
    end = params.indexOf("</p>", start);

    values.push(params.slice(start, end));
  }

  return {
    img: img,
    w,
    l,
    d,
    ko: values[0],
    sub: values[1],
    finishes: values[2],
  };
}
