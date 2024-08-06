import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDTO } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @UseGuards(AuthGuard)
  @Get()
  getAllCustomers() {
    return this.customersService.getCunstomers();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() customer: CustomerDTO) {
    this.customersService.createCustomer(customer);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Body() { id }) {
    this.customersService.removeCustomer(id)
  }
}
