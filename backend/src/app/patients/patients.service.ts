import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { repositoryPatient } from './constants/constants';
import { Patient } from './entities/patient.entity';
import { Op } from 'sequelize';
import { Tag } from '../tags/entities/tag.entity';
import { Doctor } from '../doctor/entities/doctor.entity';

@Injectable()
export class PatientsService {
  constructor(
    @Inject(repositoryPatient)
    private patientRepository: typeof Patient,
  ) { }

  async create(createPatientDto: CreatePatientDto) {

    const Patient = await this.patientRepository.create(createPatientDto);

    return Patient;
  }

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: Patient[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const patients = await this.patientRepository.findAndCountAll({
      where: where,
      include: [{ model: Tag, as: 'tag' }, { model: Doctor, as: 'doctor'}],
      limit: pageSize,
      offset,
    });

    return {
      data: patients.rows,
      totalItems: patients.count,
    };
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findByPk(id,{
      include: [{ model: Tag, as: 'tag' }, { model: Doctor, as: 'doctor'}]
    });

    if (!patient)
      throw new NotFoundException('Patient not found');

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
   
    const patient_update = await patient.update(updatePatientDto);

    return patient_update;
  }

  async remove(id: string) {
    const patient = await this.findOne(id);

    const delete_Patient = await this.patientRepository.destroy({
      where: { id: patient.id }
    });

    return delete_Patient;
  }
}
