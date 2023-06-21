/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import type { TripAdvisorRepository } from './tripAdvisor.repository';
import { MyObject, Rating, Comment } from '@prisma/client';
import { TRIPADVISORREPOSITORY } from '../constants/constants';

@Injectable()
export class TripAdvisorService {
  constructor(
    @Inject(TRIPADVISORREPOSITORY)
    private readonly tripAdvisorRepository: TripAdvisorRepository,
  ) {}

  async readCsv(): Promise<void> {
    return await this.tripAdvisorRepository.readCsv();
  }

  async addObject(
    name: string,
    location: string,
    description: string,
    type: string,
  ): Promise<MyObject> {
    return await this.tripAdvisorRepository.addObject(
      name,
      location,
      description,
      type,
    );
  }

  async getObjectById(id: number): Promise<MyObject | null> {
    return await this.tripAdvisorRepository.getObjectById(id);
  }

  async getObjects(): Promise<MyObject[]> {
    return await this.tripAdvisorRepository.getObjects();
  }

  async createObject(
    name: string,
    location: string,
    description: string,
    type: string,
  ): Promise<MyObject> {
    return await this.tripAdvisorRepository.createObject(
      name,
      location,
      description,
      type,
    );
  }

  async createRating(objectId: number, value: number): Promise<Rating> {
    return await this.tripAdvisorRepository.createRating(objectId, value);
  }

  async createComment(objectId: number, content: string): Promise<Comment> {
    return await this.tripAdvisorRepository.createComment(objectId, content);
  }
  async deleteObject(objectId: number): Promise<MyObject | null> {
    return await this.tripAdvisorRepository.deleteObject(objectId);
  }
}
