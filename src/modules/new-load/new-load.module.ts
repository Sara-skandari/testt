import { Module } from '@nestjs/common';
import { NewLoadService } from './new-load.service';

@Module({
  providers: [NewLoadService],
})
export class NewLoadModule {}
