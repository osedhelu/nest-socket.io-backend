import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { CreateCarDto } from "./create-car.dto";

export class UpdateCarDto {
  @IsUUID()
  @ApiProperty({
    readOnly: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly id?: string;
  @IsString()
  @ApiProperty({
    readOnly: true,
    required: true,
  })
  @IsOptional()
  readonly brandId?: any;
  @IsString()
  @ApiProperty({
    readOnly: true,
    required: false,
  })
  @IsOptional()
  readonly model?: string;
}
