import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { CuponCollectionPresenter, CuponPresenter } from './cupons.presenter';

@Controller('cupons')
export class CuponsController {
  constructor(private readonly cuponsService: CuponsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCuponDto: CreateCuponDto) {
    const cupon = await this.cuponsService.create(createCuponDto)
    return new CuponPresenter(cupon);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const cupon = await this.cuponsService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(cupon.totalItems / pageSize),
      total: cupon.totalItems,
    };

    return new CuponCollectionPresenter({ data: cupon.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cupon = await this.cuponsService.findOne(id);

    return new CuponPresenter(cupon);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCuponDto: UpdateCuponDto) {
    const cupon = await this.cuponsService.update(id, updateCuponDto);
    return new CuponPresenter(cupon);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.cuponsService.remove(id);
  }
}
