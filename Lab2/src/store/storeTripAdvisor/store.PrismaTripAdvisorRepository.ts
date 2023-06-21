/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StoreTripAdvisorRepository } from './storeTripAdvisor.repository';
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { TripAdvisor } from '.prisma/client';

@Injectable()
export class PrismaTripAdvisorRepository implements StoreTripAdvisorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCsv() {
    try {
      const stream = fs
        .createReadStream('../../../src//csv//tripadvisors.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const tripAdvisor: TripAdvisor = {
          id: parseInt(row['_0']),
          name: row['_1'],
        };
        await this.createTripAdvisor(tripAdvisor);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err}`,
      );
    }
  }

  async createTripAdvisor(tripAdvisor: TripAdvisor): Promise<TripAdvisor> {
    const { name } = tripAdvisor;
    const createdTripAdvisor = await this.prisma.tripAdvisor.create({
      data: {
        name,
      },
    });
    return createdTripAdvisor;
  }

  async getTripAdvisorById(id: number): Promise<TripAdvisor | null> {
    return await this.prisma.tripAdvisor.findUnique({
      where: { id },
    });
  }

  async getTripAdvisors(): Promise<TripAdvisor[]> {
    return await this.prisma.tripAdvisor.findMany();
  }

  async updateTripAdvisor(
    id: number,
    tripAdvisor: Partial<TripAdvisor>,
  ): Promise<TripAdvisor> {
    return await this.prisma.tripAdvisor.update({
      where: { id },
      data: tripAdvisor,
    });
  }

  async deleteTripAdvisor(id: number): Promise<void> {
    await this.prisma.tripAdvisor.delete({
      where: { id },
    });
  }
}
