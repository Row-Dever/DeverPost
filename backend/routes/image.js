import express from "express";
import { upload } from "../util/imgUpload.js";

const router = express.Router();

router.use("/", (req, res, next) => {
  next();
});

router.post("/upload", upload.single("file"), (req, res, next) => {
  res.status(200).json({
    statusCode: 200,
    message: "성공적으로 이미지가 업로드 되었습니다.",
    data: req.file,
  });
});

export default router;
