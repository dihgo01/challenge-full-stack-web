import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { reportProviders } from './report.repository';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ...reportProviders],
})
export class ReportsModule { }
