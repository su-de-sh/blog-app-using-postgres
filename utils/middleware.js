const errorHandler = (error, request, response, next) => {
    console.log("on error handler")
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
    }
    
     else if (error.name === "SequelizeValidationError") {
      return response.status(401).json({
        error: "Required data not entered",
      });
    }
     else if (error.name === "TypeError") {
      return response.status(401).json({
        error: "Data donot exists for given id",
      });
    }
    else return response.status(404).json({error: "unknown error"})
  
    // console.log(error.message);
  
    // next(error);
  };
  // this has to be the last loaded middleware.
 module.exports={errorHandler}