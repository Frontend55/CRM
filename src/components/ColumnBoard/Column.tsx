import { cn } from '@/lib/utils';
import { TitleColumn } from './TitleColumn';
import { useDrop } from 'react-dnd';
import { DEFAULT_TITLE_COLUMN } from '@/constants';
import { ColumnProps } from '@/types/ColumnBoard.types';

export function Column(props: ColumnProps) {
  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: () => ({
      status: props.keyTitleColumn,
    }),
  }));
  return (
    <div
      ref={drop}
      className={cn('flex flex-col basis-3/12 min-h-full', props.className)}
    >
      <TitleColumn
        title={DEFAULT_TITLE_COLUMN[props.keyTitleColumn]}
        className={'mb-5'}
      />
      <div>{props.children}</div>
    </div>
  );
}
