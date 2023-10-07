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

@ApiTags('latinhas')
@Controller('demandas/:demandaId/latinhas')
export class LatinhasController {
  constructor(private readonly latinhasService: LatinhasService) {}

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.latinhasService.findAllWithPagination(pagination);
  }

  @Post()
  create(
    @Param('demandaId') demandaId: string,
    @Body() createLatinhasDto: CreateLatinhasDTO,
  ) {
    return this.latinhasService.create(+demandaId, createLatinhasDto);
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
