import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @ApiProperty()
  name: string;
}
