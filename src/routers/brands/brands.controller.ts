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
//   BadRequestException,
//   Query,
//   Logger,
// } from "@nestjs/common";
// import { ApiTags } from "@nestjs/swagger";
// import { BrandsService } from "./brands.service";
// import { CreateBrandDto } from "./dto/create-brand.dto";
// import { UpdateBrandDto } from "./dto/update-brand.dto";

// @Controller("brands")
// @ApiTags("brands")
// export class BrandsController {
//   constructor(private readonly brandsService: BrandsService) {}
//   private readonly logger = new Logger(BrandsController.name);

//   @Post()
//   create(@Body() createBrandDto: CreateBrandDto) {
//     return this.brandsService.create({ ...createBrandDto });
//   }

//   @Get()
//   findAll(@Query() paginationDto: PaginationQueryDto) {
//     return this.brandsService.findAll({});
//   }

//   @Get(":id")
//   findOne(@Param("id", ParseUUIDPipe) id: string) {
//     return this.brandsService.findOne({ where: { id } });
//   }

//   @Patch(":id")
//   update(
//     @Param("id", ParseUUIDPipe) id: string,
//     @Body() updateBrandDto: UpdateBrandDto
//   ) {
//     return this.brandsService.update({
//       where: {
//         id,
//       },
//       data: updateBrandDto,
//     });
//   }

//   @Delete(":id")
//   async remove(@Param("id", ParseUUIDPipe) id: string): Promise<any> {
//     try {
//       return await this.brandsService.remove({ id });
//     } catch (error) {
//       this.logger.log(
//         `🚀 ~ file: brands.controller.ts:55 ~ BrandsController ~ remove ~ ${error}`
//       );
//       throw new BadRequestException(error);
//     }
//   }
// }
