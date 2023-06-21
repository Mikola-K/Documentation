/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VisitorModule } from './visitor/visitor.module';
import {TripAdvisorModule} from './tripAdvisor/tripAdvisor.module'
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    VisitorModule,
    TripAdvisorModule,
    PrismaModule,
    StoreModule,
  ],
})
export class AppModule {}
