import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorCollectionPresenter, DoctorPresenter } from './doctor.presenter';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { AuthGuard } from '@nestjs/passport';
import { DoctorReportService } from './doctor-report.service';

@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly DoctorService: DoctorService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const Doctor = await this.DoctorService.create(createDoctorDto)
    return new DoctorPresenter(Doctor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const Doctor = await this.DoctorService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(Doctor.totalItems / pageSize),
      total: Doctor.totalItems,
    };

    return new DoctorCollectionPresenter({ data: Doctor.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const Doctor = await this.DoctorService.findOne(id);

    return new DoctorPresenter(Doctor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    const Doctor = await this.DoctorService.update(id, updateDoctorDto);
    return new DoctorPresenter(Doctor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.DoctorService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('doctor-product')
  async createDoctorProduct(@Body() createDoctorDto: CreateDoctorDto) {
    const Doctor = await this.DoctorService.create(createDoctorDto)
    return new DoctorPresenter(Doctor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('doctor-product')
  async findAllDoctorProduct(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const Doctor = await this.DoctorService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(Doctor.totalItems / pageSize),
      total: Doctor.totalItems,
    };

    return new DoctorCollectionPresenter({ data: Doctor.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('doctor-product/:id')
  async findOneDoctorProduct(@Param('id') id: string) {
    const Doctor = await this.DoctorService.findOne(id);

    return new DoctorPresenter(Doctor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('doctor-product/:id')
  async updateDoctorProduct(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    const Doctor = await this.DoctorService.update(id, updateDoctorDto);
    return new DoctorPresenter(Doctor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('doctor-product/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeDoctorProduct(@Param('id') id: string) {
    return this.DoctorService.remove(id);
  }
}
