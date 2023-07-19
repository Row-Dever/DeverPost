export const NotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.orginalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  console.log("ErrorHandler: " + err);
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "페이지를 찾을 수 없습니다.";
  }
  res.status(statusCode).json({ message: err.message });
};
