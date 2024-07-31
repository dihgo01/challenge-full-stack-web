import { repositoryTag } from './constants/constants';
import { Tag } from './entities/tag.entity';

export const tagProviders = [
  {
    provide: repositoryTag,
    useValue: Tag,
  }
];