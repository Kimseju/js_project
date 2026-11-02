// 서버 켜고 주소별로 나눠줌
//  - POST /          -> 인스타 (index.js 의 main)
//  - GET  /fighter   -> 선수 조회 (fighter.js)

import http from "node:http";
import { main } from "./index.js";
import { handleFighter } from "./fighter.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const { pathname, searchParams } = new URL(req.url, "http://localhost");

  if (req.url === "/" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        await main(body);

        res.statusCode = 200;
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error("에러 발생:", err);
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else if (pathname === "/fighter" && req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    handleFighter(searchParams, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "존재하지 않는 경로입니다." }));
  }
});

server.listen(3000, () => { });
