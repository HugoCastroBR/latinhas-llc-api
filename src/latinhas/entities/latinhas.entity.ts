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

  @Column()
  demandaId: number;

  @ManyToOne(() => Latinhas, (latinhas) => latinhas.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'demandaId' })
  demanda: Demandas;
}
