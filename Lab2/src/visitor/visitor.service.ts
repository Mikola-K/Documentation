/* eslint-disable prettier/prettier */
// 
import { Injectable, Inject} from '@nestjs/common';
import type { VisitorRepository } from './visitor.repository';
import { ReviewDto } from '../../src/dto/review.dto';
import { Review } from '@prisma/client';
import { VISITOR_REPOSITORY } from '../constants/constants';

@Injectable()
export class VisitorService {
  constructor(
    @Inject(VISITOR_REPOSITORY)
    private readonly visitorRepository: VisitorRepository) { }

  async getReviews(): Promise<Review[]> {
    return this.visitorRepository.getReviews();
  }

  async getReviewById(id: string): Promise<Review | null> {
    return this.visitorRepository.getReviewById(id);
  }

  async addReview(reviewDto: ReviewDto): Promise<Review> {
    return this.visitorRepository.addReview(reviewDto);
  }

  async updateReview(id: string, reviewDto: ReviewDto): Promise<Review> {
    return this.visitorRepository.updateReview(id, reviewDto);
  }

  async deleteReviewById(id: string): Promise<void> {
    return this.visitorRepository.deleteReviewById(id);
  }
}