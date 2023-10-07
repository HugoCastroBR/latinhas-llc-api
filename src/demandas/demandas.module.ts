import { Module } from '@nestjs/common';
import { DemandasController } from './demandas.controller';
import { DemandasService } from './demandas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demandas } from './entities/demandas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demandas])],
  controllers: [DemandasController],
  providers: [DemandasService],
})
export class DemandasModule {}
