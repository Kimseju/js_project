export function getRoadfc(params) {
  let index = 0;
  let imgdx = params.indexOf("fv_wrap");
  let values = [];

  imgdx = params.indexOf(`src='`, imgdx) + 5;
  let imgend = params.indexOf(`'/>`, imgdx);

  let img = params.slice(imgdx, imgend);

  for (let i = 0; i < 3; i++) {
    index = params.indexOf("fs_50", index);
    index = params.indexOf(">", index) + 1;

    let end = params.indexOf("<", index);

    values.push(params.slice(index, end));
  }

  return {
    img: "https://roadfc.co.kr" + img,
    w: values[0],
    l: values[1],
    d: values[2],
  };
}
