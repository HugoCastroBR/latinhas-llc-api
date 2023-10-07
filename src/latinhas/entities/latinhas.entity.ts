import { Demandas } from 'src/demandas/entities/demandas.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Latinhas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Sku: number;

  @Column()
  descricao: string;

  @Column()
  TotalPlan: number;

  @ManyToOne(() => Latinhas, (latinhas) => latinhas.id)
  @JoinColumn({ name: 'demandaId' })
  demanda: Demandas;
}
