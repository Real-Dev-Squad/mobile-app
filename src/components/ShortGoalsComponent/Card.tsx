import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Images from '../../constants/images/Image';
import { CardStyles } from './Styles/CardStyles';
import Strings from '../../i18n/en';

const Card = ({ item }: any) => {
  return (
    <View style={CardStyles.card}>
      <View>
        <Text style={CardStyles.title}>{item.title}</Text>
      </View>
      <View>
        <Text>
          <Text style={CardStyles.heading}>{Strings.Task_Assignee} </Text>
          <Text style={CardStyles.text}>{item.assignee}</Text>
        </Text>
      </View>
      <View>
        <Text>
          <Text style={CardStyles.heading}>{Strings.Task_desc} </Text>
          <Text style={CardStyles.text}>{item.description}</Text>
        </Text>
      </View>
      <View style={[CardStyles.flex, CardStyles.container]}>
        <View style={CardStyles.flex}>
          <Image source={Images.commentIcon} style={CardStyles.commentIcon} />
          <Text style={styles.messageCount}>{item.messageCount}</Text>
        </View>
        <Text style={styles.dueText}>Due in {item.dueDate} days</Text>
        <TouchableOpacity style={[CardStyles.doneBtn, CardStyles.flex]}>
          <Text style={styles.btnText}>Mark as done</Text>
          <Image source={Images.doneIcon} style={CardStyles.doneIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageCount: { color: 'blue' },
  btnText: { color: 'white', fontWeight: 'bold' },
  dueText: { color: 'red' },
});

export default Card;
