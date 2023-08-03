import jwt from "jsonwebtoken";
import { jwtKey } from "../server.js";

const authChecker = (req, res, next) => {
  console.log("authCheck");
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token);
    jwt.verify(token, jwtKey, (err) => {
      if (err) {
        res
          .status(401)
          .json({ statusCode: 401, message: "토큰이 만료되었습니다." });
      } else {
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ statusCode: 401, message: "유효하지 않은 토큰입니다." });
  }
};

export default authChecker;
