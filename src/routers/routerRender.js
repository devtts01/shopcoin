import routers from './routers';
import {
    Dashboard,
    Home,
    Deposits,
    Withdraw,
    User,
    UserDetail,
    Login,
    DepositsWithdrawDetail,
    Register,
    ForgotPwd,
} from '../Layouts';
import { PageNotFound } from '../components';

export const publicRouter = [
    { path: routers.login, component: Login, layout: null },
    { path: routers.register, component: Register, layout: null },
    { path: routers.forgotPwd, component: ForgotPwd, layout: null },
];
export const privateRouter = [
    { path: routers.home, component: Home },
    { path: routers.dashboard, component: Dashboard },
    { path: routers.deposits, component: Deposits },
    {
        path: `${routers.deposits}/${routers.depositsDetail}/:idDeposits`,
        component: DepositsWithdrawDetail,
    },
    { path: routers.withdraw, component: Withdraw },
    {
        path: `${routers.withdraw}/${routers.withdrawDetail}/:idWithdraw`,
        component: DepositsWithdrawDetail,
    },
    { path: routers.user, component: User },
    { path: `${routers.user}/:idUser`, component: UserDetail },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
