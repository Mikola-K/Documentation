/* eslint-disable prettier/prettier */
import { TripAdvisor } from '.prisma/client';

export interface StoreTripAdvisorRepository {
  readCsv(): Promise<void>;
  createTripAdvisor(tripAdvisor: TripAdvisor): Promise<TripAdvisor>;
  getTripAdvisorById(id: number): Promise<TripAdvisor | null>;
  getTripAdvisors(): Promise<TripAdvisor[]>;
  updateTripAdvisor(id: number,tripAdvisor: Partial<TripAdvisor>): Promise<TripAdvisor>;
  deleteTripAdvisor(id: number): Promise<void>;
}
