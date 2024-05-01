import { UserRole } from '../../utils/user-role.enum';

export const usersMock = [
  {
    id: 1,
    name: 'Isa',
    email: 'isamoura@gmail.com',
    password: 'hamster',
    role: UserRole.BUYER,
  },
  {
    id: 2,
    name: 'Nazaré',
    email: 'nazare@gmail.com',
    password: 'nao_eh_12345',
    role: UserRole.SELLER,
  },
  {
    id: 3,
    name: 'Jon Snow',
    email: 'jonsnowman@gmail.com',
    password: 'inquebrável',
    role: UserRole.BUYER,
  },
  {
    id: 4,
    name: 'Bartolomeu',
    email: 'bartman@gmail.com',
    password: 'jamais_vai_adivinhar',
    role: UserRole.SELLER,
  },
  {
    id: 5,
    name: 'Delícia',
    email: 'delicia@gmail.com',
    password: 'agora_eh_12345',
    role: UserRole.BUYER,
  },
];
