import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LatinhasService } from './latinhas.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateLatinhasDTO } from './dto/create-latinhas.dto';
import { UpdateLatinhasDTO } from './dto/update-latinhas.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { DemandasService } from 'src/demandas/demandas.service';

@ApiTags('latinhas')
@Controller('demandas/:demandaId/latinhas')
export class LatinhasController {
  constructor(
    private readonly demandasService: DemandasService,
    private readonly latinhasService: LatinhasService,
  ) {}

  @Get()
  findAll(
    @Param('demandaId') demandaId: string,
    @Query() pagination: PaginationDTO,
  ) {
    return this.latinhasService.findAllByDemanda(+demandaId, pagination);
  }

  @Post()
  async create(
    @Param('demandaId') demandaId: number,
    @Body() createLatinhaDTO: CreateLatinhasDTO,
  ) {
    const latinha = await this.latinhasService.create(
      demandaId,
      createLatinhaDTO,
    );

    if (latinha) {
      await this.demandasService.updateTotalPlan(demandaId, latinha.TotalPlan);
      await this.demandasService.updateDemandStatus(demandaId);
    }

    return latinha;
  }

  @Get(':id')
  findOne(
    @Param('demandaId') demandaId: string,
    @Param('id') latinhaId: string,
  ) {
    return this.latinhasService.findOne(+demandaId, +latinhaId);
  }

  @Patch(':id')
  update(
    @Param('demandaId') demandaId: string,
    @Param('id') latinhaId: string,
    @Body() updateLatinhasDto: UpdateLatinhasDTO,
  ) {
    return this.latinhasService.update(
      +demandaId,
      +latinhaId,
      updateLatinhasDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('demandaId') demandaId: string,
    @Param('id') latinhaId: string,
  ) {
    return this.latinhasService.delete(+demandaId, +latinhaId);
  }
}
