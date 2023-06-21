/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import type { ReviewDto } from '../dto/review.dto';
import { Review } from '@prisma/client';

@Controller('visitors')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Get('reviews')
  async getReviews(): Promise<Review[]> {
    return this.visitorService.getReviews();
  }

  @Get('reviews/:id')
  async getReviewById(@Param('id') id: string): Promise<Review | null> {
    
    return this.visitorService.getReviewById(id);
  }

  @Post('reviews')
  async addReview(@Body() reviewDto: ReviewDto): Promise<Review> {
    return this.visitorService.addReview(reviewDto);
  }

  @Put('reviews/:id')
  async updateReview(
    @Param('id') id: string,
    @Body() reviewDto: ReviewDto,
  ): Promise<Review> {
    return this.visitorService.updateReview(id, reviewDto);
  }

  @Delete('reviews/:id')
  async deleteReviewById(@Param('id') id: string): Promise<void> {
    return this.visitorService.deleteReviewById(id);
  }
}