import { ApiProperty } from '@nestjs/swagger';

export class CreateLatinhasDTO {
  @ApiProperty()
  Sku: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  TotalPlan: number;

  @ApiProperty()
  demandaId: number;
}
