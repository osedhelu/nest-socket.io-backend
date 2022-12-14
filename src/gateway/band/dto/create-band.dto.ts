import { IsNumber, IsString } from "class-validator";

export class CreateBandDto {
  @IsString()
  readonly name: string;
}
