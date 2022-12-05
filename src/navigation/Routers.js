/* eslint-disable prettier/prettier */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import RouterObject, {routers} from '../routers/Routers';

const Tab = createBottomTabNavigator();
const headerStyle = {
  headerStyle: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    backgroundColor: '#fff',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
  },
};

export default function Routers() {
  return (
    <Tab.Navigator
      initialRouteName={routers.Home}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          RouterObject.map(item => {
            if (item.name === route.name) {
              iconName = item.icon;
            }
          });
          return (
            <FontAwesome5
              name={iconName}
              size={focused ? 25 : 20}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#007aff',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      {RouterObject.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={headerStyle}
          />
        );
      })}
    </Tab.Navigator>
  );
}
