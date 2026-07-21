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
  await page.goto(url);
  await page.waitForSelector("#navToggle");

  return await page.content();
}
