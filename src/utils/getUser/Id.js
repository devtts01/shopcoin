/* eslint-disable prettier/prettier */
import jwt_decode from 'jwt-decode';
import {setUserIdEmail} from '../../app/payloads/getById';

export const getIdUserJWT = async (currentUser, dispatch) => {
  const accessToken = currentUser?.token;
  if (accessToken) {
    const decodedToken = await jwt_decode(accessToken);
    dispatch(
      setUserIdEmail({
        id: decodedToken?.id,
        email: decodedToken?.email,
      }),
    );
  }
};
