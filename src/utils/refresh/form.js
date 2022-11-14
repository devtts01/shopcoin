/* eslint-disable prettier/prettier */
import {useAppContext} from '../';
import {setFormValue} from '../../app/payloads/form';

export const useRefreshForm = () => {
  const {dispatch} = useAppContext();
  dispatch(
    setFormValue({
      username: '',
      email: '',
      password: '',
    }),
  );
};
