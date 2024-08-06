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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { setIsAuth } from '@/store/authSlice';
import { setLoading } from '@/store/loadingSlice';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { setToken } from '@/api';
import { LoginResponseTypes } from '@/types/Login.types';

export function Login() {
  const [errorText, setErrorText] = useState('');
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await dispatch(setLoading(true));
    await authService
      .login(value)
      .then(async (response: LoginResponseTypes): Promise<void> => {
        const { token } = response;
        await setToken(token);
        await dispatch(setIsAuth(true));
        await dispatch(setUser(response));
        navigate('/');
      })
      .catch(() => {
        setErrorText('Не верный логин или пароль');
      })
      .finally(async (): Promise<void> => {
        await dispatch(setLoading(false));
      });
  };

  return (
    <WrapperPages className="flex content-center justify-center items-center flex-col">
      <div className={'text-white mb-2'}>Войти</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  bg-slate-600 p-5 rounded-xl overflow-hidden w-[320px]"
        >
          <FormMessage>{errorText}</FormMessage>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={'space-y-0'}>
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
              <FormItem className={'space-y-0'}>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={'space-y-0'}>
            Войти
          </Button>
        </form>
      </Form>
    </WrapperPages>
  );
}
