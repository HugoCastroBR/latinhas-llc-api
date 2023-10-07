import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Demandas } from './entities/demandas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDemandaDto } from './dto/update-demandas.dto';

@Injectable()
export class DemandasService {
  constructor(
    @InjectRepository(Demandas)
    private demandasRepository: Repository<Demandas>,
  ) {}

  async findAll(): Promise<Demandas[]> {
    return await this.demandasRepository.find();
  }

  async findOne(id: number): Promise<Demandas> {
    return await this.demandasRepository.findOne({ where: { id } });
  }

  async create(demandas: Demandas): Promise<Demandas> {
    return await this.demandasRepository.save(demandas);
  }

  async update(id: number, demandas: UpdateDemandaDto): Promise<Demandas> {
    await this.demandasRepository.update(id, demandas);
    return await this.demandasRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.demandasRepository.delete(id);
  }
}
