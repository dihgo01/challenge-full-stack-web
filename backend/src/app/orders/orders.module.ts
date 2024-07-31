import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { orderProductsProviders, orderProviders } from './orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ...orderProviders,
    ...orderProductsProviders,
  ],
})
export class OrdersModule {}
