import { IgApiClient } from "igramapi";
import fs from "fs/promises";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const ig = new IgApiClient();

const username = process.env.INSTA_USER;
const password = process.env.INSTA_PASS;

const SESSION_FILE = "./session/session.json";

async function saveSession() {
  const session = await ig.state.serialize();

  delete session.constants;

  await fs.writeFile(SESSION_FILE, JSON.stringify(session, null, 2), "utf8");
}

async function loadSession() {
  try {
    const session = JSON.parse(await fs.readFile(SESSION_FILE, "utf8"));

    await ig.state.deserialize(session);

    return true;
  } catch {
    return false;
  }
}

async function handleChallenge() {
  console.log("Instagram 인증 필요");

  const challenge = await ig.challenge.auto();

  console.log("Challenge 상태:", challenge.step_name);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  const code = await rl.question("이메일/SMS로 받은 인증코드를 입력하세요: ");

  rl.close();

  await ig.challenge.sendSecurityCode(code);

  console.log("인증 완료");
}

async function login() {
  const hasSession = await loadSession();

  if (hasSession) {
    try {
      await ig.account.currentUser();
      console.log("기존 세션 사용");
      return;
    } catch (e) {
      console.log("세션 만료");

      await fs.unlink(SESSION_FILE).catch(() => {});
      ig.state.generateDevice(username);
    }
  } else {
    ig.state.generateDevice(username);
  }

  try {
    await ig.simulate.preLoginFlow();
    await ig.account.login(username, password);
    console.log("로그인 성공");
  } catch (e) {
    const body = e?.response?.body;

    if (body?.error_type === "checkpoint_challenge_required") {
      console.log("Challenge 발생");

      await handleChallenge();
      console.log("Challenge 로그인 완료");

      return;
    }

    throw e;
  }
}

export async function main(biography) {
  await login();

  const me = await ig.account.currentUser();
  await saveSession();

  console.log("로그인 계정:", me.username);

  await ig.account.setBiography(biography);

  console.log("소개글 변경 완료");
}
