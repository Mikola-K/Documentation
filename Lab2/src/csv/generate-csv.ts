/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Command } from 'commander';
import * as faker from 'faker';
import { createObjectCsvWriter } from 'csv-writer';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { EventEmitter } from 'events';

const VISITORS = 1000;
const REVIEWS = 1000;
const TRIPADVISORS = 1000;
const OBJECTS = 1000;

export class CsvGenerator extends EventEmitter  {
  prisma: PrismaClient;

  constructor() {
    //this.prisma = new PrismaClient();
     super();
  }

  async generateVisitorsCsv() {
    const data = [];

    // Generate visitors data
    for (let i = 0; i < VISITORS; i++) {
      data.push({
        name: faker.name.findName(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'visitors.csv',
      header: [
        { id: 'name', title: 'Name' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Visitors CSV file generated successfully!');
  }

  async generateReviewsCsv() {
    const data = [];

    // Generate reviews data
    for (let i = 0; i < REVIEWS; i++) {
      const visitorId = Math.floor(Math.random() * VISITORS) + 1;
      const ratingValue = Math.floor(Math.random() * (5 - 0 + 1) + 0);

      data.push({
        text: faker.lorem.sentence(),
        ratingValue,
        visitorId,
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'reviews.csv',
      header: [
        { id: 'text', title: 'Text' },
        { id: 'ratingValue', title: 'Rating value' },
        { id: 'visitorId', title: 'Visitor ID' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Reviews CSV file generated successfully!');
  }

  async generateTripAdvisorsCsv() {
    const data = [];

    // Generate TripAdvisor data
    for (let i = 0; i < TRIPADVISORS; i++) {
      data.push({
        name: faker.name.findName(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'tripadvisors.csv',
      header: [
        { id: 'name', title: 'Name' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('TripAdvisors CSV file generated successfully!');
  }

  async generateObjectsCsv() {
    const data = [];

    // Generate object data
    for (let i = 0; i < OBJECTS; i++) {
      const tripAdvisorId = Math.floor(Math.random() * TRIPADVISORS) + 1;

      data.push({
        name: faker.commerce.productName(),
        location: faker.address.city(),
        description: faker.lorem.sentence(),
        tripAdvisorId,
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'objects.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'location', title: 'Location' },
        { id: 'description', title: 'Description' },
        { id: 'tripAdvisorId', title: 'TripAdvisor ID' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Objects CSV file generated successfully!');
  }
}

const program = new Command();
const myCsvGenerator = new CsvGenerator();

program
  .command('generate')
  .description('Generate CSV file with sample data for all tables')
  .option('output.csv')
  .action(async ({}) => {
    await myCsvGenerator.generateVisitorsCsv();
    await myCsvGenerator.generateReviewsCsv();
    await myCsvGenerator.generateTripAdvisorsCsv();
    await myCsvGenerator.generateObjectsCsv();
  });

program.parse(process.argv);
