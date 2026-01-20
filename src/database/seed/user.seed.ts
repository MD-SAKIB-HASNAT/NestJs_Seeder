import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { User } from '../entity/user.enity';

@Injectable()
export class UserSeed implements Seeder {
  constructor(private readonly dataSource: DataSource) {}

  async seed(): Promise<any> {
    const repository = this.dataSource.getRepository(User);

    const users = DataFactory.createForClass(User).generate(5);

    return repository.save(users);
  }

  async drop(): Promise<any> {
    return this.dataSource.getRepository(User).clear();
  }
}
