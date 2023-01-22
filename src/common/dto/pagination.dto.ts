import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
    default: 0,
    description: "Paginado",
  })
  offset?: number;
  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiProperty({
    required: false,
    default: 10,
    description: "Cuantos items quieres mostrar",
  })
  limit?: number;
}
