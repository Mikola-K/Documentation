/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { PrismaService } from '../../prisma/prisma.service';
import { StoreVisitorRepository } from './storeVisitor.repository';
import { Visitor } from '.prisma/client';

@Injectable()
export class PrismaVisitorRepository implements StoreVisitorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCsv() {
    try {
      const stream = fs
        .createReadStream('../../../src//csv//visitors.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const visitor: Visitor = {
          id: parseInt(row['id']),
          name: row['name'],
        };
        await this.createVisitor(visitor);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err}`,
      );
    }
  }

  async createVisitor(visitor: Visitor): Promise<Visitor> {
    const createdVisitor = await this.prisma.visitor.create({
      data: visitor,
    });
    return createdVisitor;
  }

  async getVisitors(): Promise<Visitor[]> {
    return await this.prisma.visitor.findMany();
  }

  async getVisitorById(id: number): Promise<Visitor | null> {
    return await this.prisma.visitor.findUnique({
      where: { id },
    });
  }

  async updateVisitor(id: number, visitor: Visitor): Promise<Visitor> {
    const existingVisitor = await this.prisma.visitor.findUnique({
      where: { id },
    });

    if (existingVisitor && visitor) {
      return await this.prisma.visitor.update({
        where: { id },
        data: visitor,
      });
    } else {
      throw new Error('Visitor not found or not defined');
    }
  }

  async deleteVisitor(id: number): Promise<void> {
    await this.prisma.visitor.delete({
      where: { id },
    });
  }
}
