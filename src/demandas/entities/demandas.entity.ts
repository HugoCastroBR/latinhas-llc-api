import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
