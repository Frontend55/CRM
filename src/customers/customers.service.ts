import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customers.models';
import { CustomerDTO } from './dto';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer) private readonly customerRepository:
    typeof Customer) { }

  async getCunstomers(): Promise<CustomerDTO[]> {
    return await this.customerRepository.findAll();
  }

  async getCustomer(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id }
    });

    if (!customer) throw new Error('Customer now found!');

    return customer;
  }

  async createCustomer(customer): Promise<CustomerDTO> {
    await this.customerRepository.create(customer);
    return customer;
  }

  async removeCustomer(id: number) {
    const customer = await this.getCustomer(id);

    if (!customer) throw new Error('Customer now found!');

    return await this.customerRepository.destroy({
      where: {
        id,
      }
    });
  }
}
