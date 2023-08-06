import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRep: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const createdUser = await this.userRep.create(dto);
    return createdUser;
  }
  async getUsers() {
    const users = this.userRep.findAll();
    return users;
  }
  async getUserByEmail(email: string) {
    const user = await this.userRep.findOne({ where: { email } });
    return user;
  }
}
