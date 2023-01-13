import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { PokeResponse } from "./interface/poke.interface";
import { SeedService } from "./seed.service";

@Controller("seed")
export class SeedController {
  private readonly axios: AxiosInstance = axios;
  constructor(private readonly seedService: SeedService) {}

  // @Post()
  // create(@Body() createSeedDto: CreateSeedDto) {
  //   return this.seedService.create(createSeedDto);
  // }

  @Get()
  async findAll() {
    const { data } = await this.axios.get<PokeResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=650"
    );
    for (let index = 0; index < data.results.length; index++) {
      const element = data.results[index];
      let poke = element.url.split("/");
      let no = +poke.at(-2);
      let name = element.name;
      console.log({
        name,
        no,
      });
    }
    return data.results[0];
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seedService.findOne(+id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateSeedDto: UpdateSeedDto) {
  //   return this.seedService.update(+id, updateSeedDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seedService.remove(+id);
  }
}
