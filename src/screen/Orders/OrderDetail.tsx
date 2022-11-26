import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';
import { getAllRates } from '../../services/vatstack/getAllRates';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;
type OrderDetailRouteProp = RouteProp<RootStackParamList, 'OrderDetail'>;

const OrderDetail = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();

  const {
    params: { order },
  } = useRoute<OrderDetailRouteProp>();

  useLayoutEffect(() => {
    return () => {
      navigation.setOptions({
        headerTitle: order.trackingItems.customer.name,
        headerBackTitle: 'Orders',
        headerTintColor: 'black',
      });
    };
  }, [order]);
  return (
    <ScrollView style={tw('bg-white h-full')}>
      <MapView
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={tw('w-full h-72 rounded-xl')}
      >
        {order.Lat && order.Lng && (
          <Marker
            coordinate={{ latitude: order.Lat, longitude: order.Lng }}
            description={order.Address + ', ' + order.City}
            identifier='destination'
          />
        )}
      </MapView>

      <View style={tw('p-4')}>
        <View style={tw('flex-row justify-between items-center')}>
          <View>
            <Text style={tw('font-semibold text-lg')}>Order #{order.trackingId}</Text>
            <Text style={tw('font-bold text-2xl')}>{order.trackingItems.customer.name}</Text>
          </View>

          <View>
            <Text style={tw('font-bold text-2xl')}>{order.shippingCost}$</Text>
          </View>
        </View>
        <Text style={tw('mt-2 text-base')}>
          Address: {order.Address}, {order.City}
        </Text>

        <Text style={tw('mt-5 font-semibold text-base')}>Item list</Text>

        <View>
          {order.trackingItems.items.map((item) => (
            <View key={item.item_id} style={tw('flex-row justify-between items-center')}>
              <Text style={tw('text-base')}>
                <Text style={tw('font-semibold text-base')}>
                  {item.quantity}x {'    '}
                </Text>
                {item.name}
              </Text>

              {/* Price */}
              <Text style={tw('text-base font-semibold')}>{item.price}$</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;
