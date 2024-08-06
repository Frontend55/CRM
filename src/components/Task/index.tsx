import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { TaskTemplate } from './TaskTemplate';
import { TaskProps } from '@/types/Task.types';

export function Task(props: TaskProps) {
  const { isPopover, className, data } = props;

  return isPopover ? (
    <div className={'handle'}>
      <Popover>
        <PopoverTrigger className={'w-full'}>
          <TaskTemplate
            className={cn('mb-2', className)}
            data={data}
            onDrop={props.onDrop}
          />
        </PopoverTrigger>
        <PopoverContent className={'left-2/4 top-2/4'}>
          {data.description}
        </PopoverContent>
      </Popover>
    </div>
  ) : (
    <TaskTemplate className={'mb-2'} data={data} onDrop={props.onDrop} />
  );
}
