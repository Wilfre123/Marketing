// auth/auth.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth') // match your table name
export class Auth1 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
