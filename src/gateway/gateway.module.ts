import { Module } from "@nestjs/common";
import { BandModule } from "./band/band.module";
@Module({
  imports: [BandModule],
})
export class GatewayModule {}
