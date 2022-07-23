import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Images from '../../constants/images/Image';
import { GoalScreenHeaderStyle } from './GoalScreenHeaderStyle';

export type GoalScreenHeaderProps = {
  title: String;
  onPress: Function;
  shouldShowArrowDownIcon: Boolean;
};

function GoalScreenHeader(props: GoalScreenHeaderProps) {
  const styles = GoalScreenHeaderStyle;
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.onPress()}
          testID="arrowBtn"
        >
          <Image
            source={Images.arrowIcon}
            style={
              props.shouldShowArrowDownIcon
                ? styles.arrowIconDown
                : styles.arrowIcon
            }
            testID="arrowBtnIcon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GoalScreenHeader;
