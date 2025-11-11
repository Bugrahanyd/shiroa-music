import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  @Patch('profile')
  async updateProfile(@Req() req: any, @Body() updateData: { name?: string; email?: string }) {
    return this.usersService.updateProfile(req.user.userId, updateData);
  }
}
