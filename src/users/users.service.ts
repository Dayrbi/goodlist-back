import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const users = this.userRep.findAll({ include: { all: true } });
      return users;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserByEmail(email: string) {
    try {
      const user = await this.userRep.findOne({ where: { email } });
      return user;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
