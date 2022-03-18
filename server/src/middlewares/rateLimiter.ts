import { Request, Response, NextFunction } from "express";
import { config, cache } from "../index";

const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const remainingRequests = cache.rateLimits.get(req.ip);

  if (remainingRequests) {
    if (remainingRequests >= config.requestLimitPerMinute) {
      const warnSentCount = remainingRequests - config.requestLimitPerMinute;

      if (warnSentCount >= 10) {
        res.destroy();
        return;
      }

      res
        .type("text/plain")
        .status(429)
        .end(
          "We have received too many requests from your IP address, please wait a while to make another request again."
        );

      cache.rateLimits.set(req.ip, remainingRequests + 1);

      return;
    }

    cache.rateLimits.set(req.ip, remainingRequests + 1);

    next();
  } else {
    cache.rateLimits.set(req.ip, 1);

    setTimeout(() => {
      cache.rateLimits.delete(req.ip);
    }, 10 * 1000);

    next();
  }
};

export default rateLimiter;
