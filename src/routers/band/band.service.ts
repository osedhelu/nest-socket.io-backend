import { Injectable, NotFoundException } from "@nestjs/common";
import { iBand, iBodyBand } from "@/routers/band/interface/band.interface";
import { isNull } from "@/utils";
import { v4 as uuid } from "uuid";

@Injectable()
export class BandService {
  private bands: iBand[] = [
    {
      id: uuid(),
      name: "Toyota",
      vote: 2,
    },
    {
      id: uuid(),
      name: "Honda",
      vote: 9,
    },
    {
      id: uuid(),
      name: "Jeep",
      vote: 5,
    },
  ];
  findAll(): iBand[] {
    return this.bands;
  }
  findById(id: string): iBand | any {
    const resp = this.bands.find((a) => a.id === id);
    if (isNull(resp))
      throw new NotFoundException(`Band with  id ${id} not found`);
    return resp;
  }
  addNewBond(body: iBodyBand) {
    this.bands.push({ ...body, id: uuid() });
  }
  editBand(body: iBodyBand, id: string) {
    console.log(
      "🚀 ~ file: band.service.ts:37 ~ BandService ~ editBand ~ body",
      body
    );
    const band = this.findById(id);
    console.log(band);
  }
}
