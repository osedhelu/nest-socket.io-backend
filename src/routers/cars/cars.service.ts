// import { Injectable } from "@nestjs/common";
// import { UpdateCarDto } from "./dto/update-car.dto";
// import { Car, Prisma } from "@prisma/client";
// import { PrismaService } from "@/prisma.service";

// @Injectable()
// export class CarsService {
//   constructor(private readonly prisma: PrismaService) {}
//   create(createCarDto: Prisma.CarCreateInput): Promise<any> {
//     return this.prisma.car.create({
//       data: { ...createCarDto },
//     });
//   }

//   async findAll(params: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.CarWhereUniqueInput;
//     where?: Prisma.CarWhereInput;
//     orderBy?: Prisma.CarOrderByWithRelationInput;
//     select?: Prisma.CarSelect;
//   }) {
//     const cars = await this.prisma.$transaction([
//       this.prisma.car.count(),
//       this.prisma.car.findMany({
//         ...params,
//         orderBy: {
//           model: "asc",
//         },
//         select: {
//           model: true,
//           brand: {
//             select: {
//               id: true,
//               createdAt: true,
//               name: true,
//             },
//           },
//           color: {
//             select: {
//               id: true,
//             },
//           },
//         },
//       }),
//     ]);
//     let total = cars[0] ?? 0;
//     let total_page = params.take ?? 0;
//     return {
//       total: cars[0] ?? 0,
//       total_page: Math.ceil(total / total_page),
//       data: cars[1],
//     };
//   }

//   async findOne(params: { where: Prisma.CarWhereUniqueInput }): Promise<Car> {
//     return this.prisma.car.findUnique({ ...params });
//   }

//   async update(params: {
//     where: Prisma.CarWhereUniqueInput;
//     data: Prisma.CarUncheckedUpdateInput;
//   }): Promise<Car> {
//     return this.prisma.car.update({ ...params });
//   }

//   async remove(params: { where: Prisma.CarWhereUniqueInput }): Promise<Car> {
//     return this.prisma.car.delete({ ...params });
//   }
// }
