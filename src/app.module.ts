import { Module } from "@nestjs/common";
import { BandModule, CarsModule } from "@/routers";
import { ConfigModule } from "@nestjs/config";
import { GatewayModule } from "./gateway/gateway.module";

@Module({
  imports: [BandModule, ConfigModule.forRoot(), GatewayModule, CarsModule],
})
export class AppModule {}
