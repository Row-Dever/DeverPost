import express from "express";
import path from "path";
import postRouter from "./routes/posts.js";
import db from "./util/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import imageRouter from "./routes/image.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = 8800;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const jwtKey = "abc1234567";

const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// images폴더를 외부로 노출시키기 위해 작성된 미들웨어
app.use("/", express.static(path.join(__dirname, "/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/post", postRouter);
// app.use("/users/info", users);
app.use("/image", imageRouter);

app.use(errorHandler);

// 사용자 정보 조회
app.get("/user/myinfo", async (req, res) => {
  try {
    const query = "SELECT username, email, telephone FROM users WHERE id = ?"; // 현재 로그인한 사용자의 id에 해당하는 정보만 조회
    const [result, fields] = await db.query(query, [req.userId]); // req.userId는 로그인 시 저장한 토큰의 사용자 id
    if (result.length > 0) {
      res.json({ success: true, data: result[0] });
    } else {
      res
        .status(404)
        .json({ success: false, message: "사용자 정보를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("에러:", error);
    res.status(500).json({
      success: false,
      message: "사용자 정보를 가져오는 중 오류가 발생하였습니다.",
    });
  }
});

// 회원가입
app.post("/user", async (req, res) => {
  const { username, email, password, telephone } = req.body;

  try {
    // 데이터베이스에 사용자 정보를 저장하는 로직
    // db.query를 사용하여 데이터베이스에 INSERT 쿼리를 실행
    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // 사용자 정보를 삽입하는 쿼리
    const query =
      "INSERT INTO users (username, email, password, telephone) VALUES (?, ?, ?, ?)";
    const result = db.query(query, [
      username,
      email,
      hashedPassword,
      telephone,
    ]);

    res.json({
      success: true,
      message: "회원가입이 성공적으로 완료되었습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "회원가입 중 오류가 발생하였습니다.",
    });
  }
});

//로그인
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [result, fields] = await db.query(query, [email]);
    console.log(result);
    if (result.length > 0) {
      const user = result[0];
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        // 로그인 성공 시 토큰 발행 및 데이터베이스에 저장
        const accessToken = jwt.sign({ id: user.id }, jwtKey, {
          expiresIn: "1s",
        });
        const refreshToken = jwt.sign({ id: user.id }, jwtKey, {
          expiresIn: "7d",
        });

        // 토큰 정보를 데이터베이스에 저장
        const insertTokenQuery =
          "INSERT INTO tokens (id, access_token, refresh_token) VALUES (?, ?, ?)";
        await db.query(insertTokenQuery, [user.id, accessToken, refreshToken]);

        res.json({
          success: true,
          message: "로그인 성공!",
          accessToken,
          refreshToken,
          user,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "이메일 또는 비밀번호가 일치하지 않습니다.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "로그인 중 오류가 발생하였습니다.",
    });
  }
});

// 에러 핸들러를 추가합니다.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "서버에서 오류가 발생했습니다.",
  });
});

app.listen(port, () => {
  console.log(`서버 localhost: ${port} 접속중..`);
});

// 데이터베이스에서 사용자 데이터를 가져오는 헬퍼 함수
function getUserById(userId) {
  // 데이터베이스에서 사용자 데이터를 가져오는 자체 로직으로 대체하세요.
  // 'users' 배열이 있다고 가정한 예시 구현
  return users.find((user) => user.id === userId);
}
