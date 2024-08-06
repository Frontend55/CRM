import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TaskTemplateProps, Drop } from '@/types/Task.types';

export function TaskTemplate(props: TaskTemplateProps) {
  const { data } = props;
  const [, drop] = useDrop({
    accept: 'TASK',
  });
  const [, drag] = useDrag({
    type: 'TASK',
    item: data,
    end: (item, monitor) => {
      const dropEffect: Drop | null = monitor.getDropResult();

      if (dropEffect?.status) {
        item.status = dropEffect.status;
        props.onDrop(item);
      }
    },
  });

  const ref = useRef(null);

  drag(drop(ref));

  return (
    <Card
      className={cn(
        'p-2 bg-black hover:shadow-xl transition-shadow	cursor-pointer flex flex-wrap handle w-full',
        props.className,
      )}
      ref={ref}
    >
      <CardTitle className="mb-2 w-full justify-start flex">
        {data.title}
      </CardTitle>
      <CardDescription className="mb-2 min-h-12 max-h-50 w-full justify-start flex">
        {data.description}
      </CardDescription>
      <CardFooter className="p-0 flex-col itrms-start w-full">
        <CardDescription className="mb-2 justify-between flex w-full">
          <span>Создана:</span>
          <span>{data.date}</span>
        </CardDescription>
        <CardDescription className="justify-between flex w-full">
          <span>Исполнитель:</span>
          <span>{data.creator}</span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
