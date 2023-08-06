import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: LoginUserDto) {
    try {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async registration(userDto: CreateUserDto) {
    try {
      const { email, password } = userDto;
      const candidate = await this.userService.getUserByEmail(email);
      if (candidate) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const hashPass = await bcrypt.hash(password, 10);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPass,
      });
      return this.generateToken(user);
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async generateToken(user: User) {
    const { email, id, username } = user;
    const payload = { email, id, username };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: LoginUserDto) {
    const { email, password } = userDto;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    const equalPass = await bcrypt.compare(password, user.password);
    if (equalPass) {
      return user;
    }
    throw new UnauthorizedException({ message: 'incorrect email or password' });
  }
}
