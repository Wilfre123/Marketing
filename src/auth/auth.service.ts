import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity'; // adjust path if needed
import { Auth1 } from './auth.entity'; 

@Injectable()
export class AuthService {
  authRepository: any;
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
  
   @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Auth1)
    private readonly authRepository2: Repository<Auth1>,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) return false;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }

 async getAllUsers(): Promise<Auth1[]> {
    return this.userRepository.find();
  }
  
}
