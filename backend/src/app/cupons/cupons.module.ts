import { Module } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CuponsController } from './cupons.controller';
import { cuponsProviders } from './cupons.repository';

@Module({
  controllers: [CuponsController],
  providers: [CuponsService, ...cuponsProviders],
})
export class CuponsModule {}
