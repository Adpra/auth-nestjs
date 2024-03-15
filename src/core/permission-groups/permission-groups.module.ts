import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionGroup } from './entities/permission-group.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PermissionGroup])],
  controllers: [],
  providers: [],
})
export class PermissionGroupsModule {}
