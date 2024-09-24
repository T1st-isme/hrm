import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {


        // Request Timing and Performance Monitoring
        this.$use(async (params, next) => {
            const before = Date.now();
            const result = await next(params);
            const after = Date.now();

            console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
            return result;
        });

        // Audit logs
        this.$use(async (params, next) => {
            if (['create', 'update', 'delete'].includes(params.action)) {
              const result = await next(params);

              console.log(`[${params.action.toUpperCase()}] Model: ${params.model}`);
              console.log('Data:', params.args.data);

              // Optionally, store logs in a logging service or database
              // e.g., await prisma.auditLog.create({ data: { model: params.model, action: params.action, data: JSON.stringify(params.args) }});

              return result;
            }

            return next(params);
        });

        // Rate limiting
        const rateLimit = new Map<string, { count: number, lastRequest: number }>();

        this.$use(async (params, next) => {
          const key = `${params.model}-${params.action}`;

          if (!rateLimit.has(key)) {
            rateLimit.set(key, { count: 1, lastRequest: Date.now() });
          } else {
            const entry = rateLimit.get(key);
            const now = Date.now();

            if (now - entry.lastRequest < 1000) { // Check if last request was within 1 second
              entry.count++;

              if (entry.count > 5) { // Limit to 5 requests per second
                throw new Error('Too many requests');
              }
            } else {
              entry.count = 1;
              entry.lastRequest = now;
            }
          }
          return next(params);
        });

        // Set createdAt field for Employee model
        this.$use(async (params, next) => {
            if (params.model === 'Employee' && params.action === 'create') {
              params.args.data.createdAt = new Date();
            }

            return next(params);
        });

        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
