import { Module, forwardRef } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { RoleController } from './role.controller';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { RoleRepository } from './role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleRepository],
  imports: [
    DbModule,
    forwardRef(() => TokenModule),
    forwardRef(() => UserModule)
  ],
  exports: [
    RoleRepository
  ]
})
export class RoleModule {}
