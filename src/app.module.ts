import { Module } from "@nestjs/common";
import { BandModule } from "@/routers";
import { ConfigModule } from "@nestjs/config";
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [BandModule, ConfigModule.forRoot(), GatewayModule],
})
export class AppModule {}
