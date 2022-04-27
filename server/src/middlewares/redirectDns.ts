import { Request, Response, NextFunction } from "express";
import { config } from "../index";

const redirectDns = (req: Request, res: Response, next: NextFunction) => {
  if (!config.debug && req.hostname !== config.hostname)
    res.redirect(`https://${config.hostname}${req.url}`);
  else next();
};

export default redirectDns;
