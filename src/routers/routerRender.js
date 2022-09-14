import routers from './routers';
import {
    Dashboard,
    Home,
    Payment,
    SettingCoin,
    Deposits,
    Withdraw,
    Buy,
    Sell,
    User,
    UserDetail,
    Login,
    NewCoin,
    DepositsWithdrawDetail,
    BuySellDetail,
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
    { path: routers.payment, component: Payment },
    { path: routers.settingCoin, component: SettingCoin },
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
    { path: routers.buy, component: Buy },
    {
        path: `${routers.buy}/${routers.buyDetail}/:idBuy`,
        component: BuySellDetail,
    },
    { path: routers.sell, component: Sell },
    {
        path: `${routers.sell}/${routers.sellDetail}/:idSell`,
        component: BuySellDetail,
    },
    { path: routers.user, component: User },
    { path: `${routers.user}/:idUser`, component: UserDetail },
    { path: `${routers.settingCoin}/${routers.newcoin}`, component: NewCoin },
    {
        path: `${routers.settingCoin}/${routers.editCoin}/:idCoin`,
        component: NewCoin,
    },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
