/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { StoreTripAdvisorRepository } from './storeTripAdvisor.repository';
import { TripAdvisor } from '.prisma/client';
import {
  CreateTripAdvisorDto,
  UpdateTripAdvisorDto,
} from '../../dto/tripAdvisor.dto';
import { STORE_TRIPADVISOR_REPOSITORY } from '../../constants/constants';

@Injectable()
export class StoreTripAdvisorService {
  constructor(
    @Inject(STORE_TRIPADVISOR_REPOSITORY)
    private readonly storeTripAdvisorRepository: StoreTripAdvisorRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getTripAdvisors(): Promise<TripAdvisor[]> {
    return this.storeTripAdvisorRepository.getTripAdvisors();
  }

  async getTripAdvisorById(id: number): Promise<TripAdvisor | null> {
    return this.storeTripAdvisorRepository.getTripAdvisorById(id);
  }

  async createTripAdvisor(
    createTripAdvisorDto: CreateTripAdvisorDto,
  ): Promise<TripAdvisor> {
    const { name } = createTripAdvisorDto;

    const createdTripAdvisor = await this.prisma.tripAdvisor.create({
      data: {
        name,
      },
    });

    return createdTripAdvisor;
  }

  async updateTripAdvisor(
    id: number,
    updateTripAdvisorDto: UpdateTripAdvisorDto,
  ): Promise<TripAdvisor> {
    return this.storeTripAdvisorRepository.updateTripAdvisor(
      id,
      updateTripAdvisorDto,
    );
  }

  async deleteTripAdvisor(id: number): Promise<void> {
    return this.storeTripAdvisorRepository.deleteTripAdvisor(id);
  }
}
