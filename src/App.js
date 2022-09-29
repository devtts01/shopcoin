import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {ProviderContext} from './app/';
import {useAppContext} from './utils';
import {setMessage} from './app/payloads/message';
import {
  Home,
  Profile,
  MyCoin,
  BuyHistory,
  Deposits,
  Withdraw,
  CreateDeposits,
  SingleDeposits,
  UploadDoument,
  CreateWithdraw,
  ProfilePayment,
  SingleWithdraw,
  BuyCoin,
  SellCoin,
  SellHistory,
  Login,
  Register,
  ForgotPwd,
} from './layouts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#fafafa',
  },
};
const headerStyle = {
  headerStyle: {
    shadowColor: 'rgba(0,0,0,0.7)',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
};

const Routers = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'My Coin') {
            iconName = 'bitcoin';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Deposits') {
            iconName = 'wallet';
          } else if (route.name === 'Withdraw') {
            iconName = 'money-check-alt';
          }
          return (
            <FontAwesome5
              name={iconName}
              size={focused ? 25 : 20}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#007aff',
        labelStyle: {fontSize: 14},
      }}>
      <Tab.Screen name="Home" component={Home} options={headerStyle} />
      <Tab.Screen name="My Coin" component={MyCoin} options={headerStyle} />
      <Tab.Screen name="History" component={BuyHistory} options={headerStyle} />
      <Tab.Screen name="Deposits" component={Deposits} options={headerStyle} />
      <Tab.Screen name="Withdraw" component={Withdraw} options={headerStyle} />
      <Tab.Screen name="Profile" component={Profile} options={headerStyle} />
    </Tab.Navigator>
  );
};
const Main = () => {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    message: {del, upd, cre, error},
  } = state;
  useEffect(() => {
    if (error || del || cre || upd) {
      setTimeout(() => {
        dispatch(
          setMessage({
            error: '',
            del: '',
            upd: '',
            cre: '',
          }),
        );
      }, 3000);
    }
  });
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName={currentUser ? 'Main' : ' Login'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPwd}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Create Deposits"
            component={CreateDeposits}
            options={{
              title: 'Create Deposits',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Single Deposits"
            component={SingleDeposits}
            options={{
              title: 'Single Deposits',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Upload Document"
            component={UploadDoument}
            options={{
              title: 'Upload Document',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Create Withdraw"
            component={CreateWithdraw}
            options={{
              title: 'Create Withdraw',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Profile Payment"
            component={ProfilePayment}
            options={{
              title: 'Profile Payment',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Single Withdraw"
            component={SingleWithdraw}
            options={{
              title: 'Single Withdraw',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Buy Coin"
            component={BuyCoin}
            options={{
              title: 'Buy Coin',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Sell Coin"
            component={SellCoin}
            options={{
              title: 'Sell Coin',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Sell History"
            component={SellHistory}
            options={{
              title: 'Sell History',
              headerShown: true,
            }}
          />
          <Stack.Screen name="Main" component={Routers} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <ProviderContext>
      <NativeBaseProvider>
        <PaperProvider>
          <Main />
        </PaperProvider>
      </NativeBaseProvider>
    </ProviderContext>
  );
};

export default App;
