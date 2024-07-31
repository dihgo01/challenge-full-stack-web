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
import { RepresentativeService } from './representative.service';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';
import { RepresentativeCollectionPresenter, RepresentativePresenter } from './representative.presenter';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { AuthGuard } from '@nestjs/passport';

@Controller('representatives')
export class RepresentativeController {
  constructor(private readonly representativeService: RepresentativeService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createRepresentativeDto: CreateRepresentativeDto) {
    const representative = await this.representativeService.create(createRepresentativeDto)
    return new RepresentativePresenter(representative);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const representative = await this.representativeService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(representative.totalItems / pageSize),
      total: representative.totalItems,
    };

    return new RepresentativeCollectionPresenter({ data: representative.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const representative = await this.representativeService.findOne(id);

    return new RepresentativePresenter(representative);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRepresentativeDto: UpdateRepresentativeDto) {
    const representative = await this.representativeService.update(id, updateRepresentativeDto);
    return new RepresentativePresenter(representative);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.representativeService.remove(id);
  }
}
