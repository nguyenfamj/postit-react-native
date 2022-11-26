import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn/dist';
import { useAllRatesQuery, VatRate } from '../../services/vatstack/getAllRates';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from '@rneui/themed';
import { useConvertCurrency } from '../../services/currencyExchange/useConvertCurrency';

export type VatCalculatorNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'VAT'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type ExchangeVATState = {
  origin?: VatRate;
  destination?: VatRate;
  originalAmount?: string;
  finalAmount?: string;
};

const CalculatorVAT = () => {
  const tw = useTailwind();
  const navigation = useNavigation<VatCalculatorNavigationProp>();
  const [exchangeVATs, setExchangeVATs] = useState<ExchangeVATState>({ finalAmount: '-.-' });
  const { data } = useAllRatesQuery();

  const {
    data: convertRate,
    isRefetching,
    refetch,
  } = useConvertCurrency({
    from: exchangeVATs?.origin?.currency,
    to: exchangeVATs?.destination?.currency,
  });

  const convertCurrencyWithVAT = ({
    convertRate,
    initialAmount,
    originVAT,
    destinationVAT,
  }: {
    convertRate: number;
    initialAmount: number;
    originVAT: number;
    destinationVAT: number;
  }) => {
    const destinationAmountBeforeVAT = (initialAmount / (1 + originVAT / 100)) * convertRate;

    return destinationAmountBeforeVAT + (destinationAmountBeforeVAT * destinationVAT) / 100;
  };

  useEffect(() => {
    if (exchangeVATs.origin?.currency === exchangeVATs.destination?.currency) {
      setExchangeVATs({
        ...exchangeVATs,
        finalAmount: `${convertCurrencyWithVAT({
          convertRate: 1,
          originVAT: Number(exchangeVATs.origin?.standard_rate),
          destinationVAT: Number(exchangeVATs.destination?.standard_rate),
          initialAmount: Number(exchangeVATs.originalAmount),
        })}`,
      });
    } else if (convertRate) {
      setExchangeVATs({
        ...exchangeVATs,
        finalAmount: `${convertCurrencyWithVAT({
          convertRate: Number(convertRate),
          originVAT: Number(exchangeVATs.origin?.standard_rate),
          destinationVAT: Number(exchangeVATs.destination?.standard_rate),
          initialAmount: Number(exchangeVATs.originalAmount),
        })}`,
      });
    }
  }, [convertRate, exchangeVATs.destination?.standard_rate, exchangeVATs.origin?.standard_rate]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View>
      <View style={tw('pb-4 bg-black w-full px-6 flex justify-end items-center')}>
        <SafeAreaView />
        <Text style={tw('text-white font-bold text-lg')}>Package VAT Calculator</Text>
      </View>

      <View style={tw('h-full bg-white px-5 py-8 flex-col')}>
        <View>
          <View style={tw('flex-row items-center ')}>
            <View>
              <Icon name='angle-double-right' type='font-awesome-5' size={30} />
            </View>
            <RNPickerSelect
              style={{
                inputIOS: tw('ml-5 font-bold p-4 bg-gray-300 w-64 rounded-xl'),
                placeholder: tw('text-black'),
              }}
              onValueChange={(value) => setExchangeVATs({ ...exchangeVATs, origin: value })}
              placeholder={{ key: 'select-holder', inputLabel: 'Choose country of origin' }}
              items={
                data
                  ? data?.rates.map((country) => ({
                      key: country.country_code,
                      label: country.country_name,
                      value: country,
                    }))
                  : [{ key: '#', label: 'Select', value: '#' }]
              }
            />
          </View>

          <View style={tw('w-[303px] flex-row justify-end mt-3')}>
            <TextInput
              style={tw('py-4 bg-gray-300 w-64 rounded-xl px-4 text-black font-bold')}
              value={exchangeVATs?.originalAmount}
              onChangeText={(text) => setExchangeVATs({ ...exchangeVATs, originalAmount: text })}
              keyboardType='numeric'
              placeholder={`Purchase amount ${
                exchangeVATs?.origin?.currency ? `in ${exchangeVATs?.origin.currency}` : ''
              }`}
            />
          </View>

          {/*  */}
          <View style={tw('flex-row items-center mt-3')}>
            <View>
              <Icon name='angle-double-left' type='font-awesome-5' size={30} />
            </View>
            <RNPickerSelect
              onValueChange={(value) => setExchangeVATs({ ...exchangeVATs, destination: value })}
              style={{
                inputIOS: tw('ml-5 font-bold p-4 bg-gray-300 w-64 rounded-xl'),
                placeholder: tw('text-black'),
              }}
              placeholder={{
                key: 'select-holder',
                inputLabel: 'Choose country of final destination',
              }}
              items={
                data
                  ? data?.rates.map((country) => ({
                      key: country.country_code,
                      label: country.country_name,
                      value: country,
                    }))
                  : [{ key: '#', label: 'Select', value: '#' }]
              }
            />
          </View>

          {/*  */}
          {(exchangeVATs?.origin || exchangeVATs?.destination) && (
            <View style={tw('mt-8 flex-row justify-between')}>
              <View>
                <Text style={tw('font-bold text-2xl ')}>{exchangeVATs?.origin?.country_name}</Text>
                <Text style={tw('text-base mt-3')}>
                  Country code: {exchangeVATs?.origin?.country_code}
                </Text>
                <Text style={tw('text-base')}>Currency: {exchangeVATs?.origin?.currency}</Text>
                <Text style={tw('text-base')}>
                  EU member state: {exchangeVATs?.origin?.member_state ? 'Yes' : 'No'}
                </Text>
                <Text style={tw('text-base')}>
                  Standard VAT rate: {exchangeVATs?.origin?.standard_rate}%
                </Text>
              </View>

              <View>
                <Text style={tw('font-bold text-2xl ')}>
                  {exchangeVATs?.destination?.country_name}
                </Text>
                <Text style={tw('text-base mt-3')}>
                  Country code: {exchangeVATs?.destination?.country_code}
                </Text>
                <Text style={tw('text-base')}>Currency: {exchangeVATs?.destination?.currency}</Text>
                <Text style={tw('text-base')}>
                  EU member state: {exchangeVATs?.destination?.member_state ? 'Yes' : 'No'}
                </Text>
                <Text style={tw('text-base')}>
                  Standard VAT rate: {exchangeVATs?.destination?.standard_rate}%
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={tw('mt-12')}>
          <View style={tw('w-full flex-row justify-end')}>
            <Text style={tw('font-bold text-lg')}>
              {exchangeVATs.finalAmount} {exchangeVATs.destination?.currency || 'CURRENCY'}
            </Text>
          </View>
          <Pressable
            style={tw('bg-black p-4 rounded-lg items-center justify-center mt-5')}
            onPress={() => refetch()}
          >
            <Text style={tw('text-white font-bold text-base')}>ESTIMATE FINAL VAT</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CalculatorVAT;
