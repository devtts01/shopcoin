import jwt_decode from 'jwt-decode';
import { localStoreUtils, axiosUtils } from '../../utils';
import routers from '../../routers/routers';

const requestRefreshToken = async (
    currentUser,
    handleFunc,
    state,
    dispatch,
    actions,
    id
) => {
    try {
        const accessToken = currentUser?.token;
        if (accessToken) {
            const decodedToken = await jwt_decode(accessToken);
            const date = new Date();
            if (decodedToken.exp < date.getTime() / 1000) {
                const res = await axiosUtils.refreshToken('refreshToken');
                if (res === 'No jwt') {
                    alert('Refresh token đã hết hạn, vui lòng đăng nhập lại');
                    await localStoreUtils.setStore(null);
                    window.location.href = routers.login;
                } else if (res.code === 0) {
                    const refreshUser = {
                        ...currentUser,
                        token: res.newtoken.toString(),
                    };
                    await localStoreUtils.setStore(refreshUser);
                    dispatch(
                        actions.setData({
                            ...state.set,
                            currentUser: localStoreUtils.getStore(),
                        })
                    );
                    currentUser.token = `${res.newtoken}`;
                    handleFunc(refreshUser, id ? id : '');
                    return refreshUser;
                } else {
                    dispatch(
                        actions.setData({
                            ...state.set,
                            message: {
                                ...state.set.message,
                                error: 'RefreshToken not found- Please login again',
                            },
                        })
                    );
                    alert('Refresh token đã hết hạn, vui lòng đăng nhập lại');
                    await localStoreUtils.setStore(null);
                    window.location.href = routers.login;
                }
            } else {
                handleFunc(currentUser, id ? id : '');
                return currentUser;
            }
        }
    } catch (err) {
        console.log(err);
    }
};
export default requestRefreshToken;
