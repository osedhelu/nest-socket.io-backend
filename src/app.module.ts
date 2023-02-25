import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GatewayModule } from "./gateway/gateway.module";
import { CommonModule } from "./common/common.module";
import { RoutersModule } from "./routers/routers.module";
import { EnvConfigutation } from "@/config/env.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigutation],
    }),
    GatewayModule,
    CommonModule,
    RoutersModule,
  ],
})
export class AppModule { }
