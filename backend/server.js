import express from "express";
import path from "path";
import postRouter from "./routes/posts.js";
import imageRouter from "./routes/image.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = 8800;

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
app.use("/image", imageRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`서버 localhost: ${port} 접속중..`);
});
