import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DeliveryModalScreen from '../screen/Modal/DeliveryModalScreen';
import OrderDetail from '../screen/Orders/OrderDetail';

export type RootStackParamList = {
  Main: undefined;
  Modal: { userId: string; name: string; orders?: Order[]; email: string };
  OrderDetail: { order: Order };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name='Main' component={TabNavigator} />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          options={{ headerShown: false }}
          name='Modal'
          component={DeliveryModalScreen}
        />
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen name='OrderDetail' component={OrderDetail} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
