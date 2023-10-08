import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Demandas } from './entities/demandas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDemandaDto } from './dto/update-demandas.dto';
import { CreateDemandaDto } from './dto/create-demandas.dto';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class DemandasService {
  constructor(
    @InjectRepository(Demandas)
    private demandasRepository: Repository<Demandas>,
  ) {}

  async findAll(pagination: PaginationDTO): Promise<any> {
    const { page, itemsPerPage } = pagination;
    const skip = (page - 1) * itemsPerPage;

    const [demandas, total] = await this.demandasRepository.findAndCount({
      relations: ['latinhas'],
      skip: skip,
      take: itemsPerPage,
      order: { id: 'ASC' }, // Especifique a ordenação desejada, por exemplo, 'id: ASC' ou 'dataInicio: ASC'.
    });

    const totalItems = await this.demandasRepository.count();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const convertDatesToPeriod = ({
      dataInicio,
      dataFim,
    }: {
      dataInicio: Date;
      dataFim: Date;
    }) => {
      const dataI = formatDate(dataInicio);
      const dataF = formatDate(dataFim);
      return `${dataI} - ${dataF}`;
    };

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const demandasWithCount = demandas.map((demanda) => ({
      id: demanda.id,
      periodo: convertDatesToPeriod({
        dataInicio: demanda.dataInicio,
        dataFim: demanda.dataFim,
      }),
      totalPlan: demanda.totalPlan,
      totalProd: demanda.totalProd,
      status: demanda.status,
      SKUs: demanda.latinhas.length,
    }));

    return { demandas: demandasWithCount, total, page, totalPages };
  }

  async findOne(id: number): Promise<Demandas> {
    const demanda = await this.demandasRepository
      .createQueryBuilder('demanda')
      .leftJoinAndSelect('demanda.latinhas', 'latinhas')
      .where('demanda.id = :id', { id })
      .getOne();

    if (!demanda) {
      throw new NotFoundException(`Demanda com ID ${id} não encontrada.`);
    }

    return demanda;
  }

  async updateTotalPlan(demandaId: number, totalPlan: number) {
    const demanda = await this.demandasRepository.findOne({
      where: { id: demandaId },
    });

    if (demanda) {
      demanda.totalPlan += totalPlan;

      await this.demandasRepository.save(demanda);

      return demanda;
    }

    return null;
  }

  async updateDemandStatus(demandaId: number) {
    const demanda = await this.demandasRepository.findOne({
      where: { id: demandaId },
    });

    if (demanda) {
      if (demanda.totalPlan === demanda.totalProd) {
        demanda.status = 'CONCLUÍDO';
      } else if (
        demanda.totalPlan > demanda.totalProd &&
        demanda.totalProd > 0
      ) {
        demanda.status = 'EM ANDAMENTO';
      } else {
        demanda.status = 'PLANEJAMENTO';
      }

      await this.demandasRepository.save(demanda);

      return demanda;
    }

    return null; // Retorna null se a demanda não for encontrada
  }

  async create(demandas: CreateDemandaDto): Promise<Demandas> {
    return await this.demandasRepository.save(demandas);
  }

  async update(id: number, demandas: UpdateDemandaDto): Promise<Demandas> {
    await this.demandasRepository.update(id, demandas);
    await this.updateDemandStatus(id);
    return await this.demandasRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.demandasRepository.delete(id);
  }
}
