/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useAppContext} from '../utils';
import MainObject, {routersMain} from '../routers/Main';
import {setMessage} from '../app/payloads/message';
import {setCurrentUser} from '../app/payloads/user';
import {getAsyncStore} from '../utils/localStore/localStore';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007aff',
    background: '#fafafa',
  },
};

export default function Main() {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    message: {del, upd, cre, error, success},
  } = state;
  useEffect(() => {
    if (error || del || cre || upd || success) {
      setTimeout(() => {
        dispatch(
          setMessage({
            error: '',
            del: '',
            upd: '',
            cre: '',
            success: '',
          }),
        );
      }, 3000);
    }
  });
  useEffect(() => {
    dispatch(setCurrentUser(getAsyncStore(dispatch)));
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={
          currentUser ? routersMain.MainPage : routersMain.Login
        }
        screenOptions={{
          headerShown: false,
        }}>
        {MainObject.map(item => {
          return (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={
                item.options === 'headerNull'
                  ? {header: () => null}
                  : item.options === 'custom'
                  ? {
                      title: item.name,
                      headerShown: true,
                    }
                  : {}
              }
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
