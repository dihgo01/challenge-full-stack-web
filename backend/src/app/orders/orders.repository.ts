import { repositoryOrders, repositoryOrdersProducts } from './constants/constants';
import { OrderProduct } from './entities/order-product.entity';
import { Order } from './entities/order.entity';

export const orderProviders = [
  {
    provide: repositoryOrders,
    useValue: Order,
  }
];

export const orderProductsProviders = [
  {
    provide: repositoryOrdersProducts,
    useValue: OrderProduct,
  }
];