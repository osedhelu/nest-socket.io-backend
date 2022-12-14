import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandGateway } from './band.gateway';

@Module({
  providers: [BandGateway, BandService]
})
export class BandModule {}
