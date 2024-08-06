import { WrapperPages } from '@/components/WrapperPages';
import { TitlePage } from '@/components/TitlePage';
import { Column } from '@/components/ColumnBoard/Column';
import { Task } from '@/components/Task';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DEFAULT_TITLE_COLUMN } from '@/constants';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TasksService } from '@/services/tasks.services';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { dataTask } from '@/types/Task.types';

export function Home() {
  const [tasks, setTasks] = useState<dataTask[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    TasksService.getAllTasks().then((data: dataTask[]) => {
      setTasks(data);
    });
  }, []);

  const changeListTasks = async (task: dataTask) => {
    await TasksService.updateTask(task);
    setTasks((prevTasks): dataTask[] => {
      const filterTasks = prevTasks.filter((item) => item.id !== task.id);
      return [...filterTasks, task];
    });
  };

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'sprint',
    },
  });

  const onSubmit = async (value: dataTask): Promise<void> => {
    await TasksService.createTask(value);
    changeListTasks(value);
    setOpen(false);
  };

  return (
    <>
      <WrapperPages>
        <TitlePage title="CRM System" className="mb-7 w-full">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button>Добавить</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Новая задача</AlertDialogTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название задачи</FormLabel>
                        <FormControl>
                          <Input placeholder="Название задачи" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Описание</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Описание" {...field} />
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
        </TitlePage>
        <div className={'flex flex-1'}>
          <DndProvider backend={HTML5Backend}>
            {Object.keys(DEFAULT_TITLE_COLUMN).map((key: string, index) => {
              return (
                <Column keyTitleColumn={key} className="p-2" key={key + index}>
                  {tasks
                    .filter(
                      (task) =>
                        task.status?.toLocaleLowerCase() ===
                        key.toLocaleLowerCase(),
                    )
                    .map((tick) => {
                      return (
                        <Task
                          isPopover
                          className="mb-2 w-full"
                          data={tick}
                          key={tick.id}
                          onDrop={changeListTasks}
                        />
                      );
                    })}
                </Column>
              );
            })}
          </DndProvider>
        </div>
      </WrapperPages>
    </>
  );
}
