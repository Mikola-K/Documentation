/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TripAdvisorService } from './tripAdvisor.service';
import {
  CreateRatingDto,
  CreateCommentDto,
} from './../dto/tripAdvisor.dto';
import { MyObject } from '@prisma/client';

@Controller('object')
export class TripAdvisorController {
  constructor(private readonly tripAdvisorService: TripAdvisorService) {}

  @Get()
  async getObjects() {
    return await this.tripAdvisorService.getObjects();
  }
  @Post()
  async createObject(
    @Body('name') name: string,
    @Body('location') location: string,
    @Body('description') description: string,
    @Body('type') type: string,
  ): Promise<MyObject> {
    return await this.tripAdvisorService.createObject(
      name,
      location,
      description,
      type,
    );
  }

  @Get(':id')
  async getObjectById(@Param('id') id: string) {
    const objectId = parseInt(id); 
    return await this.tripAdvisorService.getObjectById(objectId);
  }

  @Post(':id/ratings')
  async createRating(
    @Param('id') id: string,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    const { value } = createRatingDto;
    const objectId = parseInt(id); 
    return await this.tripAdvisorService.createRating(objectId, value);
  }

  @Post(':id/comments')
  async createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { content } = createCommentDto;
    const objectId = parseInt(id); 
    return await this.tripAdvisorService.createComment(objectId, content);
  }
  @Delete(':id')
  async deleteObject(@Param('id') id: string) {
    const objectId = parseInt(id); 
    return await this.tripAdvisorService.deleteObject(objectId);
  }
}
