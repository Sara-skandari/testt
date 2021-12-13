import { Module } from '@nestjs/common';
import { name } from 'src/modules/new-load/test';

@Module({})
export class PaymentModule {
  newTest() {
    const users = name;
    console.log(users);
  }
}
