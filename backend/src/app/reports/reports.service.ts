import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { repositoryReports } from './constants/constants';
import { Report } from './entities/report.entity';
import { Op } from 'sequelize';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(repositoryReports)
    private reportsRepository: typeof Report,
  ) { }

  async create(createReportDto: CreateReportDto) {
    const report = await this.reportsRepository.create(createReportDto);

    return report;
  }

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: Report[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const reports = await this.reportsRepository.findAndCountAll({
      where: where,
      limit: pageSize,
      offset,
    });

    return {
      data: reports.rows,
      totalItems: reports.count,
    };
  }

  async findOne(id: string) {
    const report = await this.reportsRepository.findByPk(id);

    if (!report)
      throw new NotFoundException('Report not found');

    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    const report = await this.findOne(id);
   
    const report_update = await report.update(updateReportDto);

    return report_update;
  }

  async remove(id: string) {
    const report = await this.findOne(id);

    const delete_report = await this.reportsRepository.destroy({
      where: { id: report.id }
    });

    return delete_report;
  }
}
