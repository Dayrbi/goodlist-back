import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuth } from 'src/auth/jwt-auth';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuth)
  @Get()
  getAll() {
    const users = this.usersService.getUsers();
    return users;
  }
}
