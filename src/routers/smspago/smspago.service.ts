import { Injectable } from "@nestjs/common";
import { CreateSMSDto } from "./dto/smspago.dto";

@Injectable()
export class SmspagoService {
  async readDataSmspago(data: CreateSMSDto) {
    if (data.M1CardSerial === "xxxxxxx") {
      return {
        name: "Oscar Herrera",
        ref: "00000001",
        amount: 10000 - Number(data.amount),
      };
    }
  }
}
