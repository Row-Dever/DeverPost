import express from "express";
import postRouter from "./routes/posts.js";
// import users from "./routes/users.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = 8800;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`서버 localhost: ${port} 접속중..`);
});
