import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from './list.model';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel(List) private listRep: typeof List) {}

  async createList(dto: CreateListDto) {
    try {
      const list = await this.listRep.create(dto);
      return list;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllList() {
    try {
      const lists = await this.listRep.findAll();
      return lists;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllByUsersId(userId: number) {
    try {
      const lists = await this.listRep.findAll({
        where: { userId },
        include: { all: true },
      });
      if (!lists) {
        throw new HttpException('lists not found', HttpStatus.BAD_REQUEST);
      }
      return lists;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getOneById(id: number) {
    try {
      const list = await this.listRep.findOne({
        where: { id },
        include: { all: true },
      });
      if (!list) {
        throw new HttpException('lists not found', HttpStatus.BAD_REQUEST);
      }
      return list;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateList(dto: UpdateListDto) {
    try {
      const { id, title, content } = dto;
      const list = await this.listRep.findOne({ where: { id } });
      if (!list) {
        throw new HttpException('lists not found', HttpStatus.BAD_REQUEST);
      }
      await list.update({ title, content });
      await list.save();
      return list;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteList(id: number) {
    try {
      const list = await this.listRep.findOne({ where: { id } });
      if (!list) {
        throw new HttpException('lists not found', HttpStatus.BAD_REQUEST);
      }
      await list.destroy();
      return true;
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
