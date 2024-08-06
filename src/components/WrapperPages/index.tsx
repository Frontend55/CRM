import { cn } from '@/lib/utils';
import { PagesProps } from '@/types/WrapperPages.types';

export function WrapperPages(props: PagesProps) {
  return (
    <div
      className={cn(
        'bg-slate-900 min-h-screen flex flex-wrap content-start p-2 flex-1',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
