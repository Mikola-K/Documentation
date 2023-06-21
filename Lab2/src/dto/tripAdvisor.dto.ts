/* eslint-disable prettier/prettier */
import { ObjectDto } from './object.dto';
import { VisitorDto } from './visitor.dto';

export interface TripAdvisorDto {
  id: number;
  rating: number;
  comment: string;
  object: ObjectDto;
  visitor: VisitorDto;
}
export interface CreateObjectDto {
  name: string;
  location: string,
  description: string,
  type: string
}
export interface CreateRatingDto {
  value: number;
}
export interface CreateCommentDto {
  content: string;
}

export interface CreateTripAdvisorDto {
  name: string;
}

export interface UpdateTripAdvisorDto {
  name?: string;
}
