const routers = {
    // ADMIN ROUTER
    home: '/',
    login: '/login',
    register: '/register',
    forgotPwd: '/forgot-password',
    dashboard: '/dashboard',
    deposits: '/deposits',
    depositsDetail: 'deposit-detail',
    withdraw: '/withdraw',
    withdrawDetail: 'withdraw-detail',
    user: '/user',

    // USER ROUTER
    homeUser: '/',
    buyHistoryUser: '/buy-history',
    sellHistoryUser: '/sell-history',
    profileUser: '/profile',
    contactUser: '/contact',
    liveChatUser: '/live-chat',
    resetPwdUser: '/reset-password',
    pageNotFound: '*',
};

export default routers;
