import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Images from '../constants/images/Image';
import StyleConfig from '../utils/StyleConfig';
import { scale } from '../utils/utils';

const Dropdown_ = ({
  data,
  title,
  value,
  handleDropdownPress,
}: {
  data: number[];
  title: string | number;
  value: number;
  handleDropdownPress: (item: number) => void;
}) => {
  const [toggleDropdown, setToggleDrodown] = useState(false);
  const handleToggle = () => {
    setToggleDrodown((prev) => !prev);
  };

  const handleItemPress = (item) => {
    handleDropdownPress(item);
    handleToggle();
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleItemPress(item)}
        style={styles.userDetails}
      >
        <Text style={styles.userNameDropDown}>{item} min</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Text style={styles.titles}>{title}</Text>

      <TouchableOpacity
        testID="dropdown"
        style={[styles.dropDownSelector, styles.inputStyle]}
        onPress={handleToggle}
      >
        <Text
          style={{
            color: value
              ? StyleConfig.colors.placeholderText
              : StyleConfig.colors.darkGrey,
          }}
        >
          {value} min
        </Text>
        {!toggleDropdown ? (
          <Image source={Images.dropdown} style={styles.dropDownIcon} />
        ) : (
          <Image source={Images.dropup} style={styles.dropDownIcon} />
        )}
      </TouchableOpacity>

      {toggleDropdown ? (
        <View style={styles.dropDownArea}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      ) : null}
    </View>
  );
};

export default Dropdown_;

const styles = StyleSheet.create({
  titles: {
    fontSize: scale(12),
    marginBottom: scale(4),
    marginTop: scale(20),
    color: StyleConfig.colors.greyLabel,
  },
  dropDownIcon: {
    width: 20,
    height: 20,
  },
  dropDownSelector: {
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userNameDropDown: {
    padding: 20,
    borderBottomColor: 'white',
    width: '90%',
    alignSelf: 'center',
    color: StyleConfig.colors.darkGrey,
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  inputStyle: {
    padding: scale(10),
    borderRadius: 8,
    backgroundColor: StyleConfig.colors.whiteInput,
    fontSize: scale(12),
    borderWidth: 0.5,
    color: StyleConfig.colors.darkGrey,
  },
  dropDownArea: {
    height: scale(250),
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 8,
  },
});
