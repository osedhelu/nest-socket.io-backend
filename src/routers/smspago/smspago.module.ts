import { Module } from '@nestjs/common';
import { SmspagoService } from './smspago.service';
import { SmspagoController } from './smspago.controller';

@Module({
  controllers: [SmspagoController],
  providers: [SmspagoService]
})
export class SmspagoModule {}
