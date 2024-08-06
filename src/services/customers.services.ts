import { URL_CUSTOMERS, URL_CUSTOMERS_CREATE, URL_CUSTOMERS_DELETE } from "@/constants";
import { Customer } from '@/types/Customers.types';
import { api } from "@/api";

export class CustomersServices {

  async getCustomers() {
    const { data } = await api.get(URL_CUSTOMERS);

    return data || [];
  }

  async createCustomer(customer: Customer) {
    await api.post(URL_CUSTOMERS_CREATE, customer);
  }

  async removeCustomer(id: number) {
    await api.delete(URL_CUSTOMERS_DELETE, {
      data: {
        id
      }
    })
  }
}

export const customersServices = new CustomersServices();