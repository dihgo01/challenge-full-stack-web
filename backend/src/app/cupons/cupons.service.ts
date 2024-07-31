import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { repositoryCoupons } from './constants/constants';
import { Cupon } from './entities/cupon.entity';
import { Op } from 'sequelize';

@Injectable()
export class CuponsService {
  constructor(
    @Inject(repositoryCoupons)
    private cuponsRepository: typeof Cupon,
  ) { }

  async create(createCuponDto: CreateCuponDto) {
    const cupon = await this.cuponsRepository.create(createCuponDto);

    return cupon;
  }

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: Cupon[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const cupons = await this.cuponsRepository.findAndCountAll({
      where: where,
      limit: pageSize,
      offset,
    });

    return {
      data: cupons.rows,
      totalItems: cupons.count,
    };
  }

  async findOne(id: string) {
    const cupon = await this.cuponsRepository.findByPk(id);

    if (!cupon)
      throw new NotFoundException('Cupon not found');

    return cupon;
  }

  async update(id: string, updateCuponDto: UpdateCuponDto) {
    const cupon = await this.findOne(id);
   
    const cupon_update = await cupon.update(updateCuponDto);

    return cupon_update;
  }

  async remove(id: string) {
    const cupon = await this.findOne(id);

    const delete_cupon = await this.cuponsRepository.destroy({
      where: { id: cupon.id }
    });

    return delete_cupon;
  }
}
