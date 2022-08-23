import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Card from './Card';
import Data from './Data';
import Images from '../../constants/images/Image';
import { ShortGoalsStyle } from './Styles/ShortGoalsStyle';

const ShortGoalsComponent = () => {
  const [show, setShow] = useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
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
        <View testID="flatlist">
          {Data.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
        </View>
      ) : null}
    </View>
  );
};

export default ShortGoalsComponent;
