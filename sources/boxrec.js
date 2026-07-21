export function getBoxrec(body) {
  const targetKey = 'bg-W-500">';
  const startIdx = body.indexOf(targetKey);

  const chunk = body.slice(startIdx, startIdx + 600);

  const parts = chunk.split("</div>");

  return {
    win: parts[0].replace(targetKey, ""),
    lose: parts[1].split('bg-L-500">')[1].trim(),
    draw: parts[2].split('bg-D-500">')[1].trim(),
    kow: parts[4].split('items-center justify-center">')[1],
    kol: parts[5].split('items-center justify-center">')[1],
  };
}
