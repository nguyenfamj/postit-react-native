import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Customers from '../screen/Customers/Customers';
import Orders from '../screen/Orders/Orders';
import { useNavigation } from '@react-navigation/native';
import CalculatorVAT from '../screen/CalculatorVAT/CalculatorVAT';
import { Icon } from '@rneui/themed';

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
  VAT: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          return route.name === 'Customers' ? (
            <Icon name='users' type='font-awesome-5' color={focused ? '#639db1' : 'gray'} />
          ) : route.name === 'Orders' ? (
            <Icon name='box-open' type='font-awesome-5' color={focused ? '#c59c48' : 'gray'} />
          ) : route.name === 'VAT' ? (
            <Icon name='calculator' type='font-awesome-5' color={focused ? '#000000' : 'gray'} />
          ) : (
            <></>
          );
        },
      })}
    >
      <Tab.Screen name='Customers' component={Customers} />
      <Tab.Screen name='Orders' component={Orders} />
      <Tab.Screen name='VAT' component={CalculatorVAT} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
