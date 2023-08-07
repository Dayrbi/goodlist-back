import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { JwtAuth } from 'src/auth/jwt-auth';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}
  @UseGuards(JwtAuth)
  @Post('/create')
  createList(@Body() dto: CreateListDto) {
    return this.listService.createList(dto);
  }
  @Get('/getAll')
  getAllList() {
    return this.listService.getAllList();
  }
  @UseGuards(JwtAuth)
  @Get('/getOnebyUserId')
  getOnebyUserId(@Headers() { userId }) {
    return this.listService.getAllByUsersId(userId);
  }
  @Get('/getOneById')
  getOneById(@Headers() { id }) {
    return this.listService.getOneById(id);
  }
  @Put('/updateList')
  updateList(@Body() dto: UpdateListDto) {
    return this.listService.updateList(dto);
  }
  @Delete('/deleteList')
  deleteList(@Headers() { id }) {
    return this.listService.deleteList(id);
  }
}
