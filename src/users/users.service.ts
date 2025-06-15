import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    findByEmail(email: string) {
        throw new Error('Method not implemented.');
    }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

//backend for login

async create(dto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(dto.password, 10);
  const logDto = {
    username: dto.username,
    email: dto.email,
    password: hashedPassword,
  };
  console.log('New user input:', logDto);
  const user = this.userRepository.create({
    ...dto,
    password: hashedPassword,
  });
  await this.userRepository.save(user);
  const { email, username } = dto;
  return { message: `User registered: email=${email}, username=${username}` };
}

}
