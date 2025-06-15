import { Controller, Post, Body, UnauthorizedException, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const isValid = await this.authService.validateUser(email, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Login successful' };
  }

  @Get('display')
  async displayUsers() {
    return this.authService.getAllUsers();  // returns array of user objects
  }

}
