import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Alerts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'date' })
  date: Date;

  @Column({ nullable: true, type: 'varchar' })
  text: string;
}

export default Alerts;