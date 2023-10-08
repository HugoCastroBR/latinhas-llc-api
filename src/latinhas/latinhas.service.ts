import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Latinhas } from './entities/latinhas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLatinhasDTO } from './dto/create-latinhas.dto';
import { UpdateLatinhasDTO } from './dto/update-latinhas.dto';
import { Demandas } from 'src/demandas/entities/demandas.entity';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class LatinhasService {
  constructor(
    @InjectRepository(Latinhas)
    private latinhasRepository: Repository<Latinhas>,
    @InjectRepository(Demandas)
    private demandasRepository: Repository<Demandas>,
  ) {}

  async findAllWithPagination(pagination: PaginationDTO): Promise<Latinhas[]> {
    const { page, itemsPerPage } = pagination;
    const skip = (page - 1) * itemsPerPage;

    return await this.latinhasRepository.find({
      skip,
      take: itemsPerPage,
    });
  }

  async findAllByDemanda(
    demandaId: number,
    pagination: PaginationDTO,
  ): Promise<any> {
    const { page, itemsPerPage } = pagination;
    const skip = (page - 1) * itemsPerPage;

    const demanda = await this.demandasRepository.findOne({
      where: { id: demandaId },
      relations: ['latinhas'],
    });

    if (!demanda) {
      throw new NotFoundException(
        `Demanda com ID ${demandaId} não encontrada.`,
      );
    }

    const latinhas = demanda.latinhas.slice(skip, skip + itemsPerPage);

    const totalLatinhas = demanda.latinhas.length;
    const totalPages = Math.ceil(totalLatinhas / itemsPerPage);

    return {
      latinhas: latinhas,
      total: totalLatinhas,
      page: page,
      totalPages: totalPages,
    };
  }

  async findOne(demandaId: number, latinhaId: number): Promise<Latinhas> {
    const demanda = await this.demandasRepository.findOne({
      where: { id: demandaId },
      relations: ['latinhas'],
    });
    if (!demanda) {
      throw new NotFoundException(
        `Demanda com ID ${demandaId} não encontrada.`,
      );
    }
    const latinha = demanda.latinhas.find((l) => l.id === latinhaId);
    if (!latinha) {
      throw new NotFoundException(
        `Latina com ID ${latinhaId} não encontrada na demanda.`,
      );
    }
    return latinha;
  }

  async create(
    demandaId: number,
    createLatinhasDTO: CreateLatinhasDTO,
  ): Promise<Latinhas> {
    const demanda = await this.demandasRepository.findOne({
      where: { id: demandaId },
    });
    if (!demanda) {
      throw new NotFoundException(
        `Demanda com ID ${demandaId} não encontrada.`,
      );
    }

    const latinha = new Latinhas();
    latinha.Sku = createLatinhasDTO.Sku;
    latinha.descricao = createLatinhasDTO.descricao;
    latinha.TotalPlan = createLatinhasDTO.TotalPlan;
    latinha.demandaId = demandaId;

    return await this.latinhasRepository.save(latinha);
  }

  async update(
    demandaId: number,
    latinhaId: number,
    updateLatinhasDTO: UpdateLatinhasDTO,
  ): Promise<Latinhas> {
    const demanda = await this.demandasRepository.findOne({
      where: { id: demandaId },
      relations: ['latinhas'],
    });
    if (!demanda) {
      throw new NotFoundException(
        `Demanda com ID ${demandaId} não encontrada.`,
      );
    }

    const latinha = demanda.latinhas.find((l) => l.id === latinhaId);
    if (!latinha) {
      throw new NotFoundException(
        `Latina com ID ${latinhaId} não encontrada na demanda.`,
      );
    }

    if (updateLatinhasDTO.Sku) {
      latinha.Sku = updateLatinhasDTO.Sku;
    }

    if (updateLatinhasDTO.descricao) {
      latinha.descricao = updateLatinhasDTO.descricao;
    }

    if (updateLatinhasDTO.TotalPlan) {
      latinha.TotalPlan = updateLatinhasDTO.TotalPlan;
    }

    await this.latinhasRepository.save(latinha);
    return latinha;
  }

  async delete(demandaId: number, latinhaId: number): Promise<void> {
    const demanda = await this.demandasRepository.findOne({
      where: { id: demandaId },
      relations: ['latinhas'],
    });

    if (!demanda) {
      throw new NotFoundException(
        `Demanda com ID ${demandaId} não encontrada.`,
      );
    }

    const latinha = demanda.latinhas.find((l) => l.id === latinhaId);

    if (!latinha) {
      throw new NotFoundException(
        `Latina com ID ${latinhaId} não encontrada na demanda.`,
      );
    }

    demanda.totalPlan -= latinha.TotalPlan;
    demanda.latinhas = demanda.latinhas.filter((l) => l.id !== latinhaId);
    await this.latinhasRepository.remove(latinha);
    await this.demandasRepository.save(demanda);
  }
}
