import { WrapperPages } from '@/components/WrapperPages';
import { TitlePage } from '@/components/TitlePage';
import { Row } from '@/components/Row';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { DEFAULT_TITLE_CUSTOMERS } from '@/constants/index';
import { Customer } from '@/types/Customers.types';

import logo from '@/assets/react.svg';
import { TrashIcon, CardStackPlusIcon } from '@radix-ui/react-icons';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { customersServices } from '@/services/customers.services';

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [baseCustomersList, setBaseCustomersList] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const randomNumberInRange = () => {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  };

  const deleteCustomer = (id: number) => {
    customersServices.removeCustomer(id);
    setCustomers((prev: Customer[]): Customer[] => {
      return prev.filter((cust: Customer): boolean => cust.id !== id);
    });
  };
  const filterCunstomers = () => {
    if (!searchTerm.length) {
      return baseCustomersList;
    }
    const result: Customer[] = [];
    customers.forEach((cust: Customer): Customer[] => {
      Object.values(cust).forEach((item) => {
        if (typeof item !== 'string') return;

        if (item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
          result.push(cust);
          return;
        }
      });
      return result;
    });

    if (result.length) {
      return result;
    }

    return result;
  };
  useEffect(() => {
    customersServices.getCustomers().then((resp) => {
      setBaseCustomersList(resp);
      setCustomers(resp);
    });
  }, []);

  useEffect(() => {
    const list = filterCunstomers();
    setCustomers(list);
  }, [searchTerm]);

  const form = useForm({
    defaultValues: {
      avatar: '',
      email: '',
      company: '',
      info: '',
    },
  });

  const onSubmit = async (value: any) => {
    value.id = randomNumberInRange();
    await customersServices.createCustomer(value);
    setOpen(false);
    setCustomers((prev) => {
      return [...prev, value];
    });
    form.reset();
  };

  return (
    <WrapperPages>
      <TitlePage title="Clients" className={'mb-7'} />
      <Input
        type="text"
        placeholder="Search"
        className={'text-white mb-5'}
        onInput={(event) =>
          setSearchTerm((event.target as HTMLInputElement).value)
        }
      />
      <div className={'wrapper w-full'}>
        <Row>
          {DEFAULT_TITLE_CUSTOMERS.map((title, index) => {
            return (
              <div
                className="text-white flex-auto basis-2/12"
                key={title + index}
              >
                {title}
              </div>
            );
          })}
          {
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button onClick={() => setOpen}>
                  <CardStackPlusIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Создать пользователя</AlertDialogTitle>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Компания</FormLabel>
                          <FormControl>
                            <Input placeholder="Компания" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="info"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Описание</FormLabel>
                          <FormControl>
                            <Input placeholder="Описание" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Сохранить</Button>
                  </form>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          }
        </Row>
        {customers.map((customer: Customer, key) => {
          return (
            <Row key={key} className={'items-center'}>
              <div
                className={'rounded-full flex-auto basis-2/12 overflow-hidden'}
              >
                <img
                  src={customer.avatar.length ? customer.avatar : logo}
                  className={'max-w-[50px] w-full object-none'}
                />
              </div>
              <div className="text-white flex-auto basis-2/12">
                {customer.company}
              </div>
              <div className="text-white flex-auto basis-2/12">
                {customer.email}
              </div>
              <div className="text-white flex-auto basis-2/12">
                {customer.info}
              </div>
              <Button onClick={() => deleteCustomer(customer.id)}>
                <TrashIcon />
              </Button>
            </Row>
          );
        })}
      </div>
    </WrapperPages>
  );
}
