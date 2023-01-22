import { AxiosAdapter } from "@/common/adapter/axios.adapter";
import { PrismaService } from "@/common/prisma.service";
import { Injectable } from "@nestjs/common";
import { ResponsePokemonDto } from "../pokemon/dto/response-pokemon.dto";

@Injectable()
export class SeedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly axios: AxiosAdapter
  ) {}

  async getAllPoke(): Promise<any> {
    // await this.prisma.pokeapi.deleteMany({});
    // const insertAllPromiseArray = [];
    // const data = await this.axios.get<ResponsePokemonDto>(
    //   "https://pokeapi.co/api/v2/pokemon?limit=650"
    // );
    // for (let index = 0; index < data.results.length; index++) {
    //   const element = data.results[index];
    //   let poke = element.url.split("/");
    //   let no = +poke.at(-2);
    //   let name = element.name;
    //   insertAllPromiseArray.push(
    //     await this.prisma.pokeapi.create({
    //       data: {
    //         name,
    //         no,
    //       },
    //     })
    //   );
    // }
    // return await Promise.all(insertAllPromiseArray);
  }
}
