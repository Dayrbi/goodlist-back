import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuth } from 'src/auth/jwt-auth';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuth)
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }
  @UseGuards(JwtAuth)
  @Get('/getUserByEmail')
  getOneByEmail(@Headers() { email }) {
    return this.usersService.getUserByEmail(email);
  }
}
