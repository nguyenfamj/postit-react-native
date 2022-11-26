import { View, SafeAreaView, TextInput } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { useTailwind } from 'tailwind-rn/dist';

interface SearchHeaderProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  searchPlaceHolder: string;
}

const SearchHeader = ({ inputValue, setInputValue, searchPlaceHolder }: SearchHeaderProps) => {
  const tw = useTailwind();

  return (
    <View style={tw('py-4 bg-black w-full px-6 flex justify-end items-center')}>
      <SafeAreaView />
      <TextInput
        style={tw('font-sans_semibold mt-0 w-full bg-white rounded-xl p-3 m-0')}
        placeholder={searchPlaceHolder}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
    </View>
  );
};

export default SearchHeader;
