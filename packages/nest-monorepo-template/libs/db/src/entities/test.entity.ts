import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @CreateDateColumn({
    readonly: true,
    select: false
  })
  createTime: string;

  @UpdateDateColumn({
    select: false
  })
  updateTime: string;
}
