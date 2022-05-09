import { Request, Response, NextFunction } from "express";

const authController = (req: Request, res: Response, next: NextFunction) => {
  const sessionCookie = req.signedCookies["session"];

  if (sessionCookie) next();
  else res.unauthorized();
};

export default authController;
