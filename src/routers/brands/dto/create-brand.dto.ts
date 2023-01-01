import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBrandDto {
  @ApiProperty()
  @IsString()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;
}
