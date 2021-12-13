import { Module } from '@nestjs/common';
import { NewLoadModule } from '../new-load/new-load.module';
import { CompanyLoadModule } from './company-load/company-load.module';

@Module({
  imports: [NewLoadModule, CompanyLoadModule],
})
export class LoadModule {}
