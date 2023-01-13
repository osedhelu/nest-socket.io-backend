import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GatewayModule } from "./gateway/gateway.module";
import { CommonModule } from "./common/common.module";
import { RoutersModule } from "./routers/routers.module";

@Module({
  imports: [ConfigModule.forRoot(), GatewayModule, CommonModule, RoutersModule],
})
export class AppModule {}
