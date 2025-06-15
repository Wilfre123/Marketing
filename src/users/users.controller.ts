// user.controller.ts
import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';


import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 @Get('test')
index() {
  return 'hello';
}

@Get()
landing() {
  const { exec } = require('child_process');
  const filePath = 'C:\\Users\\acer\\Desktop\\Marketing_application\\Client_side\\Marketing\\index.html';
  
  exec(`start "" "${filePath}"`, (error) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('HTML file opened successfully');
    }
  });
  return { message: 'Trying to open local HTML file...' }; 
}

// registration receiver

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
