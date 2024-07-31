import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, DefaultValuePipe, ParseIntPipe, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { OrderCollectionPresenter, OrderPresenter } from './orders.presenter';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto)
    return new OrderPresenter(order);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const order = await this.ordersService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(order.totalItems / pageSize),
      total: order.totalItems,
    };

    return new OrderCollectionPresenter({ data: order.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);

    return new OrderPresenter(order);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersService.update(id, updateOrderDto);
    return new OrderPresenter(order);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
