/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { VISITOR_REPOSITORY } from '../constants/constants';
import { PrismaVisitorRepository } from './visitor.prismaRepository';

@Module({
  controllers: [VisitorController],
  providers: [
    VisitorService,
    {
      provide: VISITOR_REPOSITORY,
      useClass: PrismaVisitorRepository,
    },
  ],
})
export class VisitorModule {}


