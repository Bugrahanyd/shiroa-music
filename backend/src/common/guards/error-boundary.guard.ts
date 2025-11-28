import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../logger.service';

@Injectable()
export class ErrorBoundaryGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      
      if (!request.headers['content-type'] && request.method !== 'GET') {
        this.logger.warn(`Missing content-type header for ${request.method} ${request.url}`);
      }

      return true;
    } catch (error) {
      this.logger.error('Error in ErrorBoundaryGuard', error.stack, 'ErrorBoundaryGuard');
      return false;
    }
  }
}
