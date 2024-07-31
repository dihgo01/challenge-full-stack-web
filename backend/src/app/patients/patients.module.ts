import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { patientProviders } from './patient.repository';

@Module({
  controllers: [PatientsController],
  providers: [
    PatientsService,
    ...patientProviders
  ],
})
export class PatientsModule {}
