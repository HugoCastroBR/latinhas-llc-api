import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLatinhasDTO {
  @ApiPropertyOptional()
  Sku?: number;

  @ApiPropertyOptional()
  descricao?: string;

  @ApiPropertyOptional()
  TotalPlan?: number;
}
