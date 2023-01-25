import { Module } from '@nestjs/common';
import { GlobalRegionController } from './global-region.controller';
import { GlobalRegionRepository } from './global-region.repository';
import { DbModule } from 'src/db/db.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [GlobalRegionController],
  providers: [GlobalRegionRepository],
  exports: [GlobalRegionRepository],
  imports: [
    DbModule,
    TokenModule,
    UserModule,
    RoleModule
  ]
})
export class GlobalRegionModule {}
