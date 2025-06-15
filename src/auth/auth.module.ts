import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/users.entity'; // keep if needed
import { Auth1 } from './auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auth1]), // 👈 Register both User and Auth if both are needed
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

