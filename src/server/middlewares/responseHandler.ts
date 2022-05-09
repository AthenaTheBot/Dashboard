import { Request, Response, NextFunction } from "express";

const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const badRequest = (data: object) => {
    res
      .status(400)
      .json({ message: "Bad Request", ...data })
      .end();
  };

  const unauthorized = (data: object) => {
    res
      .status(401)
      .json({
        message: "Unauthorized",
        ...data,
      })
      .end();
  };

  const notFound = (data: object) => {
    res
      .status(404)
      .json({
        messagea: "Not Found",
        ...data,
      })
      .end();
  };

  const serverError = (data: object) => {
    res
      .status(500)
      .json({ message: "Server Error", ...data })
      .end();
  };

  const successfull = (
    data: object = {
      message: "Successfull",
    }
  ) => {
    res.status(200).json(data).end();
  };

  Object.assign(res, {
    badRequest,
    unauthorized,
    notFound,
    serverError,
    successfull,
  });

  next();
};

export default responseHandler;
