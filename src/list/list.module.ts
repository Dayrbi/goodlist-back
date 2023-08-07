import { Module, forwardRef } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { List } from './list.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [
    SequelizeModule.forFeature([List, User]),
    forwardRef(() => AuthModule),
  ],
})
export class ListModule {}
