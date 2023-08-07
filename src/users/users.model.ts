import { Table, DataType, Model, Column, HasMany } from 'sequelize-typescript';
import { List } from 'src/list/list.model';

interface UsersCreationAtt {
  email: string;
  username: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, UsersCreationAtt> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => List)
  posts: List[];
}
