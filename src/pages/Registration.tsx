import { WrapperPages } from '@/components/WrapperPages';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { authService } from '@/services/auth.service';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

export function Registration() {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await authService.registration(value);
    navigate('/login');
  };

  return (
    <WrapperPages className="flex content-center justify-center items-center flex-col">
      <div className={'text-white mb-2'}>Зарегистрироваться</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  bg-slate-600 p-5 rounded-xl overflow-hidden w-[320px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Зарегистрироваться</Button>
        </form>
      </Form>
    </WrapperPages>
  );
}
