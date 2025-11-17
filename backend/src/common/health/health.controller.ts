import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator, HttpHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.mongoose.pingCheck('mongodb'),
      () => this.http.pingCheck('stripe', 'https://api.stripe.com/v1'),
    ]);
  }

  @Get('ready')
  ready() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'SHIROA Backend',
      version: process.env.npm_package_version || '1.0.0',
    };
  }
}