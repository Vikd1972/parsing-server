import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class AvitoLinks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  title: string;

  @Column({ nullable: true, type: 'varchar' })
  path: string;

  @Column({ nullable: true, type: 'boolean', default: 'false' })
  isCheck: boolean;
}

export default AvitoLinks;
