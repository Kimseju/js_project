export function getBoxrec(body) {
  const key = 'bg-W-500">';
  const index = body.indexOf(key);

  const chunk = body.slice(index, index + 600);

  const parts = chunk.split("</div>");

  return {
    win: parts[0].replace(key, ""),
    lose: parts[1].split('bg-L-500">')[1].trim(),
    draw: parts[2].split('bg-D-500">')[1].trim(),
    kow: parts[4].split('items-center justify-center">')[1],
    kol: parts[5].split('items-center justify-center">')[1],
  };
}
