import { Module } from '@nestjs/common';
import { LatinhasService } from './latinhas.service';
import { LatinhasController } from './latinhas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Latinhas } from './entities/latinhas.entity';
import { Demandas } from 'src/demandas/entities/demandas.entity';
import { DemandasService } from 'src/demandas/demandas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Latinhas, Demandas])], // Adicione a entidade "Demandas" aqui
  controllers: [LatinhasController],
  providers: [LatinhasService, DemandasService],
})
export class LatinhasModule {}
