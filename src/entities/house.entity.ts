import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './index';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  area: number;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @ManyToOne(() => User, (user) => user.id)
  seller: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
