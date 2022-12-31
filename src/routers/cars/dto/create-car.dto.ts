import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCarDto {
  readonly id?: string;
  @ApiProperty()
  @IsString({})
  readonly brand: string;

  @ApiProperty()
  @IsString({})
  readonly model: string;
}
