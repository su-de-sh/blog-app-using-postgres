const { SEKRET } = require("./config");
const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else response.send({ error: "missing authorization token" });
  // console.log(request.token);
  next();
};

const userExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(request.token, SEKRET);

    if (!decodedToken.id) {
      response.status(401).json({ error: "token missing or invalid" });
    }
    request.user = decodedToken;
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "SequelizeValidationError") {
    return response.status(401).json({
      error: error.errors[0].message,
    });
  } else if (error.name === "TypeError") {
    return response.status(401).json({
      error: error.message,
    });
  } else return response.status(404).json({ error: error });

  // console.log(error.message);

  // next(error);
};
// this has to be the last loaded middleware.
module.exports = { errorHandler, tokenExtractor, userExtractor };
