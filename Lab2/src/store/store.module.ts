/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StoreVisitorController } from './storeVisitor/storeVisitor.controller';
import { StoreTripAdvisorController } from './storeTripAdvisor/storeTripAdvisor.controller';

import { StoreVisitorService } from './storeVisitor/storeVisitor.service';
import { StoreTripAdvisorService } from './storeTripAdvisor/storeTripAdvisor.service';

import {
  STORE_VISITOR_REPOSITORY,
  STORE_TRIPADVISOR_REPOSITORY,
} from '../constants/constants';

import { PrismaVisitorRepository } from './storeVisitor/store.PrismaVisitorRepository';
import { PrismaTripAdvisorRepository } from './storeTripAdvisor/store.PrismaTripAdvisorRepository';

@Module({
  controllers: [
    StoreVisitorController,
    StoreTripAdvisorController
  ],
  providers: [
    StoreVisitorService,
    StoreTripAdvisorService,
    {
      provide: STORE_VISITOR_REPOSITORY,
      useClass: PrismaVisitorRepository,
    },
    {
      provide: STORE_TRIPADVISOR_REPOSITORY,
      useClass: PrismaTripAdvisorRepository,
    }
  ],
})
export class StoreModule {}
