/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Rating, Comment } from '@prisma/client';
import { MyObject } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class TripAdvisorPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createObject(
    name: string,
    location: string,
    description: string,
    type: string,
  ): Promise<MyObject> {
    return this.prisma.myObject.create({
      data: {
        name,
        location,
        description,
        type,
      },
    });
  }

  async getObjectById(objectId: number): Promise<MyObject | null> {
    return this.prisma.myObject.findUnique({
      where: {
        id: objectId,
      },
    });
  }

  async getObjects(): Promise<MyObject[]> {
    return this.prisma.myObject.findMany();
  }

  async updateObject(objectId: number, name: string): Promise<MyObject | null> {
    return this.prisma.myObject.update({
      where: {
        id: objectId,
      },
      data: {
        name,
      },
    });
  }

  async deleteObject(objectId: number): Promise<MyObject | null> {
    return this.prisma.myObject.delete({
      where: {
        id: objectId,
      },
    });
  }

  async createRating(
    value: number,
    visitorId: number,
    objectId: number,
    tripAdvisorId: number,
  ): Promise<Rating> {
    return this.prisma.rating.create({
      data: {
        value,
        tripAdvisor: {
          connect: { id: tripAdvisorId },
        },
        myObject: {
          connect: { id: objectId },
        },
        visitor: {
          connect: { id: visitorId },
        },
      },
    });
  }
  
  async createComment(
    tripAdvisorId: number,
    visitorId: number,
    content: string,
  ): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        content,
        visitor: { connect: { id: visitorId } },
        tripAdvisor: { connect: { id: tripAdvisorId } },
      },
    });
  }

  async readCsv(): Promise<void> {
    try {
      const stream = fs
        .createReadStream('../../src//csv/objects.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const object: MyObject = {
          id: row['_0'],
          name: row['_1'],
          location: row['_2'],
          description: row['_3'],
          type: row['_4'],
        };
        await this.addObject(object);
      }
    } catch (err) {
      throw new Error(`An error occurred while reading CSV file: ${err}`);
    }
  }

  async addObject(myObject: MyObject): Promise<void> {
    const { name, location, description, type } = myObject;
    try {
      const myObject = await this.prisma.myObject.create({
        data: {
          name,
          location,
          description,
          type,
        },
      });

      console.log(`MyObject created: ${myObject.name}`);
    } catch (error) {
      throw new Error(`Error creating myObject: ${error}`);
    }
  }
}
