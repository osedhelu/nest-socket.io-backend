import { PrismaService } from "@/common/prisma.service";
import { Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("pokemon")
@Injectable()
export class PokemonService {
  constructor(private readonly prisma: PrismaService) {}
}
//   constructor(

//     private readonly prisma: PrismaService,
//     private readonly configService: ConfigService
//   ) {}

//   async create(data: Prisma.pokeapiCreateInput): Promise<pokeapi> {
//     return await this.prisma.pokeapi.create({ data });
//   }
//   findAll(params: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.pokeapiWhereUniqueInput;
//     where?: Prisma.pokeapiWhereInput;
//     orderBy?: Prisma.pokeapiOrderByWithRelationInput;
//   }): Promise<pokeapi[]> {
//     const envLimit = this.configService.getOrThrow("default_limit");
//     console.log(
//       "🚀 ~ file: pokemon.service.ts:26 ~ PokemonService ~ envLimit",
//       envLimit
//     );

//     return this.prisma.pokeapi.findMany({
//       ...params,
//       skip: params.skip || 0,
//       take: params.take || envLimit,
//       orderBy: {
//         no: params.orderBy?.no || "asc",
//       },
//     });
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} pokemon`;
//   }

//   update(id: number, updatePokemonDto: UpdatePokemonDto) {
//     return `This action updates a #${id} pokemon`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} pokemon`;
//   }
// }
