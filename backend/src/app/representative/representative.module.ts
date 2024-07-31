import { Module } from '@nestjs/common';
import { RepresentativeController } from './representative.controller';
import { RepresentativeService } from './representative.service';
import { representativeProviders } from './representative.repository';
import { usersProviders } from '../users/user.repository';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [UsersModule, User],
    controllers: [RepresentativeController],
    providers: [
      RepresentativeService,
      ...representativeProviders,
      ...usersProviders
    ],
    exports: [RepresentativeService, ...representativeProviders],
  })
  export class RepresentativeModule {}