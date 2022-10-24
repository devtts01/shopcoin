/* eslint-disable prettier/prettier */
import {
  BuyHistory,
  Deposits,
  Home,
  MyCoin,
  Profile,
  Withdraw,
} from '../layouts';

export const routers = {
  Home: 'Home',
  Profile: 'Profile',
  MyCoin: 'My Coin',
  History: 'History',
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
    name: routers.MyCoin,
    component: MyCoin,
    icon: 'bitcoin',
    color: null,
    size: null,
  },
  {
    name: routers.History,
    component: BuyHistory,
    icon: 'history',
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
