import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import { iBand, iBodyBand } from "./interface/band.interface";
import { BandService } from "./band.service";
import { CreateBandDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("band")
@ApiTags("Bands")
export class BandController {
  constructor(private readonly service: BandService) {}
  @Get()
  getAllBand() {
    return this.service.findAll();
  }
  @Get(":id")
  getBandById(@Param("id", ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }
  @Post()
  addBand(@Body() createBandDto: CreateBandDto) {
    console.log(
      "🚀 ~ file: band.controller.ts:31 ~ BandController ~ addBand ~ createBandDto",
      createBandDto
    );
    // this.service.addNewBond(body);
    return createBandDto;
  }
  @Put(":id")
  editBand(@Body() body: iBodyBand, @Param("id") id: string) {
    this.service.editBand(body, id);
  }
}
