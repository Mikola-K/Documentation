/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Visitor } from '.prisma/client';
import { CreateVisitorDto, UpdateVisitorDto } from '../../dto/visitor.dto';
import { StoreVisitorService } from './storeVisitor.service';

@Controller('store')
export class StoreVisitorController {
  constructor(private readonly storeService: StoreVisitorService) {}

  @Post('visitors')
  async addVisitor(@Body() visitorDto: CreateVisitorDto): Promise<Visitor> {
    return await this.storeService.createVisitor(visitorDto);
  }

  @Get('visitors')
  async getVisitors(): Promise<Visitor[]> {
    return await this.storeService.getVisitors();
  }

  @Get('visitors/:id')
  async getVisitorById(@Param('id') id: string): Promise<Visitor | null> {
    const visitorId = parseInt(id); 
    return await this.storeService.getVisitorById(visitorId);
  }

  @Put('visitors/:id')
  async updateVisitor(
    @Param('id') id: string,
    @Body() visitorDto: UpdateVisitorDto,
  ): Promise<Visitor> {
    const visitorId = parseInt(id); 
    return await this.storeService.updateVisitor(visitorId, visitorDto);
  }

  @Delete('visitors/:id')
  async deleteVisitor(@Param('id') id: string): Promise<void> {
    const visitorId = parseInt(id); 
    return await this.storeService.deleteVisitor(visitorId);
  }

  @Get('visitors/csv/read-csv')
  async readCsv(): Promise<void> {
    return this.storeService.readCsv();
  }
}
