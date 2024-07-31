import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, DefaultValuePipe, Query, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationPresenterProps } from '../presenters/pagination.presenter';
import { TagCollectionPresenter, TagPresenter } from './tag.presenter';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    const tag = await this.tagService.create(createTagDto)
    return new TagPresenter(tag);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('name') name: string,
  ) {
    const tag = await this.tagService.findAll(page, pageSize, name);

    const pagination: PaginationPresenterProps = {
      current_page: page,
      per_page: pageSize,
      last_page: Math.ceil(tag.totalItems / pageSize),
      total: tag.totalItems,
    };

    return new TagCollectionPresenter({ data: tag.data, paginationProps: pagination });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tag = await this.tagService.findOne(id);

    return new TagPresenter(tag);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    const tag = await this.tagService.update(id, updateTagDto);
    return new TagPresenter(tag);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
