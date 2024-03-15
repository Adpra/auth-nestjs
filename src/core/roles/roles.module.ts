import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entities';
import { Permission } from '../permissions/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [],
  providers: [],
})
export class RolesModule {}
