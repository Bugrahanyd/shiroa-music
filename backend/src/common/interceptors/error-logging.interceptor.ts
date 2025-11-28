import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../logger.service';

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        const request = context.switchToHttp().getRequest();
        
        this.logger.error(
          `Error in ${request.method} ${request.url}`,
          err.stack,
          'ErrorLoggingInterceptor'
        );

        return throwError(() => err);
      })
    );
  }
}
