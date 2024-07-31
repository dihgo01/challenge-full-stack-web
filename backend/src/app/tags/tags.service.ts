import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { repositoryTag } from './constants/constants';
import { Tag } from './entities/tag.entity';
import { Op } from 'sequelize';
import { Doctor } from '../doctor/entities/doctor.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject(repositoryTag)
    private tagsRepository: typeof Tag,
  ) { }

  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagsRepository.create(createTagDto);

    return tag;
  }

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: Tag[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const tags = await this.tagsRepository.findAndCountAll({
      where: where,
      include: [{ model: Doctor, as: 'doctor' }],
      limit: pageSize,
      offset,
    });

    return {
      data: tags.rows,
      totalItems: tags.count,
    };
  }

  async findOne(id: string) {
    const tag = await this.tagsRepository.findByPk(id,{
      include: [{ model: Doctor, as: 'doctor' }]
    });

    if (!tag)
      throw new NotFoundException('Tag not found');

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
   
    const tag_update = await tag.update(updateTagDto);

    return tag_update;
  }

  async remove(id: string) {
    const tag = await this.findOne(id);

    const delete_tag = await this.tagsRepository.destroy({
      where: { id: tag.id }
    });

    return delete_tag;
  }
}
