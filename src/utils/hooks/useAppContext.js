/* eslint-disable prettier/prettier */
import {useContext} from 'react';
import AppContext from '../../app/createContext';

const useAppContext = () => {
  const {state, dispatch} = useContext(AppContext);
  return {state, dispatch};
};
export default useAppContext;
