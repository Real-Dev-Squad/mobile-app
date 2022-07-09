import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Images from '../../constants/images/Image';

const Card = ({ item }: any) => {
  return (
    <View style={Styles.card}>
      <View>
        <Text style={Styles.title}>{item.title}</Text>
      </View>
      <View>
        <Text>
          <Text style={Styles.heading}>Assignee: </Text>
          <Text style={Styles.text}>{item.assignee}</Text>
        </Text>
      </View>
      <View>
        <Text>
          <Text style={Styles.heading}>Description: </Text>
          <Text style={Styles.text}>{item.description}</Text>
        </Text>
      </View>
      <View style={[Styles.flex, Styles.container]}>
        <View style={Styles.flex}>
          <Image source={Images.commentIcon} style={Styles.commentIcon} />
          <Text style={{ color: 'blue' }}>{item.messageCount}</Text>
        </View>
        <Text style={{ color: 'red' }}>Due in {item.dueDate} days</Text>
        <TouchableOpacity style={[Styles.doneBtn, Styles.flex]}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Mark as done
          </Text>
          <Image source={Images.doneIcon} style={Styles.doneIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#492ed1',
    borderRadius: 15,
    padding: 5,
    margin: 15,
    width: '75%',
    alignSelf: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    marginTop: 5,
  },
  title: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  commentIcon: {
    resizeMode: 'cover',
    width: 25,
    height: 25,
  },
  doneBtn: {
    backgroundColor: '#492ed1',
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  doneIcon: {
    resizeMode: 'cover',
    width: 17,
    height: 17,
  },
});

export default Card;
