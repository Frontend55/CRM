import { cn } from '@/lib/utils';
import { RowTypes } from '@/types/Row.types';

export function Row(props: RowTypes) {
  return (
    <div
      className={cn(
        'flex flex-row w-full p-2 border-b border-gray-800',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
