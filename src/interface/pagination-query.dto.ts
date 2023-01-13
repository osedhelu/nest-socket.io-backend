import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    title: "limit",
    format: "int32",
    required: false,
    default: 3,
  })
  limit?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    title: "Page",
    format: "offset",
    description: "Esta es ir mostrando de cuantos registros quieres mostrar",
    default: 1,
    required: false,
  })
  offset?: number;
}
