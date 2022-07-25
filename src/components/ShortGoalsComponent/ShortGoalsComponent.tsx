import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Card from './Card';
import Data from './Data';
import Images from '../../constants/images';
import { ShortGoalsStyle } from './Styles/ShortGoalsStyle';

const ShortGoalsComponent = () => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <View style={ShortGoalsStyle.container}>
        <Text style={ShortGoalsStyle.title}>Short Term Goals</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            show === true ? setShow(false) : setShow(true);
          }}
          testID="arrowBtn"
        >
          <Image
            source={Images.arrowIcon}
            style={
              show ? ShortGoalsStyle.arrowIconDown : ShortGoalsStyle.arrowIcon
            }
            testID="arrowBtnIcon"
          />
        </TouchableOpacity>
      </View>
      {show ? (
        <FlatList
          data={Data}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled={true}
          testID="flatlist"
        />
      ) : null}
    </View>
  );
};

export default ShortGoalsComponent;
