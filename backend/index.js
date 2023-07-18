import express from "express";
import db from "./util/database.js";

const app = express();
const port = 8800;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get()을 사용하여 res(응답)에 data를 보내줌
app.get("/user/myinfo", async (req, res) => {
  // 쿼리 입력하여 에러가 없다면 res에게 data 전송
  const [data, headers] = await db.query("SELECT * FROM users");
  console.log(data);
  res.json(data);
});

// app.post("/api/user", function (req, res) {
//   var user = {
//     userid: req.body.userid,
//     name: req.body.name,
//     address: req.body.address,
//   };
//   var query = database.query(
//     "insert into users set ?",
//     user,
//     function (err, result) {
//       if (err) {
//         console.error(err);
//         throw err;
//       }
//       res.status(200).send("success");
//     }
//   );
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
