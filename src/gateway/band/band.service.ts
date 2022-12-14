import { iBand } from "@/routers/band/interface/band.interface";
import { v4 as uuid } from "uuid";
import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { CreateBandDto } from "./dto/create-band.dto";
import { UpdateBandDto } from "./dto/update-band.dto";

interface ConnectedClients {
  [id: string]: Socket;
}
@Injectable()
export class BandService {
  private bands: iBand[] = [];
  private connectedClient: ConnectedClients = {};

  constructor() {
    this.create({ name: "metalica" });
    this.create({ name: "Qeen" });
    this.create({ name: "Mana" });
    this.create({ name: "Bob Jovi" });
  }
  remove(id: string) {
    this.bands = this.bands.filter((e) => e.id !== id);
  }
  update(id: string, updateBandDto: UpdateBandDto) {
    this.bands = this.bands.map((e) => {
      console.log(e);
      if (e.id === id) {
        console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ${e}`);

        console.log(
          "🚀 ~ file: band.service.ts:28 ~ BandService ~ this.bands=this.bands.map ~ e",
          e
        );
        return {
          id: e.id,
          name: e.name,
          vote: e.vote + 1,
        };
      }
      return e;
    });
  }
  findAll() {
    return this.bands;
  }
  create(createBandDto: CreateBandDto) {
    this.bands.push({
      id: uuid(),
      name: createBandDto.name,
      vote: 0,
    });
  }

  registerClient(client: Socket) {
    this.connectedClient[client.id] = client;
  }
  removeClient(clientId: string) {
    delete this.connectedClient[clientId];
  }
  getConnectedClients(): number {
    return Object.keys(this.connectedClient).length;
  }
}
