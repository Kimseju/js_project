import { chromium } from "playwright";

let context;
let page;

export async function startBoxrec() {
  if (context) return;
  context = await chromium.launchPersistentContext("./profile", {
    headless: false,
  });

  page = context.pages()[0] ?? (await context.newPage());
}

export async function getBoxrecBody(url) {
  // [수정] 기본값(load)은 광고 같은 게 안 끝나서 30초 타임아웃 남
  // HTML만 오면 되니까 domcontentloaded 까지만 기다리고, 아래 navToggle 로 확인
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#navToggle");

  return await page.content();
}
