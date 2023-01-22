import { PrismaService } from "@/common/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.userCreateInput) {
    let userValidata = await Prisma.validator<Prisma.userCreateInput>()({
      email: data.email,
      password: bcrypt.hashSync(data.password, 10),
      username: data.username,
    });
    // return this.prisma.user.create({
    //   data,
    // });
    return await this.prisma.user.create({
      data: userValidata,
      select: {
        username: true,
        email: true,
        first_name: true,
        is_superuser: true,
        last_login: true,
        is_active: true,
        is_staff: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}