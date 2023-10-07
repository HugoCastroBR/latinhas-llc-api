import { ApiProperty } from '@nestjs/swagger';

export class CreateDemandaDto {
  id: number;

  @ApiProperty()
  dataInicio: Date;

  @ApiProperty()
  dataFim: Date;

  @ApiProperty()
  totalPlan: number;

  @ApiProperty()
  totalProd: number;

  @ApiProperty()
  status: string;
}
