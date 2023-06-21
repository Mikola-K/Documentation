/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TripAdvisorController } from "./tripAdvisor.controller";
import { TripAdvisorService } from "./tripAdvisor.service";
import { TripAdvisorPrismaRepository } from "./tripAdvisor.PrismaRepository";
import { TRIPADVISORREPOSITORY } from '../constants/constants';

@Module({
  controllers: [TripAdvisorController],
  providers: [
    TripAdvisorService,
    {
      provide: TRIPADVISORREPOSITORY,
      useClass: TripAdvisorPrismaRepository,
    },
  ],
})
export class TripAdvisorModule {}
