import { repositoryCoupons } from './constants/constants';
import { Cupon } from './entities/cupon.entity';

export const cuponsProviders = [
  {
    provide: repositoryCoupons,
    useValue: Cupon,
  }
];