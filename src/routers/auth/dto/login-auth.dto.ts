import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    required: true,
    default: "",
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    required: true,
    default: "",
  })
  @IsNotEmpty()
  @IsString({})
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "The password must have a Uppercase, lowercase letter and a number",
  })
  password: string;
}
