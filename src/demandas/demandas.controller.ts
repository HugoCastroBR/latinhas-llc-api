import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Demandas } from './entities/demandas.entity';
import { DemandasService } from './demandas.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDemandaDto } from './dto/create-demandas.dto';
import { UpdateDemandaDto } from './dto/update-demandas.dto';
import { PaginationDTO } from './dto/pagination.dto';

@ApiTags('demandas')
@Controller('demandas')
export class DemandasController {
  constructor(private readonly demandasService: DemandasService) {}

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.demandasService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Demandas> {
    return this.demandasService.findOne(id);
  }

  @Post()
  async create(@Body() demandas: CreateDemandaDto): Promise<Demandas> {
    return this.demandasService.create(demandas);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() demandas: UpdateDemandaDto,
  ): Promise<Demandas> {
    return this.demandasService.update(id, demandas);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const demandas = await this.demandasService.findOne(id);
    if (!demandas) throw new NotFoundException('Demanda não encontrada');
    return this.demandasService.delete(id);
  }
}
