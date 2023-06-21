/* eslint-disable prettier/prettier */
import { ReviewDto } from "./review.dto";

export interface VisitorDto {
  id: number;
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
  reviews?: ReviewDto[];
}

export interface CreateVisitorDto {
  name: string;
}

export interface UpdateVisitorDto {
  name: string
}
