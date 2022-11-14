/* eslint-disable prettier/prettier */
import {Deposits, Home, Profile, Withdraw} from '../layouts';

export const routers = {
  Home: 'Home',
  Profile: 'Profile',
  Deposits: 'Deposits',
  Withdraw: 'Withdraw',
};

const RouterObject = [
  {
    name: routers.Home,
    component: Home,
    icon: 'home',
    color: null,
    size: null,
  },
  {
    name: routers.Deposits,
    component: Deposits,
    icon: 'wallet',
    color: null,
    size: null,
  },
  {
    name: routers.Withdraw,
    component: Withdraw,
    icon: 'money-check-alt',
    color: null,
    size: null,
  },
  {
    name: routers.Profile,
    component: Profile,
    icon: 'user',
    color: null,
    size: null,
  },
];

export default RouterObject;
