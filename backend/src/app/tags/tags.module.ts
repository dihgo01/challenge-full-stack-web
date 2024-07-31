import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { tagProviders } from './tag.repository';

@Module({
  controllers: [TagsController],
  providers: [
    TagsService,
    ...tagProviders
  ],
})
export class TagsModule { }
