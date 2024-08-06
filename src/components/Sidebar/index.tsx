import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import logo from '@/assets/logo.png';
import { menuServices } from '@/services/menu.services';
import {
  House,
  Briefcase,
  BookA,
  UsersRound,
  MessagesSquare,
  Settings,
  DoorOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { authService } from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '@/store/authSlice';

const ICONS_MENU = {
  Home: House,
  Products: Briefcase,
  Orders: BookA,
  Customers: UsersRound,
  Feedback: MessagesSquare,
  Settings: Settings,
};

export function Sidebar() {
  const [itemsMenu, setItemsMenu] = useState([]);
  const [isShow, setIsShow] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    menuServices.getMenuRouts().then((data) => setItemsMenu(data));
  }, []);

  const getIconMenu = (nameIcon: string) => {
    return React.createElement(nameIcon, {
      name: nameIcon,
      key: nameIcon,
    });
  };

  const handleClick = () => {
    setIsShow(!isShow);
  };

  const logout = async () => {
    await authService.logout();
    navigate('/login');
    dispatch(setIsAuth(false));
  };

  return (
    <div
      className={cn(
        'bg-slate-800 min-w-60 min-h-screen flex flex-col p-5 relative',
        isShow ? '' : 'min-w-2',
      )}
    >
      <div className="mb-4 h-a justify-center flex">
        <img className={'w-[50px] max-w-[150px]'} src={logo} />
      </div>
      <ul>
        {itemsMenu && isShow
          ? itemsMenu.map(({ name, path }) => {
              return (
                <li className="mb-2 p-2" key={path}>
                  <Link
                    to={path}
                    className="text-slate-100 flex hover:text-slate-400 duration-300"
                  >
                    <span className="mr-2">
                      {getIconMenu(ICONS_MENU[name])}
                    </span>
                    {name}
                  </Link>
                </li>
              );
            })
          : ''}
      </ul>

      <Button
        className="absolute bottom-1 w-full left-0 rounded-none"
        onClick={logout}
      >
        <DoorOpen />
        <span>Выйти</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          'bg-inherit text-white top-1.5 right-1.5 absolute rotate-180 transition delay-150 hover:bg-transparent hover:text-color-white hover:opacity-25',
          isShow ? '' : 'top-20 left-1/4 rotate-0',
        )}
        onClick={handleClick}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
