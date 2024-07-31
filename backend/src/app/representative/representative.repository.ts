import { repositoryRepresentative } from './constants/constants';
import { Representative } from './entities/representative.entity';

export const representativeProviders = [
  {
    provide: repositoryRepresentative,
    useValue: Representative,
  },
];