import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QueryService {
  constructor(private prisma: PrismaService) {}

  async getMany(model: string, params: {
    skip?: number;
    take?: number;
    cursor?: string;
    where?: any;
    orderBy?: any;
    select?: any;
  }) {
    const { skip, take, cursor, where, orderBy, select } = params;

    // Validate model
    if (!this.prisma[model]) {
      throw new BadRequestException(`Invalid model: ${model}`);
    }

    // Ensure skip and take are numbers
    const parsedSkip = skip !== undefined ? Number(skip) : undefined;
    const parsedTake = take !== undefined ? Number(take) : undefined;

    if (parsedSkip !== undefined && isNaN(parsedSkip)) {
      throw new BadRequestException('Invalid skip parameter');
    }

    if (parsedTake !== undefined && isNaN(parsedTake)) {
      throw new BadRequestException('Invalid take parameter');
    }

    try {
      return await this.prisma[model].findMany({
        skip: parsedSkip,
        take: parsedTake,
        cursor: cursor ? { id: cursor } : undefined,
        where,
        orderBy,
        select,
      });
    } catch (error) {
      throw new BadRequestException(`Error querying ${model}: ${error.message}`);
    }
  }

  async count(model: string, where: any) {
    if (!this.prisma[model]) {
      throw new BadRequestException(`Invalid model: ${model}`);
    }

    try {
      return await this.prisma[model].count({ where });
    } catch (error) {
      throw new BadRequestException(`Error counting ${model}: ${error.message}`);
    }
  }
}

// Utility functions
export function createPaginationQuery(page: number | string, limit: number | string) {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || isNaN(parsedLimit)) {
    throw new BadRequestException('Invalid page or limit parameter');
  }

  const skip = (parsedPage - 1) * parsedLimit;
  return { skip, take: parsedLimit };
}

export function createFilterQuery(filter: string, fields: string[]) {
  if (!filter) return {};

  return {
    OR: fields.map(field => ({
      [field]: { contains: filter, mode: 'insensitive' }
    }))
  };
}

export function createSortQuery(sortBy: string, sortOrder: 'asc' | 'desc' = 'asc') {
  if (!sortBy) return {};

  return { [sortBy]: sortOrder };
}

//more useful functions
export function createDateRangeQuery(startDate: Date, endDate: Date) {
  return {
    createdAt: {
      gte: startDate,
      lte: endDate
    }
  };
}
