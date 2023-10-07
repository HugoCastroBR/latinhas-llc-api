import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Latinhas } from '../../latinhas/entities/latinhas.entity';
@Entity()
export class Demandas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dataInicio: Date;

  @Column()
  dataFim: Date;

  @Column()
  totalPlan: number;

  @Column()
  totalProd: number;

  @Column()
  status: string;

  @OneToMany(() => Latinhas, (latinhas) => latinhas.demanda)
  latinhas: Latinhas[];
}
