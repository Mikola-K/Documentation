/* eslint-disable prettier/prettier */
import { Visitor } from '@prisma/client';
import { CreateVisitorDto, UpdateVisitorDto } from '../../dto/visitor.dto';

export interface StoreVisitorRepository {
  createVisitor(createVisitorDto: CreateVisitorDto): Promise<Visitor>;
  getVisitorById(id: number): Promise<Visitor | null>;
  getVisitors(): Promise<Visitor[]>;
  updateVisitor(id: number, updateVisitorDto: UpdateVisitorDto): Promise<Visitor>;
  deleteVisitor(id: number): Promise<void>;
  readCsv(): Promise<void>;
}
