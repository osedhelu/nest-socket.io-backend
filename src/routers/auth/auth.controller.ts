import { GetRawHeader, GetUser } from '@/common/decorator';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
  UserRoleGuard,
} from '@/common/guards';
import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  // @Post("/reset")
  // async reset(@Body() token: RefreshAuthDto) {
  //   return await this.authService.refresh(token);
  // }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refreshTokens(@GetUser() user: User) {
    console.log('TCL: AuthController -> refreshTokens -> user', user);
    try {
      return await this.authService.refreshTokens(user.id, user.refreshToken);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AccessTokenGuard)
  @Get('/pretegiso')
  async pretegiso(@GetUser() user: User, @GetRawHeader() header: any) {
    try {
      return user;
    } catch (err) {
      console.log('TCL: AuthController -> pretegiso -> err', err);
      throw new UnauthorizedException(err);
    }
  }
  @ApiBearerAuth('JWT-auth')
  @SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AccessTokenGuard, UserRoleGuard)
  @Get('/private2')
  async pretegiso2(@GetUser() user: User, @GetRawHeader() header: any) {
    try {
      return user;
    } catch (err) {
      console.log('TCL: AuthController -> pretegiso -> err', err);
      throw new UnauthorizedException(err);
    }
  }
}
