/* eslint-disable prettier/prettier */
import {Home, History, Profile} from '../layouts';

export const routers = {
  Home: 'Home',
  History: 'History',
  Profile: 'Profile',
  // Deposits: 'Deposits',
  // Withdraw: 'Withdraw',
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
    name: routers.History,
    component: History,
    icon: 'history',
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
