import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map(user => {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        photo: user.photo,
        is_active: user.is_active
      };
    });
  }

 async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } , relations: ['roles', 'roles.rolePermissions', 'permissions', 'permissions.permissionGroup']});
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      photo: user.photo,
      is_active: user.is_active,
      roles: user.roles,
      rolePermissions: user.roles.find(roles => roles)?.rolePermissions,
    };
    
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }

  async findOneByUser(condition: any): Promise<User | undefined> {
    return this.userRepository.findOne({where: condition});
  }
  
}
