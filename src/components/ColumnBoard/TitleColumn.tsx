import { cn } from '@/lib/utils';
import { TitleColumnProps } from '@/types/TitleColumn.types';

export function TitleColumn(props: TitleColumnProps) {
  return (
    <div
      className={cn(
        'text-white text-sm flex justify-center bg-slate-500 p-1 rounded-sm',
        props.className,
      )}
    >
      <span>{props.title}</span>
      <span>{props.children}</span>
    </div>
  );
}
