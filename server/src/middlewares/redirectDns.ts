import { Request, Response, NextFunction } from "express";
import { hostname } from "os";

const redirectDns = (req: Request, res: Response, next: NextFunction) => {
  const isPureIp = !isNaN(req?.hostname.replaceAll(".", "") as any);

  if (isPureIp) res.redirect(`https://${hostname()}${req.url}`);
  else next();
};

export default redirectDns;
