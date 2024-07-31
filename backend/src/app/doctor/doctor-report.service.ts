import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { repositoryDoctor } from './constants/constants';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DoctorReportService {
  constructor(
    @Inject(repositoryDoctor)
    private doctorsRepository: typeof Doctor,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {
    const user_id = uuidv4();
    const user = new User({
      id: user_id,
      name: createDoctorDto.name,
      email: createDoctorDto.email,
      type: 'Médico',
      password: createDoctorDto.password,
    });
    
    const doctor = await this.doctorsRepository.create({
      name: createDoctorDto.name,
      type_person: createDoctorDto.type_person,
      social_reason: createDoctorDto.social_reason,
      cnpj: createDoctorDto.cnpj,
      user_id: user_id,
      user: user,
      representative_id: createDoctorDto.representative_id,
      cpf: createDoctorDto.cpf,
      telephone: createDoctorDto.telephone,
      mobile: createDoctorDto.mobile,
      profession: createDoctorDto.profession,
      zip_code: createDoctorDto.zip_code,
      address: createDoctorDto.address,
      address_number: createDoctorDto.address_number,
      complement: createDoctorDto.complement,
      district: createDoctorDto.district,
      city: createDoctorDto.city,
      state: createDoctorDto.state,
      country: createDoctorDto.country,
      observation: createDoctorDto.observation,
    }, {
      include: [
        { model: User, as: 'user' }
      ]
    });

    return doctor;
  }

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: Doctor[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const doctors = await this.doctorsRepository.findAndCountAll({
      where: where,
      include: [{ model: User, as: 'user' }],
      limit: pageSize,
      offset,
    });

    return {
      data: doctors.rows,
      totalItems: doctors.count,
    };
  }

  async findOne(id: string) {
    const doctor = await this.doctorsRepository.findByPk(id,{
      include: [{ model: User, as: 'user' }]
    });

    if (!doctor)
      throw new NotFoundException('Doctor not found');

    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);
   
    await doctor.user.update({
      name: updateDoctorDto.name,
      email: updateDoctorDto.email,
    });

    const doctor_update = await doctor.update({
      name: updateDoctorDto.name,
      representative_id: updateDoctorDto.representative_id,
      type_person: updateDoctorDto.type_person,
      social_reason: updateDoctorDto.social_reason,
      cnpj: updateDoctorDto.cnpj,
      cpf: updateDoctorDto.cpf,
      telephone: updateDoctorDto.telephone,
      mobile: updateDoctorDto.mobile,
      profession: updateDoctorDto.profession,
      zip_code: updateDoctorDto.zip_code,
      address: updateDoctorDto.address,
      address_number: updateDoctorDto.address_number,
      complement: updateDoctorDto.complement,
      district: updateDoctorDto.district,
      city: updateDoctorDto.city,
      state: updateDoctorDto.state,
      country: updateDoctorDto.country,
      observation: updateDoctorDto.observation,
    });

    return doctor_update;
  }

  async remove(id: string) {
    const doctor = await this.findOne(id);

    await doctor.user.destroy();

    const delete_doctor = await this.doctorsRepository.destroy({
      where: { id: doctor.id }
    });

    return delete_doctor;
  }
}
