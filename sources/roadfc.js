export function getRoadfc(params) {
  let index = 0;
  let values = [];

  for (let i = 0; i < 3; i++) {
    index = params.indexOf("fs_50", index);
    index = params.indexOf(">", index) + 1;

    let end = params.indexOf("<", index);

    values.push(params.slice(index, end));
  }

  return {
    w: values[0],
    l: values[1],
    d: values[2],
  };
}
