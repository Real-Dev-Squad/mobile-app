import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Card from './Card';
import Data from './Data';
import Images from '../../constants/images/Image';

const ShortGoalsComponent = () => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <View style={Styles.container}>
        <Text style={Styles.title}>Short Term Goals</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            show === true ? setShow(false) : setShow(true);
          }}
        >
          <Image
            source={Images.arrowIcon}
            style={show ? Styles.arrowIconDown : Styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      {show ? (
        <FlatList
          data={Data}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled={true}
        />
      ) : null}
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    color: '#492ed1',
    fontWeight: 'bold',
  },
  arrowIconDown: {
    resizeMode: 'cover',
    width: 30,
    height: 30,
    transform: [{ rotate: '90deg' }],
  },
  arrowIcon: {
    resizeMode: 'cover',
    width: 30,
    height: 30,
  },
});
export default ShortGoalsComponent;
