import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Divider } from '@rneui/base';
import { Icon } from '@rneui/themed';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTailwind } from 'tailwind-rn/dist';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { TabStackParamList } from '../../navigator/TabNavigator';

type DeliveryModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'Modal'>
>;

type DeliveryModalScreenRouteProp = RouteProp<RootStackParamList, 'Modal'>;

const DeliveryModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<DeliveryModalScreenNavigationProp>();
  const {
    params: { name, userId, email, orders },
  } = useRoute<DeliveryModalScreenRouteProp>();

  console.log(orders);

  return (
    <>
      <View style={tw('')}>
        <Icon name='horizontal-rule' />
      </View>
      {/* Header */}
      <View style={tw('w-full p-3')}>
        <Text style={tw('font-bold text-3xl')}>Deliveries</Text>
        <View style={tw('w-full p-4 rounded-lg bg-black mt-4')}>
          <Text style={tw('font-bold text-lg text-white')}>{name}</Text>
          <Text style={tw('text-white')}>{email}</Text>
        </View>

        <FlatList
          contentContainerStyle={tw('mt-8')}
          data={orders}
          keyExtractor={(order) => order.trackingId}
          renderItem={({ item: order }) => (
            <View
              style={[
                tw('w-full p-2 bg-white rounded-lg'),
                {
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 4,
                  shadowOpacity: 0.2,
                },
              ]}
            >
              <View style={tw('w-full p-4')}>
                <View>
                  <Text style={tw('font-bold text-[18px]')}>Order #{order.trackingId}</Text>
                  <Text style={tw('mt-2 text-[16px]')}>Carrier: {order.carrier.toUpperCase()}</Text>
                  <Text style={tw('text-[16px]')}>
                    Order date: {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={tw('text-[16px]')}>
                    Address: {order.Address}, {order.City}
                  </Text>
                  <Text style={tw('text-[16px]')}>Shipping Cost: {order.shippingCost}$</Text>
                </View>

                {/* Divider */}
                <View style={tw('w-full h-1 rounded-2xl bg-black my-4')}></View>

                {/* Item List */}
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

                {/* Map */}

                <MapView
                  initialRegion={{
                    latitude: order.Lat,
                    longitude: order.Lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  style={tw('w-full h-48 rounded-xl')}
                >
                  {order.Lat && order.Lng && (
                    <Marker
                      coordinate={{ latitude: order.Lat, longitude: order.Lng }}
                      description={order.Address}
                      identifier='destination'
                    />
                  )}
                </MapView>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default DeliveryModalScreen;
