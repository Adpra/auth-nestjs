import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { PoliciesGuard, RolesGuard } from 'src/common/helpers/guards';
import { CheckPolicies, Roles } from 'src/common/decorators';
import { Action } from 'src/common/enums';
import { AppAbility } from '../casl/casl-ability.factory/casl-ability.factory';
import { User } from './entities';
import { Role } from '../roles/entities/role.entity';


@Controller('users')
// @Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.UsersAll, User))
   findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    return this.usersService.findOne(+id);
  }

  @Get('find-by-user')
  findOneByUser(
    condition: any
  ) {
    return this.usersService.findOneByUser(condition);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
