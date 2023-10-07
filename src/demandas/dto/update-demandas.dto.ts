import { ApiProperty } from '@nestjs/swagger';

export class UpdateDemandaDto {
  id: number;

  @ApiProperty({
    required: false,
  })
  dataInicio?: Date;

  @ApiProperty({
    required: false,
  })
  dataFim?: Date;

  @ApiProperty({
    required: false,
  })
  totalPlan?: number;

  @ApiProperty({
    required: false,
  })
  totalProd?: number;

  @ApiProperty({
    required: false,
  })
  status?: string;
}
