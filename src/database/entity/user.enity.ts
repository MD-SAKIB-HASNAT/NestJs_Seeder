import type { Faker } from '@faker-js/faker';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory((faker?: Faker) => faker?.person.fullName() ?? 'Test User')
  @Column()
  name: string;

  @Factory((faker?: Faker) => faker?.internet.email() ?? 'user@example.com')
  @Column({ unique: true })
  email: string;

  @Factory(() => '123456')
  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
