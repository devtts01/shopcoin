import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profile} from './layouts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // screenOptions={{header: () => null}} // Hide header Stack
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
              size = focused ? 25 : 20;
              // color = focused ? 'orange' : 'black';
            } else if (route.name === 'Profile') {
              iconName = 'user';
              size = focused ? 25 : 20;
              // color = focused ? 'orange' : 'black';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          labelStyle: {fontSize: 14},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          // options={{header: () => null}} //Hide header Stack
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
