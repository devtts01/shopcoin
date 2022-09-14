import jwt_decode from 'jwt-decode';
import { localStoreUtils, axiosUtils } from '../../utils';

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
                if (res.code === 0) {
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
