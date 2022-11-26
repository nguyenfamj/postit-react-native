import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { TabStackParamList } from '../../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/RootNavigator';
import SearchHeader from '../../components/SearchHeader';
import useOrders from '../../../hooks/query/order/useOrders';
import { Icon } from '@rneui/themed';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const Orders = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const { error, loading, orders } = useOrders();
  const [searchInput, setSearchInput] = useState<string>('');
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View style={tw('h-full bg-white')}>
      <SearchHeader
        inputValue={searchInput}
        setInputValue={setSearchInput}
        searchPlaceHolder='Search by order tracking id...'
      />
      <View style={tw('px-3')}>
        <View style={tw('w-full flex-row justify-end mt-3')}>
          <Pressable
            style={tw('p-3 bg-black rounded-xl mr-2')}
            onPress={() => setAscending(!ascending)}
          >
            <Text style={tw('text-white font-bold')}>
              {ascending ? 'Show oldest order' : 'Show recent order'}
            </Text>
          </Pressable>
        </View>
        <ScrollView style={tw('h-full p-2')}>
          {orders
            ?.filter((order: Order) => {
              return order.trackingId.toLowerCase().includes(searchInput.toLowerCase());
            })
            .sort((a, b) => {
              if (ascending) {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
              } else {
                return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
              }
            })
            .map((order) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderDetail', { order })}
                key={order.trackingId}
                style={[
                  tw('mt-5 bg-white rounded-lg'),
                  {
                    shadowColor: 'black',
                    shadowOffset: { width: 4, height: 4 },
                    shadowRadius: 4,
                    shadowOpacity: 0.2,
                  },
                ]}
              >
                <View style={tw('flex-col flex')}>
                  <View style={tw('p-3 bg-[#c59c48] rounded-t-lg')}>
                    <View style={tw('w-full flex-row justify-between items-center pr-3')}>
                      <View style={tw('flex-row items-center')}>
                        <Icon name='calendar-day' type='font-awesome-5' color={'white'} />
                        <Text style={tw('ml-5 font-bold text-white')}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Text>
                      </View>

                      <View style={tw('bg-[#7c622e] py-1 px-2 rounded-lg')}>
                        <Text style={tw('font-bold text-white')}>
                          {order.trackingItems.items.length} items
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={tw('p-3 rounded-b-lg')}>
                    <Text style={tw('text-base')}>
                      <Text style={tw('font-bold')}> Tracking ID:</Text> {order.trackingId}
                    </Text>

                    <Text style={tw('text-base')}>
                      <Text style={tw('font-bold')}> Customer:</Text>{' '}
                      {order.trackingItems.customer.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Orders;
