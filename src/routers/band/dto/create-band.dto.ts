import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBandDto {
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
  @IsString()
  readonly vote: string;
}
