import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { ReportCollectionPresenter, ReportPresenter } from './report.presenter';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    const report = await this.reportService.create(createReportDto)
    return new ReportPresenter(report);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const report = await this.reportService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(report.totalItems / pageSize),
      total: report.totalItems,
    };

    return new ReportCollectionPresenter({ data: report.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const report = await this.reportService.findOne(id);

    return new ReportPresenter(report);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    const report = await this.reportService.update(id, updateReportDto);
    return new ReportPresenter(report);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }
}
