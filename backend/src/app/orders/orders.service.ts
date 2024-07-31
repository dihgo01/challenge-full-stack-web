import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Op } from 'sequelize';
import { repositoryOrders, repositoryOrdersProducts } from './constants/constants';
import { Order } from './entities/order.entity';
import { v4 as uuidv4 } from 'uuid';
import { OrderProduct } from './entities/order-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(repositoryOrders)
    private ordersRepository: typeof Order,
    @Inject(repositoryOrdersProducts)
    private ordersProductsRepository: typeof OrderProduct,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const code = uuidv4();
    const order = await this.ordersRepository.create({
      code_order: code,
      patient_id: createOrderDto.patient_id,
      doctor_id: createOrderDto.doctor_id,
      subtotal_price: createOrderDto.subtotal_price,
      total_price: createOrderDto.total_price,
      discount_value: createOrderDto.discount_value,
      type_discount: createOrderDto.type_discount,
      send_kit: createOrderDto.send_kit,
      url_csv: createOrderDto.url_csv,
      status_order: 'Pendente'
    });

    for (const product of createOrderDto.products) {
      await this.ordersProductsRepository.create({
        order_id: order.id,
        report_id: product.product_id,
      });
    }

    return order;
  }

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: Order[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const orders = await this.ordersRepository.findAndCountAll({
      where: where,
      include: [
        {
          model: OrderProduct,
          as: 'products',
         
        }
      ],
      limit: pageSize,
      offset,
    });

    return {
      data: orders.rows,
      totalItems: orders.count,
    };
  }

  async findOne(id: string) {
    const order = await this.ordersRepository.findByPk(id, {
      include: [
        {
          model: OrderProduct,
          as: 'products',
         
        }
      ]

    });

    if (!order)
      throw new NotFoundException('Order not found');

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    const order_update = await order.update({
      patient_id: updateOrderDto.patient_id,
      doctor_id: updateOrderDto.doctor_id,
      subtotal_price: updateOrderDto.subtotal_price,
      total_price: updateOrderDto.total_price,
      discount_value: updateOrderDto.discount_value,
      type_discount: updateOrderDto.type_discount,
      send_kit: updateOrderDto.send_kit,
      url_csv: updateOrderDto.url_csv,
      status_order: updateOrderDto.status_order
    });

    return order_update;
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    for (const product of order.products) {
      await product.destroy();
    }

    const delete_order = await this.ordersRepository.destroy({
      where: { id: order.id }
    });

    return delete_order;
  }
}
