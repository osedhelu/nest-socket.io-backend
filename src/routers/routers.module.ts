import { CommonModule } from "@/common/common.module";
import { Module } from "@nestjs/common";
import { BandModule } from "./band/band.module";
import { SeedModule } from "./seed/seed.module";

@Module({
  imports: [BandModule, SeedModule, CommonModule],
})
export class RoutersModule {}
