import { Column, CreateDateColumn, DeleteDateColumn, IntegerType, UpdateDateColumn } from 'typeorm';

export class Timestamp {
  @CreateDateColumn() created: Date;
  @UpdateDateColumn() updated: Date;
  @DeleteDateColumn() deletedAt?: Date;
  @Column({ type: 'smallint', default: 0 }) is_deleted?: number;
}
