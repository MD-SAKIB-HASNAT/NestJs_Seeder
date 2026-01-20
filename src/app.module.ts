import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.PSQL_READ_DB_HOST,
      port: parseInt(process.env.PSQL_DB_PORT!) || 5432,
      username: process.env.PSQL_DB_USERNAME,
      password: process.env.PSQL_DB_PASSWORD,
      database: process.env.PSQL_DB_DATABASE,
      entities: [__dirname + '/**/database/entity/*.ts'],
      synchronize: process.env.PSQL_DB_SYNCHRONIZE === 'true',
    }
  ),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
