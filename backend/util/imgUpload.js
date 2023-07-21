import multer from "multer";

// multer를 활용해 로컬에 이미지 저장
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Buffer.from(file.originalname, "latin1").toString("utf-8"));
  },
});

export const upload = multer({ storage });
