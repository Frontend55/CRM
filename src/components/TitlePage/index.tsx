import { cn } from '@/lib/utils';
import { TitleProps } from '@/types/TitlePage.types';

export function TitlePage(props: TitleProps): JSX.Element {
  return (
    <div
      className={cn(
        'text-white text-5xl flex justify-between',
        props.className,
      )}
    >
      <span>{props.title}</span>
      <div className={'mr-2'}>{props.children}</div>
    </div>
  );
}
