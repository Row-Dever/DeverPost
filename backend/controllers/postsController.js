import Posts from "../models/postsModel.js";

export const getPosts = (req, res, next) => {
  const { limit, cursorId } = req.query;
  let nextCursor;

  Posts.fetchData(limit, Number(cursorId))
    .then(([rows, fieldData]) => {
      nextCursor =
        rows.length === Number(limit) ? rows[rows.length - 1].id : null;
      res.status(200).json({
        statsCode: 200,
        message: "데이터를 성공적으로 가져왔습니다.",
        data: rows,
        nextCursor,
      });
    })
    .catch((err) => next(err));
};

export const addPost = (req, res, next) => {
  const { title, content, category, userId } = req.body;
  const imgReg = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;
  let imgSrc = imgReg.exec(content);
  console.log(imgSrc);
  if (imgSrc) {
    imgSrc = imgSrc[1];
  } else {
    imgSrc = null;
  }
  const post = new Posts(title, content, category, userId, imgSrc);

  post
    .save()
    .then(() => {
      res.status(201).json({
        statsCode: 201,
        message: "데이터 저장이 완료되었습니다.",
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
    statsCode: 200,
    message: "데이터가 성공적으로 삭제되었습니다.",
  });
};

export const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const { title, content, category } = req.body;
  const imgReg = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;
  let imgSrc = imgReg.exec(content);
  console.log(imgSrc);
  if (imgSrc) {
    imgSrc = imgSrc[1];
  } else {
    imgSrc = null;
  }
  await Posts.updateById(postId, title, content, category, imgSrc);

  res.status(200).json({
    statsCode: 200,
    message: "데이터가 성공적으로 변경 되었습니다.",
  });
};
