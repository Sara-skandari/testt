import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PaymentModule } from './modules/payment/payment.module';
import { LoadModule } from './modules/load/load.module';
import { ConfigModule } from '@nestjs/config';
import { connectionOptions } from './config/database.config';
import { AuthModule } from './modules/user/auth/auth.module';
import { ProfileModule } from './modules/user/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PaymentModule,
    LoadModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
