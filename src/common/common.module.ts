import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosAdapter } from "./adapter/axios.adapter";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  exports: [PrismaService, AxiosAdapter, ConfigService],
  providers: [PrismaService, AxiosAdapter, ConfigService],
})
export class CommonModule {}
