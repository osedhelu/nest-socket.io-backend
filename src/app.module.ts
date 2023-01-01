import { Module } from "@nestjs/common";
import { BandModule, BrandsModule, CarsModule } from "@/routers";
import { ConfigModule } from "@nestjs/config";
import { GatewayModule } from "./gateway/gateway.module";

@Module({
  imports: [
    BandModule,
    ConfigModule.forRoot(),
    GatewayModule,
    CarsModule,
    BrandsModule,
  ],
})
export class AppModule {}
