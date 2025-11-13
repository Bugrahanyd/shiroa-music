import { Controller, Get, Patch, Body, UseGuards, Req, Post, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmailService } from '../email/email.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService
  ) {}

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.usersService.verifyEmail(token);
    return { message: 'Email verified successfully', user };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const token = await this.usersService.createPasswordResetToken(email);
    await this.emailService.sendPasswordResetEmail(email, token);
    return { message: 'Password reset email sent' };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    await this.usersService.resetPassword(body.token, body.password);
    return { message: 'Password reset successfully' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req: any, @Body() updateData: { name?: string; email?: string }) {
    return this.usersService.updateProfile(req.user.userId, updateData);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@Req() req: any, @UploadedFile() file: any) {
    const avatarUrl = await this.usersService.uploadAvatar(req.user.userId, file);
    return { avatarUrl };
  }
}
