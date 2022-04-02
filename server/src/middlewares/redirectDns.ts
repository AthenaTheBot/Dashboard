import { Request, Response, NextFunction } from "express";
import { config } from "../index";

const redirectDns = (req: Request, res: Response, next: NextFunction) => {
  const isPureIp = !isNaN(req?.hostname.replaceAll(".", "") as any);

  if (isPureIp && !config.debug)
    res.redirect(`https://${config.hostname}${req.url}`);
  else next();
};

export default redirectDns;
