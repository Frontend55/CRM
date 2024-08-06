import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Customer extends Model {
  @Column
  avatar: string
  @Column
  company: string
  @Column
  email: string
  @Column
  info: string
}