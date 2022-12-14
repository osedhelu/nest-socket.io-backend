import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from "@nestjs/websockets";
import { BandService } from "./band.service";
import { Server, Socket } from "socket.io";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { CreateBandDto } from "./dto/create-band.dto";
import { UpdateBandDto } from "./dto/update-band.dto";

@WebSocketGateway({ cors: true, namespace: "/" })
export class BandGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  constructor(private readonly bandService: BandService) {}
  handleConnection(client: Socket, ...args: any[]) {
    client.emit("band-conection", this.bandService.findAll());
    this.bandService.registerClient(client);

    console.log({
      clientes: this.bandService.getConnectedClients(),
    });
  }
  handleDisconnect(client: Socket) {
    this.bandService.removeClient(client.id);
    console.log({
      clientes: this.bandService.getConnectedClients(),
    });
  }

  getConnectedClient(): number {
    return this.bandService.getConnectedClients();
  }

  @SubscribeMessage("emit-message")
  findAllClient(
    @ConnectedSocket() client: Socket,
    @MessageBody() createBandDto: CreateBandDto
  ): number {
    try {
      console.log(
        "🚀 ~ file: band.gateway.ts:36 ~ BandGateway ~ CreateBandDto",
        {
          name: createBandDto.name,
          vote: 0,
        }
      );
      client.broadcast.emit("new-message", createBandDto);

      return this.bandService.getConnectedClients();
    } catch (e) {
      console.log("🚀 ~ file: band.gateway.ts:49 ~ BandGateway ~ e", e);
      return 0;
    }
  }

  @SubscribeMessage("createBand")
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createBandDto: CreateBandDto
  ) {
    this.bandService.create(createBandDto);
    this.wss.emit("band-conection", this.bandService.findAll());
    return "create Band";
  }

  @SubscribeMessage("findAllBand")
  findAll() {
    return this.bandService.findAll();
  }
  @SubscribeMessage("updateBand")
  update(
    @ConnectedSocket() client: Socket,
    @MessageBody() updateBandDto: UpdateBandDto
  ) {
    this.bandService.update(updateBandDto.id, updateBandDto);

    this.wss.emit("band-conection", this.bandService.findAll());
    return "respuesta desde el backend";
  }

  @SubscribeMessage("removeBand")
  remove(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    console.log(
      "🚀 ~ file: band.gateway.ts:87 ~ BandGateway ~ remove ~ id",
      id
    );

    this.bandService.remove(id);
    this.wss.emit("band-conection", this.bandService.findAll());
    return "eliminado";
  }
}
