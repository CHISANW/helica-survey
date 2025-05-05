// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress;
    const { method, originalUrl } = req;

    this.logger.log(`[${method}] ${originalUrl} - from IP: ${ip}`);

    next();
  }
}
