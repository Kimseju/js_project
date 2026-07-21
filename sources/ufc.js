export function getUfcBout(params) {
  let key = 'hero-profile__division-body">';

  const start = params.indexOf(key) + key.length;
  const end = params.indexOf("</p>", start);

  const record = params.slice(start, end);

  const nums = record.split(" ")[0].split("-");

  key = 'hero-profile__stat-numb">';
  let idx = -1;
  let values = [];

  while (true) {
    idx = params.indexOf(key, idx + 1);

    if (idx === -1) break;

    const start = idx + key.length;
    const end = params.indexOf("</p>", start);

    values.push(params.slice(start, end).trim());
  }
  return {
    w: nums[0],
    l: nums[1],
    d: nums[2],
    ko: values[0],
    sub: values[1],
    finishes: values[2],
  };
}
