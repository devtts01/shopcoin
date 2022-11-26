/* eslint-disable prettier/prettier */
import {
  Contact,
  ChangePwd,
  CreateDeposits,
  CreateWithdraw,
  ForgotPwd,
  Login,
  ProfilePayment,
  Register,
  ResetPwd,
  SingleDeposits,
  SingleWithdraw,
  UploadDoument,
  History,
  SellHistory,
} from '../layouts';
import Routers from '../navigation/Routers';

export const routersMain = {
  Login: 'Login',
  Register: 'Register',
  ForgotPassword: 'ForgotPassword',
  CreateDeposits: 'Create Deposits',
  SingleDeposits: 'Single Deposits',
  CreateWithdraw: 'Create Withdraw',
  SingleWithdraw: 'Single Withdraw',
  ProfilePayment: 'Profile Payment',
  UploadDoument: 'Upload Document',
  Contact: 'Contact',
  ResetPwd: 'Reset Password',
  ChangePwd: 'Change Password',
  BuyHistory: 'Deposits History',
  SellHistory: 'Withdraw History',
  MainPage: 'MainPage',
};
const MainObject = [
  {
    name: routersMain.Login,
    component: Login,
    options: 'headerNull',
  },
  {
    name: routersMain.Register,
    component: Register,
    options: 'headerNull',
  },
  {
    name: routersMain.ForgotPassword,
    component: ForgotPwd,
    options: 'headerNull',
  },
  {
    name: routersMain.ResetPwd,
    component: ResetPwd,
    options: 'headerNull',
  },
  {
    name: routersMain.CreateDeposits,
    component: CreateDeposits,
    options: 'custom',
  },
  {
    name: routersMain.SingleDeposits,
    component: SingleDeposits,
    options: 'custom',
  },
  {
    name: routersMain.CreateWithdraw,
    component: CreateWithdraw,
    options: 'custom',
  },
  {
    name: routersMain.SingleWithdraw,
    component: SingleWithdraw,
    options: 'custom',
  },
  {
    name: routersMain.ProfilePayment,
    component: ProfilePayment,
    options: 'custom',
  },
  {
    name: routersMain.UploadDoument,
    component: UploadDoument,
    options: 'custom',
  },
  {
    name: routersMain.Contact,
    component: Contact,
    options: 'custom',
  },
  {
    name: routersMain.ChangePwd,
    component: ChangePwd,
    options: 'custom',
  },
  {
    name: routersMain.BuyHistory,
    component: History,
    options: 'custom',
  },
  {
    name: routersMain.SellHistory,
    component: SellHistory,
    options: 'custom',
  },
  {
    name: routersMain.MainPage,
    component: Routers,
  },
];

export default MainObject;
