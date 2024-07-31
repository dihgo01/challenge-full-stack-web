import { repositoryDoctor, repositoryDoctorReportProduct } from './constants/constants';
import { DoctorReport } from './entities/doctor-reports.entity';
import { Doctor } from './entities/doctor.entity';

export const doctorProviders = [
  {
    provide: repositoryDoctor,
    useValue: Doctor,
  }
];

export const doctorReportProductProviders = [
  {
    provide: repositoryDoctorReportProduct,
    useValue: DoctorReport,
  }
];