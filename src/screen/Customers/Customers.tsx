import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/RootNavigator';
import SearchHeader from '../../components/SearchHeader';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>;

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../../../graphql/query/customers';
import CustomerInfo from '../../components/CustomerInfo';

const Customers = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [searchInput, setSearchInput] = useState<string>('');
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View style={tw('h-full bg-white')}>
      <SearchHeader
        inputValue={searchInput}
        setInputValue={setSearchInput}
        searchPlaceHolder='Search by customer name...'
      />
      <ScrollView>
        <View style={tw('h-full w-full flex items-center')}>
          {data?.getCustomers
            ?.filter((customer: CustomerList) => {
              return customer.value.name.toLowerCase().includes(searchInput.toLowerCase());
            })
            .map(({ name: customer_id, value: { email, name } }: CustomerList) => {
              console.log(customer_id);
              return (
                <CustomerInfo
                  key={customer_id}
                  email={email}
                  name={name}
                  customerId={customer_id}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Customers;
