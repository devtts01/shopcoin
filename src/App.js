import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProviderContext} from './app/';
import {
  Home,
  Profile,
  MyCoin,
  History,
  Deposits,
  Withdraw,
  Login,
  Register,
  ForgotPwd,
} from './layouts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Routers = ({navigation}) => {
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
        activeTintColor: 'orange',
        labelStyle: {fontSize: 14},
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Coin" component={MyCoin} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Deposits" component={Deposits} />
      <Tab.Screen name="Withdraw" component={Withdraw} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Main = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
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
          <Stack.Screen name="Main" component={Routers} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <ProviderContext>
      <Main />
    </ProviderContext>
  );
};

export default App;
