import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePokemonDto {
  @ApiProperty({
    required: true,
    default: "",
  })
  @IsString({})
  readonly name: string;
  @ApiProperty({
    required: false,
    default: 0,
  })
  @IsNumber()
  readonly no: number;
}
