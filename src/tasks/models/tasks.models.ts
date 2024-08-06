import { Column, Model, Table } from "sequelize-typescript"

@Table
export class Tasks extends Model {
  @Column
  title: string
  @Column
  description: string
  @Column
  creator: string
  @Column
  status: string
}