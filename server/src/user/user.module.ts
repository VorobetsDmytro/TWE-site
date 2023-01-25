import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [UserController],
  providers: [UserRepository],
  imports: [
    DbModule,
    TokenModule,
    RoleModule
  ],
  exports: [UserRepository]
})
export class UserModule {}
