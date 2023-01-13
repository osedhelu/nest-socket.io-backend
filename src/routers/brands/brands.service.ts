// import { PrismaService } from "@/prisma.service";
// import { Injectable } from "@nestjs/common";
// import { Brand, Prisma } from "@prisma/client";

// @Injectable()
// export class BrandsService {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(data: Prisma.BrandCreateInput): Promise<Brand> {
//     return this.prisma.brand.create({ data });
//   }

//   findAll(params: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.BrandWhereUniqueInput;
//     where?: Prisma.BrandWhereInput;
//     orderBy?: Prisma.BrandOrderByWithRelationInput;
//   }): Promise<Brand[]> {
//     return this.prisma.brand.findMany({ ...params });
//   }

//   async findOne(params: {
//     where: Prisma.BrandWhereUniqueInput;
//   }): Promise<Brand> {
//     return this.prisma.brand.findUnique({ ...params });
//   }

//   async update(params: {
//     where: Prisma.BrandWhereUniqueInput;
//     data: Prisma.BrandUpdateInput;
//   }): Promise<Brand> {
//     return this.prisma.brand.update({ ...params });
//   }

//   async remove(where: Prisma.BrandWhereUniqueInput): Promise<Brand> {
//     return await this.prisma.brand.delete({ where });
//   }
// }
