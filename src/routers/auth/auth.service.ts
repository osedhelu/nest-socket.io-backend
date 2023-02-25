import { PrismaService } from "@/common/prisma.service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async login(loginUserDto: LoginUserDto) {
    let user = await this.prisma.user
      .findUniqueOrThrow({
        where: {
          email: loginUserDto.email,
        },
        select: {
          password: true,
          username: true,
          id: true,
          email: true,
        },
      })
      .catch((e) => Promise.reject("Credentials are not valid (email)"));
    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      return Promise.reject("Credentials are not valid (password)");
    //TODO: retornar un jwt
    delete user.password;
    const aa = await this.getTokens(user.id, user.username, user.email);
    await this.updateRefreshToken(user.id, aa.refreshToken);
    return {
      ...user,
      ...aa,
    };
  }
  async logout(userId: string) {
    this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async getTokens(userId: string, username: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
          email,
        },
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
          email,
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user
      .findUniqueOrThrow({
        where: { id: userId },
        select: { refreshToken: true, id: true, username: true, email: true },
      })
      .catch((e) => Promise.reject("Access Denied"));

    if (!user || !user.refreshToken) return Promise.reject("Access Denied");
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );

    if (!refreshTokenMatches) return Promise.reject("Access Denied (token)");
    const tokens = await this.getTokens(user.id, user.username, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
