// import { PaginationQueryDto } from "@/interface";
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   ParseUUIDPipe,
//   NotFoundException,
//   Query,
// } from "@nestjs/common";
// import { ApiTags } from "@nestjs/swagger";
// import { CarsService } from "./cars.service";
// import { CreateCarDto } from "./dto/create-car.dto";
// import { UpdateCarDto } from "./dto/update-car.dto";

// export enum UserRole {
//   Admin = "Admin",
//   Moderator = "Moderator",
//   User = "User",
// }
// @ApiTags("Cars")
// @Controller("cars")
// export class CarsController {
//   constructor(private readonly carsService: CarsService) {}

//   @Post()
//   async create(@Body() createCarDto: CreateCarDto) {
//     try {
//       return await this.carsService.create({
//         brand: {
//           connectOrCreate: {
//             create: {
//               name: createCarDto.brand,
//             },
//             where: {
//               id: createCarDto.brand,
//             },
//           },
//         },
//         model: createCarDto.model,
//       });
//     } catch (error) {
//       throw new NotFoundException(error);
//     }
//   }

//   // async findAll(@Query("role") role: UserRole = UserRole.User) {
//   @Get()
//   async findAll(@Query() { limit, offset }: PaginationQueryDto) {
//     console.log("🚀 ~ file: cars.controller.ts:53 ~ findAll ~ offset", offset);
//     try {
//       return await this.carsService.findAll({ skip: offset, take: limit });
//     } catch (error) {
//       console.log(
//         "🚀 ~ file: cars.controller.ts:64 ~ CarsController ~ findAll ~ error",
//         error
//       );

//       throw new NotFoundException(error);
//     }
//   }

//   @Get(":id")
//   findOne(@Param("id", ParseUUIDPipe) id: string) {
//     return this.carsService.findOne({ where: { id } });
//   }

//   @Patch(":id")
//   update(
//     @Param("id", ParseUUIDPipe) id: string,
//     @Body() updateCarDto: UpdateCarDto
//   ) {
//     return this.carsService.update({
//       where: { id },
//       data: { ...updateCarDto },
//     });
//   }

//   @Delete(":id")
//   remove(@Param("id", ParseUUIDPipe) id: string) {
//     return this.carsService.remove({ where: { id } });
//   }
// }
