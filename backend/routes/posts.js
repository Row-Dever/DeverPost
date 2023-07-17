import express from "express";
import {
  getPosts,
  addPost,
  getPost,
  delPost,
  updatePost,
} from "../controllers/postsController.js";

const router = express.Router();

router.use("/", (req, res, next) => {
  console.log("Post Router!!!!");
  next();
});

// /post
router.get("/", getPosts);

// /post
router.post("/", addPost);

// /post/:postId
router.get("/:postId", getPost);

// /post/postId
router.put("/:postId", updatePost);

// /post/:postId
router.delete("/:postId", delPost);

export default router;
