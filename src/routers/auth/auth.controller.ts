import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginUserDto, RefreshAuthDto } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  @Post("/reset")
  reset(@Body() token: RefreshAuthDto) {
    this.authService.refresh(token);
  }
}
