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

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  neighborhood: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  number: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: false })
  area: number;

  @ManyToOne(() => User, (user) => user.myHouses)
  owner: User;

  @ManyToOne(() => User, (user) => user.myHousesToSell)
  seller: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
