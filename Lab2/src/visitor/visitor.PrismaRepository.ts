/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Review } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import csvParser from 'csv-parser';
import * as fs from "fs";

@Injectable()
export class PrismaVisitorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCsv(): Promise<void> {
    try {
      const stream = fs
        .createReadStream('../csv/reviews.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const review: Review = {
          id: row['_0'],
          content: row['_1'],
          ratingValue: row['_2'],
          visitorId: parseInt(row['_3']),
          objectId: parseInt(row['_4']),
          tripAdvisorId: parseInt(row['_5']),
        };

        await this.addReview(review);
      }
    } catch (err) {
      throw new Error(`An error occurred while reading CSV file: ${err}`);
    }
  }

  async addReview(review: Review): Promise<Review> {
    const { content, ratingValue, visitorId, objectId, tripAdvisorId } = review;

    const visitorExists = await this.prisma.visitor.findUnique({
      where: { id: visitorId },
    });

    if (!visitorExists) {
      throw new Error(`Visitor with id ${visitorId} not found`);
    }

    const myObjectExists = await this.prisma.myObject.findUnique({
      where: { id: objectId },
    });

    if (!myObjectExists) {
      throw new Error(`MyObject with id ${objectId} not found`);
    }

    const tripAdvisorExists = await this.prisma.tripAdvisor.findUnique({
      where: { id: tripAdvisorId },
    });

    if (!tripAdvisorExists) {
      throw new Error(`TripAdvisor with id ${tripAdvisorId} not found`);
    }

    const createdReview = await this.prisma.review.create({
      data: {
        content,
        visitor: { connect: { id: visitorId } },
        myObject: { connect: { id: objectId } },
        tripAdvisor: { connect: { id: tripAdvisorId } },
        ratingValue,
      },
      include: {
        visitor: true,
        myObject: true,
        tripAdvisor: true,
      },
    });
    return createdReview;
  }
  

  async getReviews(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async getReviewById(id: string): Promise<Review | null> {
    return await this.prisma.review.findUnique({
      where: { id: parseInt(id) },
      include: {
        visitor: true,
        myObject: true,
        tripAdvisor: true,
      },
    });
  }

  async updateReview(id: string, review: Review): Promise<Review> {
    const existingReview = await this.prisma.review.findUnique({
      where: { id: parseInt(id) },
      include: {
        visitor: true,
        myObject: true,
        tripAdvisor: true,
      },
    });
    if (!existingReview) {
      throw new Error(`Review with id ${id} not found`);
    }

    const updatedReview = { ...existingReview };
    updatedReview.content = review.content;

    const savedReview = await this.prisma.review.update({
      where: { id: existingReview.id },
      data: { content: review.content },
      include: {
        visitor: true,
        myObject: true,
        tripAdvisor: true,
      },
    });
    return savedReview;
  }

  async deleteReviewById(id: string): Promise<void> {
    await this.prisma.review.delete({
      where: { id: parseInt(id) },
    });
  }
}
