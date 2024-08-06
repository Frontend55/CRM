import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Feedback extends Model {
  @Column
  message: string
  @Column
  email: string
}