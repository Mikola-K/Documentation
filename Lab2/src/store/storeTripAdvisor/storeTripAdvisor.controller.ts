/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { StoreTripAdvisorService } from './storeTripAdvisor.service';
import { CreateTripAdvisorDto, UpdateTripAdvisorDto } from '../../dto/tripAdvisor.dto';

@Controller('tripadvisor')
export class StoreTripAdvisorController {
  constructor(private readonly storeTripAdvisorService: StoreTripAdvisorService) {}

  @Get()
  async getTripAdvisors() {
    return this.storeTripAdvisorService.getTripAdvisors();
  }

  @Get(':id')
  async getTripAdvisorById(@Param('id') id: string) {
    const tripAdvisorId = parseInt(id); 
    return this.storeTripAdvisorService.getTripAdvisorById(tripAdvisorId);
  }

  @Post()
  async createTripAdvisor(@Body() createTripAdvisorDto: CreateTripAdvisorDto) {
    return this.storeTripAdvisorService.createTripAdvisor(createTripAdvisorDto);
  }

  @Put(':id')
  async updateTripAdvisor(
    @Param('id') id: string,
    @Body() updateTripAdvisorDto: UpdateTripAdvisorDto,
  ) {
    const tripAdvisorId = parseInt(id); 
    return this.storeTripAdvisorService.updateTripAdvisor(tripAdvisorId, updateTripAdvisorDto);
  }

  @Delete(':id')
  async deleteTripAdvisor(@Param('id') id: string) {
    const tripAdvisorId = parseInt(id); 
    return this.storeTripAdvisorService.deleteTripAdvisor(tripAdvisorId);
  }
}
