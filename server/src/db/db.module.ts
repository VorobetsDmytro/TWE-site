import { Module } from '@nestjs/common';
import { TWEPostgreSQLMainPrismaService } from './twe-postgreSQL-main.prisma.service';

@Module({
    providers: [
        TWEPostgreSQLMainPrismaService
    ],
    exports: [
        TWEPostgreSQLMainPrismaService
    ]
})
export class DbModule {}
