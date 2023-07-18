import express from "express";
import db from "./util/database.js";

const app = express();
const port = 8800;

import cors from "cors";
app.use(cors()); // cors 미들웨어를 사용합니다.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get()을 사용하여 res(응답)에 data를 보내줌
app.get("/user/myinfo", async (req, res) => {
  // 쿼리 입력하여 에러가 없다면 res에게 data 전송
  const [data, headers] = await db.query("SELECT * FROM users");
  console.log(data);
  res.json(data);
});

// 회원가입
app.post("/user", (req, res) => {
  const { username, email, password } = req.body;

  // 이 부분에서 데이터베이스에 사용자 정보를 저장하는 로직을 작성합니다.
  // pool.query를 사용하여 데이터베이스에 INSERT 쿼리를 실행할 수 있습니다.

  // 예시: 사용자 정보를 삽입하는 쿼리
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  pool
    .query(query, [username, email, password])
    .then((result) => {
      res.json({
        success: true,
        message: "회원가입이 성공적으로 완료되었습니다.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "회원가입 중 오류가 발생하였습니다.",
      });
    });
});

// 로그인
app.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  // 이 부분에서 데이터베이스에 해당 사용자의 정보를 조회하고 비밀번호를 검증하는 로직을 작성합니다.
  // pool.query를 사용하여 데이터베이스에 SELECT 쿼리를 실행할 수 있습니다.

  // 예시: 사용자 정보를 조회하는 쿼리
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  pool
    .query(query, [email, password])
    .then((result) => {
      if (result.length > 0) {
        // 로그인 성공
        res.json({ success: true, message: "로그인 성공!" });
      } else {
        // 로그인 실패
        res.status(401).json({
          success: false,
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "로그인 중 오류가 발생하였습니다." });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
