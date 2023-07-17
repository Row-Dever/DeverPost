import Posts from "../models/postsModel.js";

export const getPosts = (req, res, next) => {
  // 15
  const { limit, skip } = req.query;

  let start = 0;
  console.log(skip);
  if (skip <= 0) {
    start = 1;
  } else {
    start = (skip - 1) * limit;
  }

  console.log(start);

  Posts.fetchAll(limit, String(start))
    .then(([rows, fieldData]) => {
      res.status(200).json(rows);
    })
    .catch((err) => console.log(err));
};

export const addPost = (req, res, next) => {
  const { title, description, imgSrc, category, userName, userId } = req.body;

  const post = new Posts(
    title,
    description,
    imgSrc,
    category,
    userName,
    userId
  );

  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "데이터 저장",
        post: post,
      });
    })
    .catch((error) => console.log(error));
};

export const getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const [rows, fieldData] = await Posts.findById(postId);
    const [data] = rows;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const delPost = async (req, res, next) => {
  const postId = req.params.postId;
  await Posts.deleteById(postId);
  res.status(200).json({
    message: "데이터가 성공적으로 삭제되었습니다.",
  });
};

export const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const { title, description } = req.body;
  await Posts.updateById(postId, title, description);

  res.status(200).json({
    message: "데이터가 성공적으로 변경되었습니다.",
  });
};
