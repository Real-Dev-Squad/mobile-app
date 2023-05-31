import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const timeperiod = [
  { names: 'Short term' },
  { names: 'Mid term' },
  { names: 'Long term' },
];
const DurationDropDown = () => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(timeperiod);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('');

  return (
    <View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          elevation: 5,
          borderRadius: 10,
          backgroundColor: 'white',
          alignSelf: 'center',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}
      >
        <Text style={{ fontWeight: '600', color: 'black' }}>
          {selectedTimePeriod === '' ? 'Select duration' : selectedTimePeriod}
        </Text>
        {clicked ? (
          <Text style={{ color: 'black', fontSize: 20 }}>-</Text>
        ) : (
          <Text style={{ color: 'black', fontSize: 20 }}>+</Text>
        )}
      </TouchableOpacity>
      {clicked ? (
        <SafeAreaView>
          <FlatList
            style={{
              elevation: 5,
              marginTop: 20,
              height: 100,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                  }}
                  onPress={() => {
                    setSelectedTimePeriod(item.names);
                    setClicked(!clicked);
                  }}
                >
                  <Text style={{ fontWeight: '600', color: 'black' }}>
                    {item.names}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      ) : null}
    </View>
  );
};

export default DurationDropDown;
