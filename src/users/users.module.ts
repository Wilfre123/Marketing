import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
   controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Optional: only needed if used in another module
})
export class UsersModule {} // ✅ Make sure this is exported
