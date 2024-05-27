import {StyleSheet} from 'react-native';

export const GoalScreenHeaderStyle = StyleSheet.create({
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
    transform: [{rotate: '90deg'}],
  },
  arrowIcon: {
    resizeMode: 'cover',
    width: 30,
    height: 30,
  },
});
