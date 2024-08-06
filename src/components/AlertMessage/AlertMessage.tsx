import { Alert, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { setIsShow } from '@/store/alertSlice';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export function AlertMessage(props) {
  const { message = '' } = props;

  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => {
    return {
      isSuccess: state.alert.isSuccess,
    };
  });

  let information = 'Что то пошло не так...';
  let icon = <Cross1Icon className="inset-y-auto" />;

  if (isSuccess) {
    icon = <CheckIcon className="inset-y-auto" />;
    information = 'У Вас все получилось';
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsShow(false));
    }, 4000);
  }, []);

  return (
    <Alert
      variant={isSuccess ? 'default' : 'destructive'}
      className={cn('absolute right-1 w-[350px] flex items-center bottom-2')}
    >
      {icon}
      <AlertTitle>{message.length ? message : information}</AlertTitle>
    </Alert>
  );
}
