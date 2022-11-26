import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import useCustomerOrders from '../../hooks/query/order/useCustomerOrders';
import { CustomerScreenNavigationProp } from '../screen/Customers/Customers';

const CustomerInfo = ({
  email,
  name,
  customerId: customer_id,
}: {
  email: string;
  name: string;
  customerId: string;
}) => {
  const { loading, error, orders } = useCustomerOrders({ customer_id });

  const tw = useTailwind();

  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Modal', { name, userId: customer_id, orders, email })}
    >
      <View
        style={tw(
          'w-80 sm:w-[400px] mt-5 rounded-xl p-5 bg-gray-300 flex-row justify-between items-center'
        )}
      >
        <View>
          <Text style={tw('font-bold text-lg')}>{name}</Text>
          <Text style={tw('font-normal mt-2')}>{email}</Text>
        </View>
        <View style={tw('bg-white p-2 rounded-xl')}>
          <Text style={tw('font-semibold')}>{loading ? '...' : `${orders.length} orders`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerInfo;
