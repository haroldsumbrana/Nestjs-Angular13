import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ResetModule } from './reset/reset.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestfirstdb',
      password: '123',
      database: 'nestfirstdb',
      autoLoadEntities: true,
      synchronize: true,
    }), AuthModule, ResetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
