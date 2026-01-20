import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeed } from './seed/user.seed';
import { User } from './entity/user.enity';
import { ConfigModule } from '@nestjs/config';
import { OrderSeed } from './seed/order.seed';
import { ProductSeed } from './seed/product.seed';
import { Order } from './entity/order.entity';
import { Product } from './entity/product.entity';

seeder({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PSQL_READ_DB_HOST ?? 'localhost',
      port: Number(process.env.PSQL_DB_PORT) || 5432,
      username: process.env.PSQL_DB_USERNAME ?? 'postgres',
      password: String(process.env.PSQL_DB_PASSWORD ?? ''),
      database: process.env.PSQL_DB_DATABASE ?? 'postgres',
      entities: [User, Product, Order],
      synchronize: process.env.PSQL_DB_SYNCHRONIZE !== 'false', // auto-create tables during seeding
    }),
    TypeOrmModule.forFeature([User, Product, Order]),
  ],
})

.run([
  UserSeed,
  ProductSeed,
  OrderSeed,
]);