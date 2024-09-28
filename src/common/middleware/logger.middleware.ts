import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function httpLogger(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('HTTP');

  const {
    method,
    originalUrl,
    query: { page, limit },
  } = req;
  const startTime = Date.now();

  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    const { statusCode } = res;
    logger.log(`${method} ${originalUrl} ${statusCode} - ${responseTime}ms`);
  });

  next();
}
