import { WrapperPages } from '@/components/WrapperPages';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/loadingSlice';
import { feedbackService } from '@/services/feedback.service';
import { useSelector } from 'react-redux';
import { setIsShow, setIsSuccess } from '@/store/alertSlice';

export function Feedback() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const formSchema = z.object({
    message: z.string().min(1),
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      email: user.email,
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>): Promise<void> => {
    await dispatch(setLoading(true));
    await feedbackService.sendMessage(value).finally(async () => {
      await dispatch(setLoading(false));
      await dispatch(setIsShow(true));
      await dispatch(setIsSuccess(true));
    });
  };

  return (
    <WrapperPages className="flex flex-wrap pl-5">
      <p className="text-white w-full">Feedback</p>
      <div className={'w-full'}></div>
      <Form {...form}>
        <form
          className={'mt-2 mb-2 min-w-[320px] max-w-[50%] w-full'}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-white">
                  Отправьте свое сообщение нам:
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Сообщение"
                    {...field}
                    className={'min-h-[150px] text-white text-sm'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline">
            Отправить
          </Button>
        </form>
      </Form>
    </WrapperPages>
  );
}
