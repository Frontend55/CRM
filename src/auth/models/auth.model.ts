import { Column, Table, Model } from "sequelize-typescript";

@Table
export class AuthModel extends Model {
  @Column
  email: string
  @Column
  password: string
}