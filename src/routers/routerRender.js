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
import {
    HomeUser,
    BuyHistoryUser,
    SellHistoryUser,
    ProfileUser,
    ContactUser,
    LiveChatUser,
    ResetPwd,
} from '../UserLayouts';
import { PageNotFound } from '../components';

export const publicRouter = [
    { path: routers.login, component: Login, layout: null },
    { path: routers.register, component: Register, layout: null },
    { path: routers.forgotPwd, component: ForgotPwd, layout: null },
    { path: routers.resetPwdUser, component: ResetPwd, layout: null },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
export const privateRouter = [
    { path: routers.home, component: Home },
    { path: routers.dashboard, component: Dashboard },
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
    { path: routers.user, component: User },
    { path: `${routers.user}/:idUser`, component: UserDetail },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
export const userRouter = [
    { path: routers.homeUser, component: HomeUser },
    { path: routers.buyHistoryUser, component: BuyHistoryUser },
    { path: routers.sellHistoryUser, component: SellHistoryUser },
    { path: routers.profileUser, component: ProfileUser },
    { path: routers.contactUser, component: ContactUser },
    { path: routers.liveChatUser, component: LiveChatUser },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
