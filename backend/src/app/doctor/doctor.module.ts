import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { doctorProviders, doctorReportProductProviders } from './doctor.repository';
import { UsersModule } from '../users/users.module';
import { usersProviders } from '../users/user.repository';

@Module({
    imports: [ UsersModule],
    controllers: [DoctorController],
    providers: [
      DoctorService,
      ...doctorProviders,
      ...doctorReportProductProviders,
      ...usersProviders
    ],
    exports: [DoctorService, ...doctorProviders],
  })
export class DoctorModule {}
