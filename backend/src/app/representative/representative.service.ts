import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';
import { Representative } from './entities/representative.entity';
import { repositoryRepresentative } from './constants/constants';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RepresentativeService {
  constructor(
    @Inject(repositoryRepresentative)
    private representativesRepository: typeof Representative,
  ) { }

  async create(createRepresentativeDto: CreateRepresentativeDto) {
    const user_id = uuidv4();
    const user = new User({
      id: user_id,
      name: createRepresentativeDto.name,
      email: createRepresentativeDto.email,
      type: 'Representante',
      password: createRepresentativeDto.password,
    });

    const representative = await this.representativesRepository.create({
      name: createRepresentativeDto.name,
      type_person: createRepresentativeDto.type_person,
      social_reason: createRepresentativeDto.social_reason,
      cnpj: createRepresentativeDto.cnpj,
      user_id: user_id,
      user: user,
      cpf: createRepresentativeDto.cpf,
      telephone: createRepresentativeDto.telephone,
      mobile: createRepresentativeDto.mobile,
      zip_code: createRepresentativeDto.zip_code,
      address: createRepresentativeDto.address,
      address_number: createRepresentativeDto.address_number,
      complement: createRepresentativeDto.complement,
      district: createRepresentativeDto.district,
      city: createRepresentativeDto.city,
      state: createRepresentativeDto.state,
      country: createRepresentativeDto.country,
      observation: createRepresentativeDto.observation,
    }, {
      include: [
        { model: User, as: 'user' }
      ]
    });

    return representative;
  }

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: Representative[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const Representatives = await this.representativesRepository.findAndCountAll({
      where: where,
      include: [{ model: User, as: 'user' }],
      limit: pageSize,
      offset,
    });

    return {
      data: Representatives.rows,
      totalItems: Representatives.count,
    };
  }

  async findOne(id: string) {
    const Representative = await this.representativesRepository.findByPk(id,{
      include: [{ model: User, as: 'user' }]
    });

    if (!Representative)
      throw new NotFoundException('Representative not found');

    return Representative;
  }

  async update(id: string, updateRepresentativeDto: UpdateRepresentativeDto) {
    const representative = await this.findOne(id);
 
    await representative.user.update({
      name: updateRepresentativeDto.name,
      email: updateRepresentativeDto.email,
    });

    const representative_update = await representative.update({
      name: updateRepresentativeDto.name,
      type_person: updateRepresentativeDto.type_person,
      social_reason: updateRepresentativeDto.social_reason,
      cnpj: updateRepresentativeDto.cnpj,
      cpf: updateRepresentativeDto.cpf,
      telephone: updateRepresentativeDto.telephone,
      mobile: updateRepresentativeDto.mobile,
      zip_code: updateRepresentativeDto.zip_code,
      address: updateRepresentativeDto.address,
      address_number: updateRepresentativeDto.address_number,
      complement: updateRepresentativeDto.complement,
      district: updateRepresentativeDto.district,
      city: updateRepresentativeDto.city,
      state: updateRepresentativeDto.state,
      country: updateRepresentativeDto.country,
      observation: updateRepresentativeDto.observation,
    });

    return representative_update;
  }

  async remove(id: string) {
    const representative = await this.findOne(id);
    
    representative.user.destroy();

    const delete_representative = await this.representativesRepository.destroy({
      where: { id: representative.id }
    });

    return delete_representative;
  }
}
