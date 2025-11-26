import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class BruteForceGuard implements CanActivate {
  private attempts = new Map<string, { count: number; resetAt: number }>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.connection.remoteAddress;
    const key = `${ip}:${request.path}`;

    const now = Date.now();
    const record = this.attempts.get(key);

    if (record && now > record.resetAt) {
      this.attempts.delete(key);
    }

    const current = this.attempts.get(key) || { count: 0, resetAt: now + 15 * 60 * 1000 };

    if (current.count >= 5) {
      throw new HttpException(
        'Too many failed attempts. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    current.count++;
    this.attempts.set(key, current);

    return true;
  }

  reset(ip: string, path: string) {
    const key = `${ip}:${path}`;
    this.attempts.delete(key);
  }
}
