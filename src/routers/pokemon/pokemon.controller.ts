// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Query,
// } from "@nestjs/common";
// import { PokemonService } from "./pokemon.service";
// import { CreatePokemonDto } from "./dto/create-pokemon.dto";
// import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
// import { PaginationDto } from "@/common/dto/pagination.dto";
// import { ConfigService } from "@nestjs/config";

// @Controller("pokemon")
// export class PokemonController {
//   constructor(private readonly pokemonService: PokemonService) {}
//   @Get()
//   async findAll(@Query() params: PaginationDto) {
//     return await this.pokemonService.findAll({
//       take: params.limit,
//       skip: params.offset,
//     });
//   }
//   @Post()
//   create(@Body() createPokemonDto: CreatePokemonDto) {
//     return this.pokemonService.create(createPokemonDto);
//   }

//   @Get(":id")
//   findOne(@Param("id") id: string) {
//     return this.pokemonService.findOne(+id);
//   }

//   @Patch(":id")
//   update(@Param("id") id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
//     return this.pokemonService.update(+id, updatePokemonDto);
//   }

//   @Delete(":id")
//   remove(@Param("id") id: string) {
//     return this.pokemonService.remove(+id);
//   }
// }
