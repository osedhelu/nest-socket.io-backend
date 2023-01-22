import { PrismaService } from "@/common/prisma.service";
import { Injectable } from "@nestjs/common";
import { LoginUserDto, RefreshAuthDto } from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login(loginUserDto: LoginUserDto) {
    let user = await this.prisma.user
      .findUniqueOrThrow({
        where: {
          email: loginUserDto.email,
        },
      })
      .catch((e) => Promise.reject("Credentials are not valid (email)"));
    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      return Promise.reject("Credentials are not valid (password)");
    //TODO: retornar un jwt
    delete user.password;
    return user;
  }
  refresh(RefreshAuthDto: RefreshAuthDto) {
    return "refreshAuthDto";
  }
}
