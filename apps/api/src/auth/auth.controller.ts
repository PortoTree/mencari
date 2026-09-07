import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('check-username')
  async checkUsername(@Query('username') username: string) {
    return this.authService.checkUsername(username);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('verify')
  async verifyOtp(@Body() body: any) {
    return this.authService.verifyOtp(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }
}
