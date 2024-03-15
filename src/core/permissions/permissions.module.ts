import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../permissions/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [],
  providers: [],
})
export class PermissionsModule {}
