/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Visitor } from '.prisma/client';
import { CreateVisitorDto, UpdateVisitorDto } from '../../dto/visitor.dto';
import type { StoreVisitorRepository } from './storeVisitor.repository';
import { STORE_VISITOR_REPOSITORY, } from '../../constants/constants';

@Injectable()
export class StoreVisitorService {
  constructor(
    @Inject (STORE_VISITOR_REPOSITORY)
    private readonly storeRepository: StoreVisitorRepository) { }

  async createVisitor(visitorDto: CreateVisitorDto): Promise<Visitor> {
    return await this.storeRepository.createVisitor(visitorDto);
  }

  async getVisitors(): Promise<Visitor[]> {
    return await this.storeRepository.getVisitors();
  }

  async getVisitorById(id: number): Promise<Visitor | null> {
    return await this.storeRepository.getVisitorById(id);
  }

  async updateVisitor(
    id: number,
    visitorDto: UpdateVisitorDto,
  ): Promise<Visitor> {
    return await this.storeRepository.updateVisitor(id, visitorDto);
  }

  async deleteVisitor(id: number): Promise<void> {
    return await this.storeRepository.deleteVisitor(id);
  }

  async readCsv(): Promise<void> {
    return await this.storeRepository.readCsv();
  }
}
