import { repositoryPatient } from './constants/constants';
import { Patient } from './entities/patient.entity';

export const patientProviders = [
  {
    provide: repositoryPatient,
    useValue: Patient,
  }
];