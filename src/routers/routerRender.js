import routers from './routers';
import {
    Dashboard,
    Home,
    Payment,
    Rate,
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
import {
    HomeUser,
    MyCoinUser,
    BuyHistoryUser,
    SellHistoryUser,
    DepositUser,
    WithdrawUser,
    ProfileUser,
    BuyCoinUser,
    SellCoinUser,
    SingleDepositUser,
    SingleWithdrawUser,
    ContactUser,
    LiveChatUser,
} from '../UserLayouts';
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
    { path: routers.rate, component: Rate },
    { path: routers.settingCoin, component: SettingCoin },
    { path: routers.deposits, component: Deposits },
    {
        path: `${routers.deposits}/:idDeposits`,
        component: DepositsWithdrawDetail,
    },
    { path: routers.withdraw, component: Withdraw },
    {
        path: `${routers.withdraw}/:idWithdraw`,
        component: DepositsWithdrawDetail,
    },
    { path: routers.buy, component: Buy },
    {
        path: `${routers.buy}/:idBuy`,
        component: BuySellDetail,
    },
    { path: routers.sell, component: Sell },
    {
        path: `${routers.sell}/:idSell`,
        component: BuySellDetail,
    },
    { path: routers.user, component: User },
    { path: `${routers.user}/:idUser`, component: UserDetail },
    { path: `${routers.settingCoin}/${routers.newcoin}`, component: NewCoin },
    {
        path: `${routers.settingCoin}/:idCoin`,
        component: NewCoin,
    },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];

export const userRouter = [
    { path: routers.homeUser, component: HomeUser },
    { path: routers.myCoinUser, component: MyCoinUser },
    { path: routers.buyHistoryUser, component: BuyHistoryUser },
    { path: routers.sellHistoryUser, component: SellHistoryUser },
    { path: routers.depositUser, component: DepositUser },
    { path: routers.withdrawUser, component: WithdrawUser },
    { path: routers.profileUser, component: ProfileUser },
    { path: routers.contactUser, component: ContactUser },
    { path: routers.liveChatUser, component: LiveChatUser },
    { path: `${routers.buyCoinUser}/:idCoin`, component: BuyCoinUser },
    { path: `${routers.sellCoinUser}/:idCoin`, component: SellCoinUser },
    {
        path: `${routers.depositUser}/:idDeposit`,
        component: SingleDepositUser,
    },
    {
        path: `${routers.withdrawUser}/:idWithdraw`,
        component: SingleWithdrawUser,
    },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
