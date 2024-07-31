import { repositoryReports } from './constants/constants';
import { Report } from './entities/report.entity';

export const reportProviders = [
  {
    provide: repositoryReports,
    useValue: Report,
  }
];