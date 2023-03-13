import { PrismaService } from '@/common/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  id: string;
  username: string;
  email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('jwt_access_secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const userModel = await this.prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .catch((e) => Promise.reject('Token no valid'));
    if (!userModel.is_active) {
      throw new UnauthorizedException('User no active');
    }
    return userModel;
  }
}
