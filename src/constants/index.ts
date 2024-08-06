export const BASE_URL = 'http://localhost:3000'
export const URL_MENU = 'http://localhost:3000/menu';
export const URL_TASKS = 'http://localhost:3000/tasks';
export const URL_CUSTOMERS = 'http://localhost:3000/customers';
export const URL_CUSTOMERS_CREATE = 'http://localhost:3000/customers'
export const URL_CUSTOMERS_DELETE = 'http://localhost:3000/customers'
export const URL_LOGIN = 'http://localhost:3000/auth/login';
export const URL_LOGOUT = 'http://localhost:3000/auth/logout';
export const URL_REGISTRATION = 'http://localhost:3000/auth/registration';
export const URL_REFRASH = 'http://localhost:3000/auth/refrash';
export const URL_AUTH = 'http://localhost:3000/auth/checkAuth';
export const URL_FEEDBACK = 'http://localhost:3000/feedback';
export const URL_USER = 'http://localhost:3000/user';


export const SPRINT = 'sprint';
export const INWORK = 'inWork';
export const REOPEN = 'reopen';
export const TEST = 'test';
export const DONE = 'done';

interface IIdentifier {
  readonly [key: string]: string;
}

export const DEFAULT_TITLE_COLUMN: IIdentifier = {
  SPRINT: 'Спринт',
  INWORK: 'В работе',
  REOPEN: 'Переоткрыта',
  TEST: 'В тестировании',
  DONE: 'Готово'
};

export const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: SPRINT,
  },
  {
    id: 2,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: SPRINT,
  },
  {
    id: 3,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: SPRINT,
  },
  {
    id: 4,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: INWORK,
  },
  {
    id: 5,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: INWORK,
  },
  {
    id: 6,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: REOPEN,
  },
  {
    id: 7,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: REOPEN,
  },
  {
    id: 8,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: REOPEN,
  },
  {
    id: 9,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: TEST,
  },
  {
    id: 10,
    title: 'Заголовок',
    description: 'Описание',
    date: '11.11,1111',
    creator: 'Иванов И.А',
    status: DONE,
  },
];

export const DEFAULT_TITLE_CUSTOMERS = ['Изображение', 'Наименование', 'Email', 'Дополнительная информация'];
export const DEFAULT_LIST_CUSTOMERS = [
  {
    id: 1,
    avatar: '',
    company: 'Альфабанк',
    email: 'alpha@alpa.ru',
    info: 'Яндекс'
  },
  {
    id: 2,
    avatar: '',
    company: 'Сбербанк',
    email: 'sber@sber.ru',
    info: 'Телефон'
  },
  {
    id: 3,
    avatar: '',
    company: 'Gazprom',
    email: 'gaz@gaz.ru',
    info: 'не знаю'
  },
];