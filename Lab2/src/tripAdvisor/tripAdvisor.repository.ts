/* eslint-disable prettier/prettier */
import { MyObject, Rating, Comment } from "@prisma/client";

export interface TripAdvisorRepository {
  readCsv(): Promise<void>;
  addObject(name: string, location: string,description: string,type: string): Promise<MyObject>;
  getObjectById(id: number): Promise<MyObject | null>;
  getObjects(): Promise<MyObject[]>;
  createObject(name: string, location: string,description: string,type: string): Promise<MyObject>;
  createRating(objectId: number, value: number): Promise<Rating>;
  createComment(objectId: number, content: string): Promise<Comment>;
  deleteObject(objectId: number): Promise<MyObject | null>;

}
