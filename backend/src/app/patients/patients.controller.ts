import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { PatientCollectionPresenter, PatientPresenter } from './patient.presenter';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.patientsService.create(createPatientDto)
    return new PatientPresenter(patient);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const patient = await this.patientsService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(patient.totalItems / pageSize),
      total: patient.totalItems,
    };

    return new PatientCollectionPresenter({ data: patient.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const Patient = await this.patientsService.findOne(id);

    return new PatientPresenter(Patient);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientsService.update(id, updatePatientDto);
    return new PatientPresenter(patient);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
