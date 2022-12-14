import { ApiProperty } from "@nestjs/swagger";
export interface iBand {
  id: string;
  name: string;
  vote: number;
}

export class iBodyBand {
  name: string;

  vote: number;
}
