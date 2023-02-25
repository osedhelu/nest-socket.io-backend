import { Body, Controller, Post } from "@nestjs/common";
import { CreateSMSDto } from "./dto/smspago.dto";
import { SmspagoService } from "./smspago.service";

@Controller("smspago")
export class SmspagoController {
  constructor(private readonly smspagoService: SmspagoService) {}
  @Post("/consultToNfcCard")
  async consultNFC(@Body() data: CreateSMSDto) {
    return await this.smspagoService.readDataSmspago(data);
  }
}
