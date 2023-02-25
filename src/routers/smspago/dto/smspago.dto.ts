import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSMSDto {
  //enviar serial de la targeta M1
  @ApiProperty()
  @IsString({})
  readonly M1CardSerial: string;
  //enviar serial del postnet
  @ApiProperty()
  @IsString({})
  readonly serial: string;

  //monto a debitar
  @ApiProperty()
  @IsString({})
  readonly amount: string;

  //
  @ApiProperty()
  @IsString({})
  readonly concepto: string;
}
