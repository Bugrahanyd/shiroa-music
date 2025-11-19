import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppSimpleController {
  @Get()
  getHello(): string {
    return 'SHIROA API - Simple Mode';
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', mode: 'simple' };
  }
}
